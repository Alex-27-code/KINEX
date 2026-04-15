import { useState, useEffect, useRef, RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { collection, doc, getDocs, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { analyzeFoodImage, parseAIError } from '../utils/gemini';

type FoodItem = {
  id: string;
  name: string;
  displayName?: string;
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

type ScanState = 'idle' | 'scanning' | 'result' | 'correcting' | 'rescanning';

export default function Nutrition() {
  const { t, i18n } = useTranslation();
  const { fbUser, profile, saveProfile } = useAuth();
  const [log, setLog] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [scanResult, setScanResult] = useState<FoodItem | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [correctionText, setCorrectionText] = useState('');
  const [base64Image, setBase64Image] = useState<string>('');
  const [pendingImage, setPendingImage] = useState<{file: File; base64: string} | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageComment, setImageComment] = useState('');
  const [targetModal, setTargetModal] = useState(false);
  const [tempTarget, setTempTarget] = useState('');
  const [manualModal, setManualModal] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualCals, setManualCals] = useState('');
  const [manualProtein, setManualProtein] = useState('');
  const [manualCarbs, setManualCarbs] = useState('');
  const [manualFats, setManualFats] = useState('');
  const fileInputRef: RefObject<HTMLInputElement | null> = useRef(null);
  const cameraInputRef: RefObject<HTMLInputElement | null> = useRef(null);
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

  const saveFoodItem = async (item: FoodItem) => {
    if (!fbUser?.uid) return;
    try {
      const dateStr = getLocalDateString();
      const logRef = doc(db, `users/${fbUser.uid}/nutrition`, dateStr);
      const snap = await getDocs(collection(db, `users/${fbUser.uid}/nutrition`));
      const existing = snap.docs.find(d => d.id === dateStr);
      const existingItems = existing?.data()?.items || [];
      await setDoc(logRef, { items: [...existingItems, item], date: dateStr, updatedAt: serverTimestamp() }, { merge: true });
      setLog(prev => [item, ...prev]);
    } catch (err) {
      console.error('[Nutrition] saveFoodItem error:', err);
    }
  };

  const acceptScan = async () => {
    if (!scanResult) return;
    if (!fbUser) {
      alert(isRu ? 'Сначала войди в аккаунт через Профиль' : 'Please log in via Profile first');
      return;
    }
    await saveFoodItem(scanResult);
    setScanState('idle');
    setScanResult(null);
    setCorrectionText('');
  };

  const dislikeScan = () => {
    setScanState('correcting');
  };

  const recalculateScan = async () => {
    if (!base64Image || !correctionText.trim()) return;
    setScanState('rescanning');
    try {
      const result = await analyzeFoodImage(base64Image, correctionText, i18n.language);
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
      setScanResult(foodItem);
      setCorrectionText('');
      setScanState('result');
    } catch (e: any) {
      setScanError(parseAIError(e, isRu));
      setScanState('result');
    }
  };

  const handleImageScan = async (file: File) => {
    if (!fbUser) {
      setScanError(isRu ? 'Сначала войди в аккаунт через Профиль' : 'Please log in via Profile first');
      return;
    }
    setScanState('scanning');
    setScanError(null);
    setScanResult(null);
    setCorrectionText('');
    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = (e) => resolve((e.target?.result as string).split(',')[1] || '');
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
      setBase64Image(base64);

      const result = await analyzeFoodImage(base64, undefined, i18n.language);
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
      setScanResult(foodItem);
      setScanState('result');
    } catch (e: any) {
      setScanError(parseAIError(e, isRu));
      setScanState('idle');
    }
  };

  const deleteItem = async (item: FoodItem) => {
    if (!confirm(isRu ? 'Удалить эту запись?' : 'Delete this entry?')) return;
    try {
      const dateStr = item.timestamp?.seconds
        ? new Date(item.timestamp.seconds * 1000).toISOString().split('T')[0]
        : getLocalDateString();
      const snap = await getDocs(collection(db, `users/${fbUser!.uid}/nutrition`));
      const docToUpdate = snap.docs.find(d => d.id === dateStr);
      if (docToUpdate) {
        const items = docToUpdate.data().items?.filter((i: any) => i.id !== item.id) || [];
        if (items.length > 0) {
          await setDoc(doc(db, `users/${fbUser!.uid}/nutrition`, dateStr), { items }, { merge: true });
        } else {
          await deleteDoc(doc(db, `users/${fbUser!.uid}/nutrition`, dateStr));
        }
      }
      setLog(prev => prev.filter(i => i.id !== item.id));
    } catch (_) {}
  };

  const saveManual = async () => {
    if (!manualName || !manualCals) {
      return;
    }
    if (!fbUser) {
      alert(isRu ? 'Сначала войди в аккаунт через Профиль' : 'Please log in via Profile first');
      return;
    }
    const item: FoodItem = {
      id: Date.now().toString(),
      name: manualName,
      calories: Number(manualCals) || 0,
      protein: Number(manualProtein) || 0,
      carbs: Number(manualCarbs) || 0,
      fats: Number(manualFats) || 0,
      timestamp: serverTimestamp(),
    };
    await saveFoodItem(item);
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

  const l = (en: string, ru: string, de?: string, es?: string) => {
    if (i18n.language === 'ru') return ru;
    if (i18n.language === 'de') return de || en;
    if (i18n.language === 'es') return es || en;
    return en;
  };

  return (
    <div className="min-h-screen bg-background px-5 pt-8 pb-36">
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
            {remaining >= 0 ? `${remaining} ${l('kcal left', 'ккал осталось', 'kcal übrig', 'kcal restantes')}` : `${Math.abs(remaining)} ${l('kcal over', 'ккал перебор', 'kcal über', 'kcal de más')}`}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center border-t border-border pt-4">
          <div><p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{l('Protein', 'Белок', 'Protein', 'Proteína')}</p><p className="font-bold text-white text-sm">{currentProtein}g</p></div>
          <div><p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{l('Carbs', 'Угл', 'Kohlenhydraten', 'Carbohidratos')}</p><p className="font-bold text-white text-sm">{currentCarbs}g</p></div>
          <div><p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{l('Fats', 'Жиры', 'Fette', 'Grasas')}</p><p className="font-bold text-white text-sm">{currentFats}g</p></div>
          <div><p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{l('Fiber', 'Клетч', 'Ballast', 'Fibra')}</p><p className="font-bold text-white text-sm">{currentFiber}g</p></div>
        </div>
      </div>

      {/* Scan Result Card */}
      {(scanState === 'result' || scanState === 'correcting' || scanState === 'rescanning') && scanResult && (
        <div className="bg-surface border border-primary/40 rounded-2xl p-5 mb-4">
          {scanState === 'correcting' && (
            <p className="text-primary text-sm font-bold mb-3">✗ {l('Result not right. Enter correction:', 'Результат не понравился. Введите исправление:', 'Ergebnis nicht richtig. Korrektur eingeben:', 'Resultado incorrecto. Ingrese corrección:')}</p>
          )}

          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-primary font-bold text-lg">{scanResult.displayName || scanResult.name}</p>
              <p className="text-white text-3xl font-black">{scanResult.calories} <span className="text-primary text-lg font-normal">kcal</span></p>
            </div>
            <button onClick={() => { setScanState('idle'); setScanResult(null); setCorrectionText(''); }} className="text-gray-400 p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4 bg-black/20 rounded-xl p-3">
            <div className="text-center"><p className="text-gray-500 text-xs">P</p><p className="text-white font-bold">{scanResult.protein}g</p></div>
            <div className="text-center"><p className="text-gray-500 text-xs">C</p><p className="text-white font-bold">{scanResult.carbs}g</p></div>
            <div className="text-center"><p className="text-gray-500 text-xs">F</p><p className="text-white font-bold">{scanResult.fats}g</p></div>
            <div className="text-center"><p className="text-gray-500 text-xs">Fib</p><p className="text-white font-bold">{scanResult.fiber || 0}g</p></div>
          </div>

          {scanResult.breakdown && (
            <p className="text-gray-500 text-xs italic mb-4">{scanResult.breakdown}</p>
          )}

          {scanState === 'correcting' && (
            <div className="mb-3">
              <input
                type="text"
                value={correctionText}
                onChange={e => setCorrectionText(e.target.value)}
                placeholder={t('what_was_wrong_placeholder')}
                className="input-field w-full text-sm mb-2"
              />
            </div>
          )}

          {scanState === 'rescanning' ? (
            <div className="flex items-center justify-center py-3">
              <svg className="w-5 h-5 text-primary animate-spin mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span className="text-primary text-sm font-bold">{l('Recalculating...', 'Пересчитываем...', 'Berechne...', 'Recalculando...')}</span>
            </div>
          ) : (
            <div className="flex gap-2">
              <button onClick={acceptScan} className="flex-1 bg-primary text-black font-extrabold py-3 rounded-xl active:scale-95 transition-transform">
                ✓ {l('Like', 'Нравится', 'Gefällt mir', 'Me gusta')}
              </button>
              {scanState !== 'correcting' && (
                <button onClick={dislikeScan} className="flex-1 bg-white/10 text-white font-bold py-3 rounded-xl active:scale-95 transition-transform">
                  ✗ {l('Dislike', 'Не нравится', 'Nicht gefallen', 'No me gusta')}
                </button>
              )}
              {scanState === 'correcting' && (
                <button onClick={recalculateScan} disabled={!correctionText.trim()} className="flex-1 bg-primary text-black font-extrabold py-3 rounded-xl active:scale-95 transition-transform disabled:opacity-40">
                  {l('Recalculate', 'Пересчитать', 'Neuberechnen', 'Recalcular')}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {scanError && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 mb-4 flex items-start gap-3">
          <span className="text-2xl">🤖</span>
          <p className="text-yellow-300 text-sm leading-relaxed flex-1">{scanError}</p>
        </div>
      )}

      {/* Photo Comment Modal */}
      {showImageModal && pendingImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl p-5 w-full max-w-sm border border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold text-lg">{l('Photo for AI', 'Фото для ИИ')}</h3>
              <button onClick={() => { setShowImageModal(false); setPendingImage(null); setImageComment(''); }} className="text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="bg-black/30 rounded-xl p-2 mb-4 flex justify-center">
              <img src={`data:image/jpeg;base64,${pendingImage.base64}`} alt="Preview" className="h-32 object-contain rounded-lg" />
            </div>
            <textarea
              value={imageComment}
              onChange={e => setImageComment(e.target.value)}
              placeholder={t('add_comment_placeholder')}
              className="input-field w-full text-sm mb-4 resize-none"
              rows={3}
            />
            <button
              onClick={async () => {
                if (!pendingImage) return;
                setShowImageModal(false);
                setScanState('scanning');
                setScanError(null);
                setScanResult(null);
                setBase64Image(pendingImage.base64);
                try {
                  const result = await analyzeFoodImage(pendingImage.base64, imageComment || undefined, i18n.language);
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
                  setScanResult(foodItem);
                  setScanState('result');
                } catch (e: any) {
                  console.error('[Nutrition] analyzeFoodImage error:', e?.message || e, '| error detail:', JSON.stringify(e?.response || e?.status || e));
                  setScanError(parseAIError(e, isRu));
                  setScanState('idle');
                }
                setPendingImage(null);
                setImageComment('');
              }}
              className="w-full bg-primary text-black font-extrabold py-3 rounded-xl active:scale-95 transition-transform"
            >
              🤖 {l('Send to AI', 'Отправить ИИ')}
            </button>
          </div>
        </div>
      )}

      {/* Scanning indicator */}
      {scanState === 'scanning' && (
        <div className="bg-surface border border-primary/30 rounded-2xl p-6 mb-4 text-center">
          <svg className="w-8 h-8 text-primary animate-spin mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <p className="text-primary font-bold">{l('Scanning...', 'Сканируем...')}</p>
        </div>
      )}

      {/* Image Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={e => { const file = e.target.files?.[0]; if (file) { const reader = new FileReader(); reader.onload = (ev) => { const base64 = (ev.target?.result as string).split(',')[1] || ''; setPendingImage({ file, base64 }); setImageComment(''); setShowImageModal(true); }; reader.readAsDataURL(file); } e.target.value = ''; }} />
        <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} className="hidden" onChange={e => { const file = e.target.files?.[0]; if (file) { const reader = new FileReader(); reader.onload = (ev) => { const base64 = (ev.target?.result as string).split(',')[1] || ''; setPendingImage({ file, base64 }); setImageComment(''); setShowImageModal(true); }; reader.readAsDataURL(file); } e.target.value = ''; }} />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={scanState === 'scanning'}
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
          onClick={() => cameraInputRef.current?.click()}
          disabled={scanState === 'scanning'}
          className="bg-primary text-black rounded-2xl py-5 flex flex-col items-center gap-2 active:scale-95 transition-transform disabled:opacity-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          <span className="font-bold text-sm">{l('Photo', 'Фото')}</span>
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
                <input type="number" value={manualProtein} onChange={e => setManualProtein(e.target.value)} className="input-field text-center text-sm" placeholder="Белок g" />
                <input type="number" value={manualCarbs} onChange={e => setManualCarbs(e.target.value)} className="input-field text-center text-sm" placeholder="Угл g" />
                <input type="number" value={manualFats} onChange={e => setManualFats(e.target.value)} className="input-field text-center text-sm" placeholder="Жиры g" />
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
