import { Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import WorkoutDetail from './pages/WorkoutDetail';
import Workout from './pages/Workout';
import CreateProgram from './pages/CreateProgram';
import CustomProgramDetail from './pages/CustomProgramDetail';
import ActiveWorkout from './pages/ActiveWorkout';
import Nutrition from './pages/Nutrition';
import Calculators from './pages/Calculators';
import Profile from './pages/Profile';
import LanguageSelect from './pages/LanguageSelect';
import Auth from './pages/Auth';
import { useAuth } from './hooks/useAuth';
import { Component, ReactNode } from 'react';

class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }> {
  state = { hasError: false, error: '' };
  static getDerivedStateFromError(e: any) {
    return { hasError: true, error: e?.message || String(e) };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5">
          <p className="text-red-400 font-bold mb-2">Ошибка</p>
          <p className="text-gray-500 text-sm text-center mb-4">{this.state.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-black font-bold px-6 py-3 rounded-xl"
          >
            Обновить
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
    <ErrorBoundary>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:id" element={<ProgramDetail />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/workout/:id" element={<WorkoutDetail />} />
          <Route path="/programs/create" element={<CreateProgram />} />
          <Route path="/programs/edit/:id" element={<CreateProgram />} />
          <Route path="/programs/custom/:id" element={<CustomProgramDetail />} />
          <Route path="/active-workout" element={<ActiveWorkout />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </ErrorBoundary>
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
