import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Workout() {
  const { t, i18n } = useTranslation();
  const isRu = i18n.language === 'ru';
  const { fbUser } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [renaming, setRenaming] = useState(false);

  const startRename = (id: string, current: string) => {
    setRenameId(id);
    setRenameValue(current || '');
  };

  const saveRename = async (id: string) => {
    if (!renameValue.trim() || !fbUser) return;
    setRenaming(true);
    try {
      await updateDoc(doc(db, 'users', fbUser.uid, 'workouts', id), {
        title: renameValue.trim()
      });
      setHistory(prev => prev.map(w => w.id === id ? { ...w, title: renameValue.trim() } : w));
    } catch (_) {}
    setRenaming(false);
    setRenameId(null);
  };

  const formatWorkoutDate = (ts: any) => {
    if (!ts) return '';
    const d = new Date(ts.seconds ? ts.seconds * 1000 : ts);
    const dayNamesRu = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const dayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayNames = isRu ? dayNamesRu : dayNamesEn;
    return `${dayNames[d.getDay()]}, ${d.getDate()} ${isRu ? ['', 'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'][d.getMonth()] : d.toLocaleString('en', { month: 'short' })}`;
  };


  useEffect(() => {
    if (!fbUser || !fbUser) return;
    const loadHistory = async () => {
      try {
        const workoutsRef = collection(db, 'users', fbUser!.uid, 'workouts');
        const snap = await getDocs(workoutsRef);
        const workouts = snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a: any, b: any) => {
            const ta = a.timestamp instanceof Date ? a.timestamp.getTime() : new Date(a.timestamp).getTime();
            const tb = b.timestamp instanceof Date ? b.timestamp.getTime() : new Date(b.timestamp).getTime();
            return tb - ta;
          });
        setHistory(workouts);
      } catch (_) {
        setHistory([]);
      }
    };
    loadHistory();
  }, [fbUser]);

  // Generate date labels (7 days back, today, 7 days forward)
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const dates = [];
  for (let i = -7; i <= 7; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const dayNames = isRu
      ? ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dates.push({ date: d.getDate(), dayName: dayNames[d.getDay()], fullDate: dateStr, isToday: i === 0 });
  }

  const [selectedDate, setSelectedDate] = useState(todayStr);

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-surface rounded-b-3xl px-5 pt-8 pb-6 mb-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-white">{t('workout_title')}</h1>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
            </svg>
          </div>
        </div>

        {/* Date scroller */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {dates.map(day => {
            const isSelected = day.fullDate === selectedDate;
            return (
              <button
                key={day.fullDate}
                onClick={() => setSelectedDate(day.fullDate)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl mr-2 transition-all ${
                  isSelected ? 'bg-primary' : 'bg-white/5 border border-white/5'
                } ${day.isToday && !isSelected ? 'border-primary/50' : ''}`}
              >
                <span className={`text-xs mb-1 ${isSelected ? 'text-black' : 'text-gray-400'}`}>{day.dayName}</span>
                <span className={`text-xl font-bold ${isSelected ? 'text-black' : 'text-white'}`}>{day.date}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 py-6">
        {/* Today's workout CTA */}
        <div className="bg-surface border border-border rounded-3xl p-6 mb-6">
          <p className="text-gray-400 mb-4 text-sm">{t('ready_to_workout')}</p>
          <Link to="/active-workout" className="block w-full bg-primary text-black font-extrabold py-4 rounded-2xl text-center active:scale-95 transition-transform neon-glow">
            {t('start_workout') || 'Start New Workout'}
          </Link>
        </div>

        {/* Recent history */}
        <h2 className="text-xl font-bold text-white mb-4">{t('history')}</h2>
        {history.length === 0 ? (
          <p className="text-gray-500 italic text-sm">{t('no_completed_workouts')}</p>
        ) : (
          <div className="space-y-3">
            {history
              .filter(w => {
                if (!w.timestamp) return false;
                const d = new Date(w.timestamp.seconds ? w.timestamp.seconds * 1000 : w.timestamp);
                const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                return dateStr === selectedDate;
              })
              .map(workout => {
              const isRenaming = renameId === workout.id;
              return (
              <div key={workout.id} className="bg-surface border border-border rounded-2xl p-4 active:bg-white/5 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  {isRenaming ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        value={renameValue}
                        onChange={e => setRenameValue(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && saveRename(workout.id)}
                        className="flex-1 bg-background border border-border rounded-lg px-3 py-1.5 text-white text-sm outline-none"
                        autoFocus
                      />
                      <button onClick={() => saveRename(workout.id)} disabled={renaming} className="text-primary font-bold text-sm px-2 py-1">
                        {t('save')}
                      </button>
                      <button onClick={() => setRenameId(null)} className="text-gray-500 font-bold text-sm px-2 py-1">
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-white flex-1">{workout.title || 'Workout'}</h3>
                      <button onClick={() => startRename(workout.id, workout.title || 'Workout')} className="text-gray-500 hover:text-white ml-2 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-400">
                    {formatWorkoutDate(workout.timestamp)} • {workout.exercises?.length || 0} {t('exercises') || 'exercises'}
                  </p>
                  <span className="text-primary font-bold">{workout.duration} {t('minutes') || 'min'}</span>
                </div>
                {!isRenaming && (
                  <Link to={`/workout/${workout.id}`} className="block mt-3 w-full text-center bg-white/5 border border-border rounded-xl py-2.5 text-white text-sm font-bold active:scale-95 transition-transform">
                    {t('open') || 'Open'}
                  </Link>
                )}
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
