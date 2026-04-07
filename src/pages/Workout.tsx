import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

export default function Workout() {
  const { t } = useTranslation();
  const { fbUser } = useAuth();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!fbUser || !auth.currentUser) return;
    const loadHistory = async () => {
      try {
        const workoutsRef = collection(db, 'users', auth.currentUser!.uid, 'workouts');
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
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dates.push({ date: d.getDate(), dayName: dayNames[d.getDay()], fullDate: dateStr, isToday: i === 0 });
  }

  const [selectedDate, setSelectedDate] = useState(todayStr);

  return (
    <div className="min-h-screen bg-background pb-8">
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
          <p className="text-gray-400 mb-4 text-sm">Ready to workout?</p>
          <Link to="/active-workout" className="block w-full bg-primary text-black font-extrabold py-4 rounded-2xl text-center active:scale-95 transition-transform neon-glow">
            {t('start_workout') || 'Start New Workout'}
          </Link>
        </div>

        {/* Recent history */}
        <h2 className="text-xl font-bold text-white mb-4">{t('history')}</h2>
        {history.length === 0 ? (
          <p className="text-gray-500 italic text-sm">No completed workouts yet.</p>
        ) : (
          <div className="space-y-3">
            {history.map(workout => (
              <Link key={workout.id} to={`/workout/${workout.id}`}
                className="block bg-surface border border-border rounded-2xl p-4 active:bg-white/5 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-white">{workout.title || 'Workout'}</h3>
                  <span className="text-primary font-bold">{workout.duration} min</span>
                </div>
                <p className="text-sm text-gray-400">
                  {workout.timestamp
                    ? new Date(workout.timestamp.seconds ? workout.timestamp.seconds * 1000 : workout.timestamp).toLocaleDateString()
                    : 'Recent'} • {workout.exercises?.length || 0} Exercises
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
