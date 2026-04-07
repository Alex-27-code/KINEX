import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { collection, doc, getDocs, setDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { analyzeFoodImage } from '../utils/gemini';

type FoodItem = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  timestamp?: any;
  breakdown?: string;
};

function getLocalDateString() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - offset * 60000);
  return localDate.toISOString().split('T')[0];
}

export default function Nutrition() {
  const { t, i18n } = useTranslation();
  const { fbUser, profile, saveProfile } = useAuth();
  const [log, setLog] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [targetModal, setTargetModal] = useState(false);
  const [tempTarget, setTempTarget] = useState('');
  const [manualModal, setManualModal] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualCals, setManualCals] = useState('');
  const [manualProtein, setManualProtein] = useState('');
  const [manualCarbs, setManualCarbs] = useState('');
  const [manualFats, setManualFats] = useState('');
  const [lastScan, setLastScan] = useState<FoodItem | null>(null);
  const fileInputRef = useState<React.RefObject<HTMLInputElement>>({ current: null } as any);
  const cameraInputRef = useState<React.RefObject<HTMLInputElement>>({ current: null } as any);
  const isRu = i18n.language === 'ru';

  const targetCalories = profile?.dailyCalories || 2500;

  useEffect(() => {
    if (!fbUser) return;
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, `users/${fbUser.uid}/nutrition`));
        const items: FoodItem[] = [];
        snap.docs.forEach(d => {
          const data = d.data();
          if (data.items && Array.isArray(data.items)) {
            data.items.forEach((item: any) => items.push(item));
          }
        });
        items.sort((a, b) => {
          const ta = a.timestamp?.seconds || 0;
          const tb = b.timestamp?.seconds || 0;
          return tb - ta;
        });
        setLog(items);
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

  const grouped: Record<string, FoodItem[]> = {};
  log.forEach(item => {
    if (!item.timestamp) return;
    const ts = item.timestamp?.seconds ? new Date(item.timestamp.seconds * 1000) : new Date(item.timestamp);
    const key = ts.toDateString() === todayStr ? (isRu ? 'Сегодня' : 'Today') : ts.toLocaleDateString();
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });

  const deleteItem = async (item: FoodItem) => {
    if (!confirm(isRu ? 'Удалить эту запись?' : 'Delete this entry?')) return;
    try {
      const dateStr = item.timestamp?.seconds
        ? new Date(item.timestamp.seconds * 1000).toISOString().split('T')[0]
        : getLocalDateString();
      const logRef = doc(db, `users/${fbUser!.uid}/nutrition`, dateStr);
      const snap = await getDocs(collection(db, `users/${fbUser!.uid}/nutrition`));
      const docToUpdate = snap.docs.find(d => d.id === dateStr);
      if (docToUpdate) {
        const items = docToUpdate.data().items?.filter((i: any) => i.id !== item.id) || [];
        if (items.length > 0) {
          await setDoc(logRef, { items }, { merge: true });
        } else {
          await deleteDoc(logRef);
        }
      }
      setLog(prev => prev.filter(i => i.id !== item.id));
    } catch (_) {}
  };

  const handleImageScan = async (file: File) => {
    if (!fbUser) return;
    setScanning(true);
    setScanError(null);
    setLastScan(null);
    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = (e) => resolve((e.target?.result as string).split(',')[1] || '');
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const result = await analyzeFoodImage(base64);
      const foodItem: FoodItem = {
        id: Date.now().toString(),
        name: result.meal || 'Food',
        calories: result.calories || 0,
        protein: result.protein || 0,
        carbs: result.carbs || 0,
        fats: result.fats || 0,
        fiber: result.fiber || 0,
        breakdown: result.breakdown,
        timestamp: serverTimestamp(),
      };

      // Save to Firestore
      const dateStr = getLocalDateString();
      const logRef = doc(db, `users/${fbUser.uid}/nutrition`, dateStr);
      const snap = await getDocs(collection(db, `users/${fbUser.uid}/nutrition`));
      const existing = snap.docs.find(d => d.id === dateStr);
      const existingItems = existing?.data()?.items || [];
      await setDoc(logRef, { items: [...existingItems, foodItem], date: dateStr }, { merge: true });

      setLog(prev => [foodItem, ...prev]);
      setLastScan(foodItem);
    } catch (e: any) {
      setScanError(e.message || (isRu ? 'Ошибка сканирования' : 'Scan failed'));
    } finally {
      setScanning(false);
    }
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
    const dateStr = getLocalDateString();
    const logRef = doc(db, `users/${fbUser.uid}/nutrition`, dateStr);
    const snap = await getDocs(collection(db, `users/${fbUser.uid}/nutrition`));
    const existing = snap.docs.find(d => d.id === dateStr);
    const existingItems = existing?.data()?.items || [];
    await setDoc(logRef, { items: [...existingItems, item], date: dateStr }, { merge: true });
    setLog(prev => [item, ...prev]);
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.149-.894z"/>
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
            {remaining >= 0 ? `${remaining} ${l('kcal left', 'ккал осталось')}` : `${Math.abs(remaining)} ${l('kcal over', 'ккал перебор')}`}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center border-t border-border pt-4">
          <div><p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{l('Protein', 'Белок')}</p><p className="font-bold text-white text-sm">{currentProtein}g</p></div>
          <div><p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{l('Carbs', 'Угл')}</p><p className="font-bold text-white text-sm">{currentCarbs}g</p></div>
          <div><p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{l('Fats', 'Жиры')}</p><p className="font-bold text-white text-sm">{currentFats}g</p></div>
          <div><p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{l('Fiber', 'Клетч')}</p><p className="font-bold text-white text-sm">{currentFiber}g</p></div>
        </div>
      </div>

      {/* Last Scan Result */}
      {lastScan && (
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 mb-4">
          <p className="text-primary font-bold text-sm mb-2">✓ {l('Food added:', 'Еда добавлена:')} {lastScan.name}</p>
          <p className="text-white font-bold text-lg">{lastScan.calories} kcal</p>
          <p className="text-gray-400 text-xs">P: {lastScan.protein}g  C: {lastScan.carbs}g  F: {lastScan.fats}g</p>
          {lastScan.breakdown && <p className="text-gray-500 text-xs mt-1 italic">{lastScan.breakdown}</p>}
        </div>
      )}

      {/* Error */}
      {scanError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 mb-4">
          <p className="text-red-400 text-sm">{scanError}</p>
        </div>
      )}

      {/* Image Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <input type="file" accept="image/*" ref={fileInputRef as any} className="hidden" onChange={e => { if (e.target.files?.[0]) handleImageScan(e.target.files[0]); e.target.value = ''; }} />
        <input type="file" accept="image/*" capture="environment" ref={cameraInputRef as any} className="hidden" onChange={e => { if (e.target.files?.[0]) handleImageScan(e.target.files[0]); e.target.value = ''; }} />
        <button
          onClick={() => (fileInputRef as any).current?.click()}
          disabled={scanning}
          className="bg-surface border border-border rounded-2xl py-5 flex flex-col items-center gap-2 active:bg-white/5 transition-colors disabled:opacity-50"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
          <span className="text-white text-sm font-bold">{l('Gallery', 'Галерея')}</span>
        </button>
        <button
          onClick={() => (cameraInputRef as any).current?.click()}
          disabled={scanning}
          className="bg-primary text-black rounded-2xl py-5 flex flex-col items-center gap-2 active:scale-95 transition-transform disabled:opacity-50"
        >
          {scanning ? (
            <>
              <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span className="font-bold">{l('Scanning...', 'Сканирование...')}</span>
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              <span className="font-bold">{l('Photo', 'Фото')}</span>
            </>
          )}
        </button>
      </div>

      {/* Manual Add */}
      <button onClick={() => setManualModal(true)} className="w-full bg-surface border border-border rounded-2xl py-4 flex items-center justify-center gap-2 mb-6 active:bg-white/5 transition-colors">
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        <span className="text-primary font-bold text-sm">{l('Add manually', 'Добавить вручную')}</span>
      </button>

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
                    {item.breakdown && <p className="text-gray-600 text-xs mt-0.5 italic">{item.breakdown}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-bold">{item.calories}</span>
                    <button onClick={() => deleteItem(item)} className="text-red-400 p-1">
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
