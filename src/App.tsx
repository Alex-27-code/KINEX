import { Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Workout from './pages/Workout';
import ActiveWorkout from './pages/ActiveWorkout';
import Nutrition from './pages/Nutrition';
import Calculators from './pages/Calculators';
import Profile from './pages/Profile';
import LanguageSelect from './pages/LanguageSelect';
import Auth from './pages/Auth';
import { useAuth } from './hooks/useAuth';

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pb-16 min-h-screen">{children}</div>
      <BottomNav />
    </>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <span className="text-primary font-black text-4xl animate-pulse-neon">KINEX</span>
    </div>
  );
}

function AuthenticatedApp() {
  const { profile } = useAuth();

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:id" element={<ProgramDetail />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/active-workout" element={<ActiveWorkout />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

export default function App() {
  const { fbUser, profile, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  // Logged in but onboarding not done
  if (fbUser && profile && !profile.onboardingComplete) {
    return (
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    );
  }

  // Logged in + onboarding done
  if (fbUser && profile?.onboardingComplete) {
    return <AuthenticatedApp />;
  }

  // Not logged in
  return (
    <Routes>
      <Route path="/language-select" element={<LanguageSelect />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<Navigate to="/language-select" replace />} />
    </Routes>
  );
}
