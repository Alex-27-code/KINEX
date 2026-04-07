import { useState, useEffect, createContext, useContext } from 'react';
import WebApp from '@twa-dev/sdk';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
import '../i18n';
import { useTranslation } from 'react-i18next';

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
  tgUser: TelegramUser | null;
  fbUser: User | null;
  profile: UserProfile | null;
  loading: boolean;
  saveProfile: (data: Partial<UserProfile>) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const defaultProfile: UserProfile = {
  unit: 'metric', gender: 'male', weight: 75, height: 180, age: 25,
  goal: 'maintain', dailyCalories: 2500, onboardingComplete: false,
  isPremium: false, premiumEndsAt: null
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [tgUser, setTgUser] = useState<TelegramUser | null>(null);
  const [fbUser, setFbUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    // Listen to Firebase auth state
    const unsub = onAuthStateChanged(auth, (user) => {
      setFbUser(user);
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
        setTgUser(user as TelegramUser);

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
        // Browser test mode
        setTgUser({ id: 999999999, first_name: 'Browser', language_code: 'en' });
        setProfile({ ...defaultProfile, onboardingComplete: true });
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error('Google sign-in failed:', e);
    }
  };

  const saveProfile = async (data: Partial<UserProfile>) => {
    if (!tgUser) return;
    const updated: UserProfile = { ...defaultProfile, ...profile, ...data };
    try {
      await setDoc(doc(db, 'users', tgUser.id.toString()), updated, { merge: true });
    } catch (_) {
      // Browser mode
    }
    setProfile(updated);
  };

  return (
    <AuthContext.Provider value={{ tgUser, fbUser, profile, loading, saveProfile, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
