import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UNITS = { metric: 'kg, cm', imperial: 'lbs, ft' };
const GOALS: Record<string, {label: string; calDelta: number}> = {
  aggressive_loss: { label: 'Aggressive weight loss', calDelta: -500 },
  mild_loss:       { label: 'Mild weight loss',       calDelta: -250 },
  maintain:        { label: 'Maintain weight',        calDelta: 0   },
  lean_gain:       { label: 'Lean muscle gain',        calDelta: 250 },
  active_gain:     { label: 'Active muscle gain',       calDelta: 500 },
};

function calcCalories(gender: string, weight: number, height: number, age: number, goal: string) {
  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  return Math.round(bmr * 1.55 + (GOALS[goal]?.calDelta || 0));
}

export default function Onboarding() {
  const { saveProfile } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [weight, setWeight] = useState('75');
  const [height, setHeight] = useState('180');
  const [age, setAge] = useState('25');
  const [goal, setGoal] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const total = 6;

  const canNext = () => {
    if (step === 0) return true; // unit always has default
    if (step === 1) return !!gender;
    if (step === 2) return Number(weight) > 0;
    if (step === 3) return Number(height) > 0;
    if (step === 4) return Number(age) > 0;
    if (step === 5) return !!goal;
    return false;
  };

  const next = async () => {
    if (!canNext()) return;
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      setSaving(true);
      try {
        const cal = calcCalories(gender!, Number(weight), Number(height), Number(age), goal!);
        await saveProfile({
          unit, gender: gender!, weight: Number(weight), height: Number(height),
          age: Number(age), goal: goal!, dailyCalories: cal, onboardingComplete: true,
        });
        navigate('/');
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 pt-8 pb-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0} className="p-2 disabled:opacity-0">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
          </svg>
        </button>
        <div className="flex-1 h-2 bg-border rounded-full overflow-hidden flex gap-1">
          {[...Array(total)].map((_, i) => (
            <div key={i} className={`flex-1 h-full rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-border'}`} />
          ))}
        </div>
        <span className="text-gray-500 text-sm ml-2">{step + 1}/{total}</span>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex flex-col items-center">
        {step === 0 && (
          <>
            <h1 className="text-3xl font-extrabold text-primary text-center mb-2">{t('onboarding_unit_title') || 'Measurement System'}</h1>
            <p className="text-gray-400 text-sm text-center mb-10">{t('onboarding_unit_sub') || 'What units do you prefer?'}</p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {(['metric', 'imperial'] as const).map(u => (
                <button key={u} onClick={() => setUnit(u)}
                  className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${unit === u ? 'border-primary bg-primary/5' : 'border-border bg-surface'}`}>
                  <svg className="w-8 h-8" fill="none" stroke={unit === u ? '#ADFF00' : '#6B7280'} strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
                  </svg>
                  <span className={`font-bold text-lg ${unit === u ? 'text-primary' : 'text-white'}`}>{u === 'metric' ? 'Metric' : 'Imperial'}</span>
                  <span className="text-gray-500 text-xs">{UNITS[u]}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="text-3xl font-extrabold text-primary text-center mb-2">{t('onboarding_gender_title') || 'Select your gender'}</h1>
            <p className="text-gray-400 text-sm text-center mb-10">{t('onboarding_gender_sub') || 'This helps calculate your calorie needs.'}</p>
            <div className="flex flex-col gap-4 w-full max-w-sm">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)}
                  className={`p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${gender === g ? 'border-primary bg-primary/5' : 'border-border bg-surface'}`}>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke={gender === g ? '#ADFF00' : '#6B7280'} strokeWidth="1.5" viewBox="0 0 24 24">
                      {g === 'male'
                        ? <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        : <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>}
                    </svg>
                  </div>
                  <span className={`font-bold text-xl ${gender === g ? 'text-primary' : 'text-white'}`}>
                    {g === 'male' ? (t('gender_male') || 'Male') : (t('gender_female') || 'Female')}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-3xl font-extrabold text-primary text-center mb-2">{t('onboarding_weight_title') || 'Your weight'}</h1>
            <p className="text-gray-400 text-sm text-center mb-10">{t('onboarding_weight_sub') || 'To track progress and calculate macros.'}</p>
            <div className="flex flex-col items-center gap-3 mt-4">
              <div className="flex items-end gap-3">
                <input type="number" value={weight} onChange={e => setWeight(e.target.value)} autoFocus
                  className="w-36 text-center text-5xl font-black bg-transparent border-b-2 border-primary text-primary pb-2 outline-none" />
                <span className="text-primary text-2xl font-bold mb-2">{unit === 'metric' ? 'kg' : 'lbs'}</span>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-3xl font-extrabold text-primary text-center mb-2">{t('onboarding_height_title') || 'Your height'}</h1>
            <p className="text-gray-400 text-sm text-center mb-10">{t('onboarding_height_sub') || 'Required to calculate BMR.'}</p>
            <div className="flex flex-col items-center gap-3 mt-4">
              <div className="flex items-end gap-3">
                <input type="number" value={height} onChange={e => setHeight(e.target.value)} autoFocus
                  className="w-36 text-center text-5xl font-black bg-transparent border-b-2 border-primary text-primary pb-2 outline-none" />
                <span className="text-primary text-2xl font-bold mb-2">{unit === 'metric' ? 'cm' : 'in'}</span>
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h1 className="text-3xl font-extrabold text-primary text-center mb-2">{t('onboarding_age_title') || 'How old are you?'}</h1>
            <p className="text-gray-400 text-sm text-center mb-10">{t('onboarding_age_sub') || 'Age affects metabolism.'}</p>
            <div className="flex flex-col items-center gap-3 mt-4">
              <div className="flex items-end gap-3">
                <input type="number" value={age} onChange={e => setAge(e.target.value)} autoFocus
                  className="w-36 text-center text-5xl font-black bg-transparent border-b-2 border-primary text-primary pb-2 outline-none" />
                <span className="text-primary text-2xl font-bold mb-2">years</span>
              </div>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h1 className="text-3xl font-extrabold text-primary text-center mb-2">{t('onboarding_goal_title') || 'Your Goal'}</h1>
            <p className="text-gray-400 text-sm text-center mb-8">{t('onboarding_goal_sub') || 'Choose your weekly weight change.'}</p>
            <div className="w-full max-w-sm space-y-3">
              {Object.entries(GOALS).map(([key, g]) => (
                <button key={key} onClick={() => setGoal(key)}
                  className={`w-full p-4 rounded-2xl border-2 text-left flex justify-between items-center transition-all ${goal === key ? 'border-primary bg-primary/5' : 'border-border bg-surface'}`}>
                  <div>
                    <span className={`font-bold block ${goal === key ? 'text-primary' : 'text-white'}`}>{g.label}</span>
                    <span className="text-gray-500 text-xs mt-0.5">
                      {g.calDelta === 0 ? 'Balance' : (g.calDelta > 0 ? '+' : '') + g.calDelta + ' kcal/day'}
                    </span>
                  </div>
                  {goal === key && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <button onClick={next} disabled={!canNext() || saving}
        className="w-full bg-primary text-black font-extrabold py-4 rounded-2xl active:scale-95 transition-transform neon-glow disabled:opacity-40 mt-6">
        {saving ? '...' : step === total - 1 ? (t('get_started') || 'Calculate Plan') : (t('next') || 'Next')}
      </button>
    </div>
  );
}
