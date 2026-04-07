import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PROGRAMS_DATA } from '../data/programs';
import { useAuth } from '../hooks/useAuth';

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: '#4caf50',
  Intermediate: '#ff9800',
  Advanced: '#f44336',
  'All Levels': '#2196f3',
};

export default function ProgramDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { profile } = useAuth();

  const program = PROGRAMS_DATA.find(p => p.id === id);

  if (!program) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-gray-400 mb-4">Program not found</p>
        <button onClick={() => navigate('/programs')} className="primary-btn px-6 py-3">
          Back to Programs
        </button>
      </div>
    );
  }

  const unit = profile?.unit === 'imperial' ? 'lbs' : 'kg';

  const startWorkout = (exercises: any[]) => {
    // Encode exercises as JSON query param
    const encoded = encodeURIComponent(JSON.stringify(exercises));
    navigate(`/active-workout?template=${encoded}`);
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-surface px-5 pt-8 pb-6 rounded-b-3xl mb-0">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('/programs')} className="w-10 h-10 rounded-full bg-white/5 border border-border flex items-center justify-center active:scale-90 transition-transform">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
            </svg>
          </button>
          <h1 className="text-2xl font-extrabold text-white flex-1 leading-tight">{program.title}</h1>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider" style={{ backgroundColor: (DIFFICULTY_COLORS[program.difficulty] || '#666') + '20', color: DIFFICULTY_COLORS[program.difficulty] }}>
            {program.difficulty}
          </span>
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 text-gray-300">
            {program.daysPerWeek}x / week
          </span>
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 text-gray-300">
            {program.weeks} weeks
          </span>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed">{program.description}</p>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Nutrition Guide */}
        {program.nutritionGuide && (
          <div className="bg-gradient-to-br from-surface to-surface/50 border border-primary/20 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0"/>
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg">Nutrition Guide</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{program.nutritionGuide}</p>
          </div>
        )}

        {/* Schedule */}
        {program.schedule.map((week, wi) => (
          <div key={wi}>
            <h2 className="text-primary font-bold text-lg mb-4 uppercase tracking-wide">{week.weekLabel}</h2>
            <div className="space-y-4">
              {week.days.map((day, di) => (
                <div key={di} className="bg-surface border border-border rounded-2xl p-5">
                  <h3 className="text-white font-bold text-lg mb-4 border-b border-border pb-3">{day.title}</h3>

                  <div className="space-y-3 mb-5">
                    {day.exercises.map((ex, ei) => (
                      <div key={ei} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                        <div className="flex-1 mr-4">
                          <p className="text-gray-200 text-sm font-medium">{ex.name}</p>
                          {ex.note && <p className="text-gray-500 text-xs mt-0.5 italic">{ex.note}</p>}
                        </div>
                        <span className="text-primary font-bold text-sm whitespace-nowrap bg-black/30 px-3 py-1.5 rounded-lg border border-white/5">
                          {ex.sets} <span className="text-gray-400 font-normal">×</span> {ex.reps}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => startWorkout(day.exercises)}
                    className="w-full bg-primary text-black font-extrabold py-3.5 rounded-xl active:scale-95 transition-transform neon-glow"
                  >
                    Start Workout
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {program.schedule.length === 0 && (
          <div className="bg-surface/50 border border-border rounded-3xl py-16 text-center">
            <p className="text-gray-400">Program content coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
