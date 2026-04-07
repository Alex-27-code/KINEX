import { useState, useEffect, createContext, useContext } from 'react';
import WebApp from '@twa-dev/sdk';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import '../i18n';
import { useTranslation } from 'react-i18next';

interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface UserProfile {
  unit: 'metric' | 'imperial';
  gender: 'male' | 'female';
  weight: number;
  height: number;
  age: number;
  goal: string;
  dailyCalories: number;
  onboardingComplete: boolean;
  isPremium: boolean;
  premiumEndsAt: any | null;
  tg_first_name?: string;
  tg_username?: string;
  createdAt?: any;
}

interface AuthContextType {
  fbUser: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  saveProfile: (data: Partial<UserProfile>) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  authError: string | null;
  clearError: () => void;
}

const defaultProfile: UserProfile = {
  unit: 'metric',
  gender: 'male',
  weight: 75,
  height: 180,
  age: 25,
  goal: 'maintain',
  dailyCalories: 2500,
  onboardingComplete: false,
  isPremium: false,
  premiumEndsAt: null,
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [fbUser, setFbUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFbUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setFbUser(null);
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        WebApp.ready();
        WebApp.expand();
      } catch (_) {
        // Not inside Telegram
      }

      const user = WebApp.initDataUnsafe?.user;

      if (user && user.id) {
        const lang = user.language_code || 'en';
        if (['ru', 'de', 'es'].includes(lang)) {
          i18n.changeLanguage(lang);
        }

        try {
          const userRef = doc(db, 'users', user.id.toString());
          const snap = await getDoc(userRef);

          if (snap.exists()) {
            const data = snap.data() as UserProfile;
            if (data.onboardingComplete === undefined) {
              data.onboardingComplete = true;
            }
            setProfile(data);
          } else {
            const initialProfile: UserProfile = {
              ...defaultProfile,
              tg_first_name: user.first_name,
              tg_username: user.username,
              createdAt: serverTimestamp(),
            };
            await setDoc(userRef, initialProfile, { merge: true });
            setProfile(initialProfile);
          }
        } catch {
          setProfile({ ...defaultProfile, onboardingComplete: true });
        }
      } else {
        setProfile({ ...defaultProfile, onboardingComplete: true });
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const clearError = () => setAuthError(null);

  const loginWithGoogle = async () => {
    try {
      setAuthError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (e: any) {
      setAuthError(e.code || 'google-signin-failed');
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      setAuthError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      setAuthError(e.code || 'signin-failed');
    }
  };

  const registerWithEmail = async (email: string, password: string) => {
    try {
      setAuthError(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      setAuthError(e.code || 'signup-failed');
    }
  };

  const saveProfile = async (data: Partial<UserProfile>) => {
    const updated: UserProfile = { ...defaultProfile, ...profile, ...data };
    try {
      const userId = fbUser?.uid || 'anonymous';
      await setDoc(doc(db, 'users', userId), updated, { merge: true });
    } catch (_) {
      // ignore
    }
    setProfile(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        fbUser,
        profile,
        loading,
        saveProfile,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        authError,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
