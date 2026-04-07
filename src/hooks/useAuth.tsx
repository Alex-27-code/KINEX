import { useState, useEffect, createContext, useContext } from 'react';
import WebApp from '@twa-dev/sdk';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
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
  authMessage: string | null;
  clearMessages: () => void;
}

const defaultProfile: UserProfile = {
  unit: 'metric',
  gender: 'male',
  weight: 75,
  height: 180,
  age: 25,
  goal: 'maintain',
  dailyCalories: 2500,
  onboardingComplete: false, // новые пользователи проходят онбординг
  isPremium: false,
  premiumEndsAt: null,
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [fbUser, setFbUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const { i18n } = useTranslation();

  const googleProvider = new GoogleAuthProvider();

  // Listen to Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setFbUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });

        // Fetch profile from Firestore
        try {
          const userRef = doc(db, 'users', user.uid);
          const snap = await getDoc(userRef);

          if (snap.exists()) {
            const data = snap.data() as UserProfile;
            setProfile(data);
          } else {
            // New user — start with onboarding incomplete
            setProfile({ ...defaultProfile, onboardingComplete: false });
          }
        } catch {
          setProfile({ ...defaultProfile, onboardingComplete: false });
        }
      } else {
        setFbUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  // Handle redirect result (Google sign-in redirect)
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          setFbUser({
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
          });
        }
      } catch (e: any) {
        setAuthError(e.code || 'redirect-error');
      }
    };
    handleRedirect();
  }, []);

  const clearMessages = () => {
    setAuthError(null);
    setAuthMessage(null);
  };

  const loginWithGoogle = async () => {
    try {
      clearMessages();
      await signInWithRedirect(auth, googleProvider);
    } catch (e: any) {
      setAuthError(e.code || 'google-signin-failed');
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      clearMessages();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      const errors: Record<string, string> = {
        'auth/user-not-found': 'Пользователь не найден',
        'auth/wrong-password': 'Неверный пароль',
        'auth/invalid-email': 'Неверный формат email',
        'auth/too-many-requests': 'Слишком много попыток. Попробуйте позже',
      };
      setAuthError(errors[e.code] || 'Ошибка входа');
    }
  };

  const registerWithEmail = async (email: string, password: string) => {
    try {
      clearMessages();
      await createUserWithEmailAndPassword(auth, email, password);
      // New user document will be created with onboardingComplete: false
      // when onAuthStateChanged fires after registration
      setAuthMessage('Аккаунт создан!');
    } catch (e: any) {
      const errors: Record<string, string> = {
        'auth/email-already-in-use': 'Email уже зарегистрирован',
        'auth/weak-password': 'Пароль слишком слабый (минимум 6 символов)',
        'auth/invalid-email': 'Неверный формат email',
      };
      setAuthError(errors[e.code] || 'Ошибка регистрации');
    }
  };

  const saveProfile = async (data: Partial<UserProfile>) => {
    if (!fbUser) return;
    const updated: UserProfile = { ...defaultProfile, ...profile, ...data };
    try {
      await setDoc(doc(db, 'users', fbUser.uid), updated, { merge: true });
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
        authMessage,
        clearMessages,
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
