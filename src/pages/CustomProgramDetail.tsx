import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useEffect, useState } from 'react';

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: '#4caf50',
  Intermediate: '#ff9800',
  Advanced: '#f44336',
};

type SavedProgram = {
  id: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  weeks: number;
  daysPerWeek: number;
  schedule: { title: string; exercises: any[] }[];
  createdAt: number;
};

export default function CustomProgramDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { fbUser } = useAuth();
  const [program, setProgram] = useState<SavedProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!fbUser || !id) return;
    setLoading(true);
    getDoc(doc(db, 'users', fbUser.uid, 'customPrograms', id))
      .then(snap => {
        if (snap.exists()) {
          setProgram({ id: snap.id, ...snap.data() } as SavedProgram);
        } else {
          setProgram(null);
        }
      })
      .catch(() => setProgram(null))
      .finally(() => setLoading(false));
  }, [fbUser, id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <span className="text-primary text-3xl animate-pulse">...</span>
      </div>
    );
  }

  // Not found
  if (!program) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5">
        <p className="text-gray-400 mb-4">{t('program_not_found') || 'Программа не найдена'}</p>
        <button
          onClick={() => navigate('/programs')}
          className="bg-primary text-black font-bold px-6 py-3 rounded-xl"
        >
          {t('back_to_programs') || 'К программам'}
        </button>
      </div>
    );
  }

  const difficultyColor = DIFFICULTY_COLORS[program.difficulty] || '#666';

  const startWorkout = (dayIdx: number) => {
    const day = program.schedule[dayIdx];
    if (!day?.exercises?.length) return;
    const exercises = day.exercises.map((ex: any) => ({
      id: `start_${Date.now()}_${Math.random()}`,
      name: ex.name,
      sets: [{ id: `set_${Date.now()}`, weight: '', reps: ex.reps || '10', completed: false }],
      gifName: ex.gifName || '',
    }));
    sessionStorage.setItem('kinex_workout_template', JSON.stringify(exercises));
    navigate('/active-workout');
  };

  const handleDelete = async () => {
    if (!fbUser || !id) return;
    if (!window.confirm(t('confirm_delete_program') || 'Удалить программу?')) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'users', fbUser.uid, 'customPrograms', id));
      navigate('/programs');
    } catch (e) {
      console.error('Delete failed:', e);
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface px-5 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate('/programs')}
            className="w-10 h-10 rounded-full bg-white/5 border border-border flex items-center justify-center active:scale-90 transition-transform"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-extrabold text-white truncate">{program.name}</h1>
          </div>
          <button
            onClick={() => navigate(`/programs/edit/${id}`)}
            className="w-10 h-10 rounded-full bg-white/5 border border-border flex items-center justify-center active:scale-90 transition-transform flex-shrink-0"
          >
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
            </svg>
          </button>
        </div>
        <div className="flex gap-3 items-center flex-wrap">
          <span
            className="text-xs font-bold px-2 py-1 rounded-lg"
            style={{ backgroundColor: difficultyColor + '20', color: difficultyColor }}
          >
            {t(program.difficulty)}
          </span>
          <span className="text-gray-400 text-sm">
            {program.weeks} {t('weeks')} · {program.daysPerWeek} {t('days_per_week')}
          </span>
        </div>
      </div>

      {/* Schedule */}
      <div className="px-5 pt-6 pb-36 space-y-4">
        <h2 className="text-lg font-bold text-white">{t('schedule')}</h2>
        {(program.schedule || []).map((day: any, dayIdx: number) => (
          <div key={dayIdx} className="bg-surface border border-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-white">
                {day.title || `${t('day')} ${dayIdx + 1}`}
              </span>
              <span className="text-xs text-gray-500">
                {day.exercises?.length || 0} {t('exercises')}
              </span>
            </div>
            <div className="space-y-2">
              {(day.exercises || []).map((ex: any, exIdx: number) => (
                <div key={exIdx} className="flex items-center gap-3 bg-background rounded-xl p-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-bold truncate">{ex.name}</p>
                    <p className="text-gray-500 text-xs">{ex.sets} × {ex.reps}</p>
                  </div>
                </div>
              ))}
              {(!day.exercises || day.exercises.length === 0) && (
                <p className="text-gray-600 text-xs italic">{t('no_exercises_found')}</p>
              )}
              {day.exercises?.length > 0 && (
                <button
                  onClick={() => startWorkout(dayIdx)}
                  className="w-full mt-2 py-2.5 rounded-xl bg-primary text-black font-extrabold text-sm active:scale-95 transition-transform"
                >
                  ▶ {t('start_workout') || 'Начать тренировку'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Delete button at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border px-5 py-4">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="w-full py-3 rounded-xl font-bold text-red-400 border border-red-400/30 bg-red-400/10 active:scale-95 transition-transform text-sm disabled:opacity-50"
        >
          {deleting ? '...' : `🗑 ${t('delete_program') || 'Удалить программу'}`}
        </button>
      </div>
    </div>
  );
}
