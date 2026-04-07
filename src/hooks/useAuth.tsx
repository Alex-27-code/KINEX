import { useState, useEffect, createContext, useContext } from 'react';
import WebApp from '@twa-dev/sdk';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../i18n'; // Ensure i18n is initialized
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
}

interface AuthContextType {
  tgUser: TelegramUser | null;
  profile: UserProfile | null;
  loading: boolean;
  saveProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const defaultProfile: UserProfile = {
  unit: 'metric', gender: 'male', weight: 75, height: 180, age: 25,
  goal: 'maintain', dailyCalories: 2500, onboardingComplete: false,
  isPremium: false, premiumEndsAt: null
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [tgUser, setTgUser] = useState<TelegramUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    // 1. Initialize Telegram Mini App safely
    try {
      WebApp.ready();
      WebApp.expand();
    } catch (e) {
      // Not inside Telegram, ignore
    }

    const user = WebApp.initDataUnsafe?.user;
    if (user) {
      setTgUser(user as TelegramUser);
      
      // Auto-set language based on Telegram settings
      const lang = user.language_code || 'en';
      if (['ru', 'de', 'es'].includes(lang)) {
        i18n.changeLanguage(lang);
      }

      // 2. Fetch or Create Firestore Profile using Telegram ID
      const fetchProfile = async () => {
        try {
          const userRef = doc(db, 'users', user.id.toString());
          const snap = await getDoc(userRef);
          
          if (snap.exists()) {
            setProfile(snap.data() as UserProfile);
          } else {
            const initialProfile = { 
              ...defaultProfile, 
              tg_first_name: user.first_name,
              tg_username: user.username,
              createdAt: serverTimestamp() 
            };
            await setDoc(userRef, initialProfile);
            setProfile(initialProfile);
          }
        } catch (error) {
          console.error("Firebase error:", error);
          setProfile(defaultProfile);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    } else {
      // Outside Telegram → mock user for browser testing
      setTgUser({ id: 12345678, first_name: 'Developer', language_code: 'ru' });
      setProfile(defaultProfile);
      setLoading(false);
    }
  }, []);

  const saveProfile = async (data: Partial<UserProfile>) => {
    if (!tgUser) return;
    const updated = { ...defaultProfile, ...profile, ...data };
    await setDoc(doc(db, 'users', tgUser.id.toString()), updated, { merge: true });
    setProfile(updated);
  };

  return (
    <AuthContext.Provider value={{ tgUser, profile, loading, saveProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
