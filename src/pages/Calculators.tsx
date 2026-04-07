import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';

const ACTIVITY_LEVELS = [
  { key: 'sedentary', labelEn: 'Sedentary', labelRu: 'Сидячий', multiplier: 1.2, descEn: 'Desk job, no training', descRu: 'Офис, без тренировок' },
  { key: 'light', labelEn: 'Light', labelRu: 'Лёгкий', multiplier: 1.375, descEn: '1-3 days/week', descRu: '1-3 дня/нед' },
  { key: 'moderate', labelEn: 'Moderate', labelRu: 'Умеренный', multiplier: 1.55, descEn: '3-5 days/week', descRu: '3-5 дней/нед' },
  { key: 'heavy', labelEn: 'Heavy', labelRu: 'Тяжёлый', multiplier: 1.725, descEn: '6-7 days hard training', descRu: '6-7 дней/нед' },
  { key: 'athlete', labelEn: 'Athlete', labelRu: 'Атлет', multiplier: 1.9, descEn: '2x/day, physical job', descRu: '2 раза/день, физ.работа' },
];

export default function Calculators() {
  const { t, i18n } = useTranslation();
  const { profile } = useAuth();
  const isRu = i18n.language === 'ru';
  const unit = profile?.unit === 'imperial' ? 'lbs' : 'kg';

  // 1RM State
  const [w1rm, setW1rm] = useState('');
  const [r1rm, setR1rm] = useState('');
  const [res1rm, setRes1rm] = useState<number | null>(null);

  // Calorie State
  const [age, setAge] = useState(profile?.age ? String(profile.age) : '');
  const [weight, setWeight] = useState(profile?.weight ? String(profile.weight) : '');
  const [height, setHeight] = useState(profile?.height ? String(profile.height) : '');
  const [gender, setGender] = useState<'male' | 'female'>(profile?.gender === 'female' ? 'female' : 'male');
  const [activity, setActivity] = useState('moderate');
  const [calRes, setCalRes] = useState<any>(null);

  const calc1RM = () => {
    let w = parseFloat(w1rm);
    const r = parseInt(r1rm, 10);
    if (!w || !r) return;
    if (unit === 'lbs') w = w * 0.453592;
    // Brzycki formula
    const result = Math.round(w * (36 / (37 - r)));
    setRes1rm(Math.round(result * (unit === 'lbs' ? 2.205 : 1)));
  };

  const calcCalories = () => {
    let w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (!w || !h || !a) return;
    if (unit === 'lbs') w = w * 0.453592;

    const bf = gender === 'male' ? 0.15 : 0.25;
    const lbm = w * (1 - bf);
    const bmrKatch = 370 + 21.6 * lbm;
    let bmrMifflin = 10 * w + 6.25 * h - 5 * a + (gender === 'male' ? 5 : -161);
    const bmr = Math.max(bmrKatch, bmrMifflin);
    const mult = ACTIVITY_LEVELS.find(l => l.key === activity)?.multiplier || 1.55;
    const tdee = Math.round(bmr * mult);

    setCalRes({
      maintenance: tdee,
      aggressiveCut: Math.round(tdee - 700),
      moderateCut: Math.round(tdee - 400),
      leanBulk: Math.round(tdee + 400),
      aggressiveBulk: Math.round(tdee + 800),
      protein: Math.round(w * 2.2),
      proteinCut: Math.round(w * 2.5),
    });
  };

  const l = (en: string, ru: string) => isRu ? ru : en;

  return (
    <div className="min-h-screen bg-background px-5 pt-8 pb-8">
      <h1 className="text-3xl font-extrabold text-primary mb-6">{l('Calculators', 'Калькуляторы')}</h1>

      {/* 1RM */}
      <div className="bg-surface rounded-3xl p-5 border border-border mb-6">
        <h2 className="text-primary font-bold text-lg mb-1">{l('One Rep Max (1RM)', 'Один повторный максимум (1ПМ)')}</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">{l('Weight', 'Вес')} ({unit})</label>
            <input type="number" value={w1rm} onChange={e => setW1rm(e.target.value)} placeholder="100" className="input-field" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">{l('Reps', 'Повторения')}</label>
            <input type="number" value={r1rm} onChange={e => setR1rm(e.target.value)} placeholder="5" className="input-field" />
          </div>
        </div>
        <button onClick={calc1RM} className="primary-btn w-full">{l('Calculate 1RM', 'Рассчитать 1ПМ')}</button>
        {res1rm !== null && (
          <div className="mt-4 bg-background rounded-xl p-4 border border-primary/50 text-center">
            <p className="text-gray-400 text-xs mb-1">{l('Estimated Max', 'Расчётный максимум')}</p>
            <p className="text-white text-4xl font-black">{res1rm} <span className="text-primary text-lg">{unit}</span></p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {[90, 85, 80, 75, 70, 65].map(pct => (
                <div key={pct} className="bg-white/5 px-3 py-1.5 rounded-lg">
                  <p className="text-gray-500 text-xs">{pct}%</p>
                  <p className="text-white font-bold text-sm">{Math.round(res1rm * pct / 100)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Calorie Calculator */}
      <div className="bg-surface rounded-3xl p-5 border border-border mb-6">
        <h2 className="text-primary font-bold text-lg mb-1">{l('Daily Calories', 'Дневные калории')}</h2>
        <p className="text-gray-500 text-xs mb-4">{l('Katch-McArdle + Mifflin-St Jeor (higher value used)', 'Katch-McArdle + Mifflin-St Jeor (берётся большее)')}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">{l('Age', 'Возраст')}</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="25" className="input-field" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">{l('Gender', 'Пол')}</label>
            <div className="flex gap-2">
              <button onClick={() => setGender('male')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${gender === 'male' ? 'bg-primary text-black' : 'bg-background border border-border text-white'}`}>{l('Male', 'Муж')}</button>
              <button onClick={() => setGender('female')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${gender === 'female' ? 'bg-primary text-black' : 'bg-background border border-border text-white'}`}>{l('Female', 'Жен')}</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">{l('Weight', 'Вес')} ({unit})</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="75" className="input-field" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">{l('Height (cm)', 'Рост (см)')}</label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="180" className="input-field" />
          </div>
        </div>

        <label className="text-gray-400 text-sm mb-2 block">{l('Training Intensity', 'Интенсивность тренировок')}</label>
        <div className="flex overflow-x-auto gap-2 pb-2 mb-4 hide-scrollbar">
          {ACTIVITY_LEVELS.map(lv => (
            <button key={lv.key} onClick={() => setActivity(lv.key)}
              className={`min-w-[110px] p-3 rounded-xl flex-shrink-0 text-left transition-all ${activity === lv.key ? 'bg-primary text-black' : 'bg-background border border-border'}`}>
              <p className={`font-bold text-xs mb-0.5 ${activity === lv.key ? '' : 'text-white'}`}>{l(lv.labelEn, lv.labelRu)}</p>
              <p className={`text-xs ${activity === lv.key ? 'text-black/60' : 'text-gray-500'}`}>{l(lv.descEn, lv.descRu)}</p>
            </button>
          ))}
        </div>

        <button onClick={calcCalories} className="primary-btn w-full">{l('Calculate Calories', 'Рассчитать калории')}</button>

        {calRes && (
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center p-4 bg-background rounded-xl border-l-4 border-blue-500">
              <span className="text-gray-400 text-sm">{l('Maintenance (TDEE)', 'Поддержание (TDEE)')}</span>
              <span className="text-white text-xl font-bold">{calRes.maintenance} kcal</span>
            </div>

            <p className="text-red-400 font-bold text-xs pt-2">{l('🔥 CUTTING', '🔥 СУШКА')}</p>
            <div className="flex justify-between items-center p-3 bg-background rounded-xl border-l-4 border-red-400">
              <div><span className="text-gray-400 text-sm">{l('Moderate (-400)', 'Умеренный (-400)')}</span><p className="text-gray-600 text-xs">{l('~0.5% BW/week', '~0.5% веса/нед')}</p></div>
              <span className="text-white font-bold">{calRes.moderateCut} kcal</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-xl border-l-4 border-red-600">
              <div><span className="text-gray-400 text-sm">{l('Aggressive (-700)', 'Агрессивный (-700)')}</span><p className="text-gray-600 text-xs">{l('~1% BW/week', '~1% веса/нед')}</p></div>
              <span className="text-white font-bold">{calRes.aggressiveCut} kcal</span>
            </div>

            <p className="text-green-400 font-bold text-xs pt-2">{l('💪 BULKING', '💪 МАССА')}</p>
            <div className="flex justify-between items-center p-3 bg-background rounded-xl border-l-4 border-green-400">
              <div><span className="text-gray-400 text-sm">{l('Lean Bulk (+400)', 'Чистый (+400)')}</span><p className="text-gray-600 text-xs">{l('~0.25 kg/week', '~0.25 кг/нед')}</p></div>
              <span className="text-white font-bold">{calRes.leanBulk} kcal</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-xl border-l-4 border-green-600">
              <div><span className="text-gray-400 text-sm">{l('Aggressive (+800)', 'Агрессивный (+800)')}</span><p className="text-gray-600 text-xs">{l('~0.5 kg/week', '~0.5 кг/нед')}</p></div>
              <span className="text-white font-bold">{calRes.aggressiveBulk} kcal</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-background rounded-xl border-l-4 border-primary mt-2">
              <div><span className="text-primary font-bold">{l('Protein Target', 'Белок')}</span><p className="text-gray-500 text-xs">2.2g/kg ({l('bulk', 'масса')}) — 2.5g/kg ({l('cut', 'сушка')})</p></div>
              <div className="text-right"><span className="text-white font-bold">{calRes.protein}g</span><p className="text-gray-400 text-xs">{l('Cut', 'Сушка')}: {calRes.proteinCut}g</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
