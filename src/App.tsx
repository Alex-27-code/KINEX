import { Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Programs from './pages/Programs';
import Workout from './pages/Workout';
import ActiveWorkout from './pages/ActiveWorkout';
import Nutrition from './pages/Nutrition';
import Calculators from './pages/Calculators';
import Profile from './pages/Profile';
import { useAuth } from './hooks/useAuth';
import React from 'react';

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { tgUser, profile, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex text-primary items-center justify-center animate-pulse-neon">KINEX</div>;
  if (!tgUser) return <div className="text-center mt-20 text-white">Please open this app inside Telegram.</div>;
  if (profile && !profile.onboardingComplete) return <Navigate to="/onboarding" />;
  
  return (
    <>
      <div className="pb-16">{children}</div>
      <BottomNav />
    </>
  );
}

export default function App() {
  const { tgUser, profile, loading } = useAuth();

  if (loading) return <div className="min-h-screen bg-background flex flex-col items-center justify-center text-primary font-black text-4xl animate-pulse-neon">KINEX</div>;

  return (
    <Routes>
      <Route path="/onboarding" element={tgUser && profile && !profile.onboardingComplete ? <Onboarding /> : <Navigate to="/" />} />
      
      <Route path="/" element={<AuthRoute><Home /></AuthRoute>} />
      <Route path="/programs" element={<AuthRoute><Programs /></AuthRoute>} />
      <Route path="/workout" element={<AuthRoute><Workout /></AuthRoute>} />
      <Route path="/active-workout" element={<AuthRoute><ActiveWorkout /></AuthRoute>} />
      <Route path="/nutrition" element={<AuthRoute><Nutrition /></AuthRoute>} />
      <Route path="/calculators" element={<AuthRoute><Calculators /></AuthRoute>} />
      <Route path="/profile" element={<AuthRoute><Profile /></AuthRoute>} />
    </Routes>
  );
}
