import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

type FoodItem = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  timestamp: any;
  imageUri?: string;
};

type DailyLog = {
  [date: string]: FoodItem[];
};

export default function Nutrition() {
  const { t, i18n } = useTranslation();
  const { fbUser, profile, saveProfile } = useAuth();
  const [log, setLog] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [targetModal, setTargetModal] = useState(false);
  const [tempTarget, setTempTarget] = useState('');
  const [manualModal, setManualModal] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualCals, setManualCals] = useState('');
  const [manualProtein, setManualProtein] = useState('');
  const [manualCarbs, setManualCarbs] = useState('');
  const [manualFats, setManualFats] = useState('');
  const isRu = i18n.language === 'ru';

  const targetCalories = profile?.dailyCalories || 2500;

  useEffect(() => {
    if (!fbUser) return;
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, `nutrition_${fbUser.uid}`));
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() } as FoodItem));
        setLog(items.sort((a, b) => {
          const ta = a.timestamp?.seconds || 0;
          const tb = b.timestamp?.seconds || 0;
          return tb - ta;
        }));
      } catch (_) {
        setLog([]);
      }
      setLoading(false);
    };
    load();
  }, [fbUser]);

  const todayStr = new Date().toDateString();
  const todayItems = log.filter(item => {
    if (!item.timestamp) return false;
    const ts = item.timestamp?.seconds ? new Date(item.timestamp.seconds * 1000) : new Date(item.timestamp);
    return ts.toDateString() === todayStr;
  });

  const currentCals = todayItems.reduce((s, i) => s + (i.calories || 0), 0);
  const currentProtein = todayItems.reduce((s, i) => s + (i.protein || 0), 0);
  const currentCarbs = todayItems.reduce((s, i) => s + (i.carbs || 0), 0);
  const currentFats = todayItems.reduce((s, i) => s + (i.fats || 0), 0);
  const currentFiber = todayItems.reduce((s, i) => s + (i.fiber || 0), 0);
  const progress = Math.min(currentCals / targetCalories, 1);
  const remaining = targetCalories - currentCals;

  const grouped: DailyLog = {};
  log.forEach(item => {
    if (!item.timestamp) return;
    const ts = item.timestamp?.seconds ? new Date(item.timestamp.seconds * 1000) : new Date(item.timestamp);
    const key = ts.toDateString() === todayStr ? isRu ? 'Сегодня' : 'Today' : ts.toLocaleDateString();
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });

  const deleteItem = async (id: string) => {
    if (!confirm(isRu ? 'Удалить эту запись?' : 'Delete this entry?')) return;
    try {
      await deleteDoc(doc(db, `nutrition_${fbUser!.uid}`, id));
      setLog(prev => prev.filter(i => i.id !== id));
    } catch (_) {}
  };

  const saveManual = async () => {
    if (!manualName || !manualCals || !fbUser) return;
    const item: FoodItem = {
      id: Date.now().toString(),
      name: manualName,
      calories: Number(manualCals) || 0,
      protein: Number(manualProtein) || 0,
      carbs: Number(manualCarbs) || 0,
      fats: Number(manualFats) || 0,
      timestamp: serverTimestamp(),
    };
    try {
      await setDoc(doc(db, `nutrition_${fbUser.uid}`, item.id), item);
      setLog(prev => [item, ...prev]);
    } catch (_) {}
    setManualModal(false);
    setManualName('');
    setManualCals('');
    setManualProtein('');
    setManualCarbs('');
    setManualFats('');
  };

  const saveTarget = async () => {
    const val = Number(tempTarget) || 2000;
    await saveProfile({ dailyCalories: val });
    setTargetModal(false);
  };

  const l = (en: string, ru: string) => isRu ? ru : en;

  return (
    <div className="min-h-screen bg-background px-5 pt-8 pb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-primary">AI {l('Nutrition', 'Питание')}</h1>
        <button onClick={() => { setTempTarget(String(targetCalories)); setTargetModal(true); }} className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </button>
      </div>

      {/* Progress Card */}
      <div className="bg-surface rounded-3xl p-5 border border-border mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">{l('Daily Goal', 'Дневная норма')}</span>
          <span className="font-bold text-white">{currentCals} / {targetCalories} kcal</span>
        </div>
        <div className="h-4 bg-[#2C2C2C] rounded-full overflow-hidden mb-2">
          <div className="h-full bg-primary transition-all" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="flex justify-between text-xs mb-4">
          <span className="text-gray-600">0</span>
          <span className={`font-bold ${remaining >= 0 ? 'text-primary' : 'text-red-400'}`}>
            {remaining >= 0 ? `${remaining} ${l('kcal Left', 'ккал осталось')}` : `${Math.abs(remaining)} ${l('kcal Over', 'ккал перебор')}`}
          </span>
        </div>
        {/* Macros */}
        <div className="grid grid-cols-4 gap-2 text-center border-t border-border pt-4">
          <div><p className="text-[10px] text-gray-500 uppercase mb-1">{l('Protein', 'Белок')}</p><p className="font-bold text-white text-sm">{currentProtein}g</p></div>
          <div><p className="text-[10px] text-gray-500 uppercase mb-1">{l('Carbs', 'Угл')}</p><p className="font-bold text-white text-sm">{currentCarbs}g</p></div>
          <div><p className="text-[10px] text-gray-500 uppercase mb-1">{l('Fats', 'Жиры')}</p><p className="font-bold text-white text-sm">{currentFats}g</p></div>
          <div><p className="text-[10px] text-gray-500 uppercase mb-1">{l('Fiber', 'Клетч')}</p><p className="font-bold text-white text-sm">{currentFiber}g</p></div>
        </div>
      </div>

      {/* Manual Add */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button onClick={() => setManualModal(true)} className="bg-surface border border-border rounded-2xl py-5 flex flex-col items-center gap-2 active:bg-white/5 transition-colors">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          <span className="text-white text-sm font-bold">{l('Add manually', 'Добавить вручную')}</span>
        </button>
        <div className="bg-primary text-black rounded-2xl py-5 flex flex-col items-center gap-2">
          <span className="text-2xl">⭐</span>
          <span className="text-sm font-bold">{l('AI Scan', 'ИИ Скан')}</span>
          <span className="text-xs opacity-70">{l('Coming soon', 'Скоро')}</span>
        </div>
      </div>

      {/* Food History */}
      <h2 className="text-xl font-bold text-white mb-4">{l('Food History', 'История питания')}</h2>
      {loading ? (
        <p className="text-gray-500 text-center py-8">...</p>
      ) : Object.keys(grouped).length === 0 ? (
        <p className="text-gray-500 italic text-center py-8">{l('No entries yet', 'Записей пока нет')}</p>
      ) : (
        Object.keys(grouped).map(date => (
          <div key={date} className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm font-bold">{date}</span>
              <span className="text-primary font-bold text-sm">{grouped[date].reduce((s, i) => s + i.calories, 0)} kcal</span>
            </div>
            <div className="space-y-2">
              {grouped[date].map(item => (
                <div key={item.id} className="bg-surface border border-border rounded-xl p-4 flex justify-between items-center">
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs">P: {item.protein}g  C: {item.carbs}g  F: {item.fats}g</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-bold">{item.calories}</span>
                    <button onClick={() => deleteItem(item.id)} className="text-red-400 p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.167 48.167 0 00-7.5 0"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Target Modal */}
      {targetModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6">
          <div className="bg-surface rounded-2xl p-6 w-full max-w-sm border border-border">
            <h3 className="text-white font-bold text-lg mb-4">{l('Daily Calorie Target', 'Дневная норма калорий')}</h3>
            <input type="number" value={tempTarget} onChange={e => setTempTarget(e.target.value)} className="input-field mb-4 text-center text-xl" placeholder="2500" />
            <div className="flex gap-3">
              <button onClick={() => setTargetModal(false)} className="flex-1 py-3 border border-border rounded-xl text-gray-400 font-bold">{l('Cancel', 'Отмена')}</button>
              <button onClick={saveTarget} className="flex-1 bg-primary text-black py-3 rounded-xl font-bold">{l('Save', 'Сохранить')}</button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Modal */}
      {manualModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl p-5 w-full max-w-sm border border-border max-h-[90vh] overflow-y-auto">
            <h3 className="text-white font-bold text-lg mb-4">{l('Add Food Entry', 'Добавить запись')}</h3>
            <div className="space-y-3">
              <input type="text" value={manualName} onChange={e => setManualName(e.target.value)} className="input-field" placeholder={l('Food name', 'Название')} />
              <input type="number" value={manualCals} onChange={e => setManualCals(e.target.value)} className="input-field" placeholder={l('Calories (kcal)', 'Калории (ккал)')} />
              <div className="grid grid-cols-3 gap-2">
                <input type="number" value={manualProtein} onChange={e => setManualProtein(e.target.value)} className="input-field text-center text-sm" placeholder={l('Protein g', 'Белок g')} />
                <input type="number" value={manualCarbs} onChange={e => setManualCarbs(e.target.value)} className="input-field text-center text-sm" placeholder={l('Carbs g', 'Угл g')} />
                <input type="number" value={manualFats} onChange={e => setManualFats(e.target.value)} className="input-field text-center text-sm" placeholder={l('Fats g', 'Жиры g')} />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setManualModal(false)} className="flex-1 py-3 border border-border rounded-xl text-gray-400 font-bold">{l('Cancel', 'Отмена')}</button>
              <button onClick={saveManual} className="flex-1 bg-primary text-black py-3 rounded-xl font-bold">{l('Add', 'Добавить')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
