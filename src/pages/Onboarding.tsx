import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const steps = [
  { key: 'unit', title: 'Measurement System', subtitle: 'What units do you prefer?', type: 'choice', options: [{ value: 'metric', label: 'Metric', sub: 'kg, cm', icon: '⚖️' }, { value: 'imperial', label: 'Imperial', sub: 'lbs, ft', icon: '📏' }] },
  { key: 'gender', title: 'Select your gender', subtitle: 'This helps us more accurately calculate your calorie needs.', type: 'choice', options: [{ value: 'male', label: 'Male', icon: '♂' }, { value: 'female', label: 'Female', icon: '♀' }] },
  { key: 'weight', title: 'Your current weight', subtitle: 'To track progress and calculate macronutrients.', type: 'number', suffix: 'kg', placeholder: '75' },
  { key: 'height', title: 'Your height', subtitle: 'Required to calculate your Basal Metabolic Rate (BMR).', type: 'number', suffix: 'cm', placeholder: '180' },
  { key: 'age', title: 'How old are you?', subtitle: 'Age affects metabolism and energy expenditure.', type: 'number', suffix: 'years', placeholder: '25' },
  { key: 'goal', title: 'Your Goal', subtitle: 'Choose your desired weekly weight change.', type: 'goal', options: [
    { value: 'aggressive_loss', label: 'Aggressive weight loss', sub: '~0.5 kg / wk' },
    { value: 'mild_loss', label: 'Mild weight loss', sub: '~0.25 kg / wk' },
    { value: 'maintain', label: 'Maintain weight', sub: 'Body recomposition' },
    { value: 'lean_gain', label: 'Lean muscle gain', sub: '~0.25 kg / wk' },
    { value: 'active_gain', label: 'Active muscle gain', sub: '~0.5 kg / wk' },
  ]},
];

function calcCalories(gender: string, weight: number, height: number, age: number, goal: string) {
  // Mifflin-St Jeor
  let bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = bmr * 1.55; // moderate activity
  const goalMap: Record<string, number> = {
    aggressive_loss: -500, mild_loss: -250, maintain: 0, lean_gain: 250, active_gain: 500,
  };
  return Math.round(tdee + (goalMap[goal] || 0));
}

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, any>>({ unit: 'metric', gender: 'male', weight: 75, height: 180, age: 25, goal: 'maintain' });
  const { saveProfile } = useAuth();
  const navigate = useNavigate();
  const s = steps[step];

  const setValue = (val: any) => setData(p => ({ ...p, [s.key]: val }));

  const next = async () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      const cal = calcCalories(data.gender, Number(data.weight), Number(data.height), Number(data.age), data.goal);
      await saveProfile({ ...data, dailyCalories: cal, onboardingComplete: true });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 pt-8 pb-6">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-2">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="text-white text-2xl mr-2">←</button>
        )}
        <div className="flex-1 flex gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-border'}`} />
          ))}
        </div>
        <span className="text-gray-500 text-sm ml-2">{step + 1}/{steps.length}</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center pt-8">
        <h1 className="text-3xl font-extrabold text-primary text-center mb-2">{s.title}</h1>
        <p className="text-gray-400 text-sm text-center mb-10 max-w-xs">{s.subtitle}</p>

        {s.type === 'choice' && (
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {s.options!.map(o => (
              <button key={o.value} onClick={() => setValue(o.value)}
                className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  data[s.key] === o.value ? 'border-primary bg-primary/5' : 'border-border bg-surface'
                }`}>
                <span className="text-3xl">{o.icon}</span>
                <span className={`font-bold ${data[s.key] === o.value ? 'text-primary' : 'text-white'}`}>{o.label}</span>
                {o.sub && <span className="text-gray-500 text-xs">{o.sub}</span>}
              </button>
            ))}
          </div>
        )}

        {s.type === 'number' && (
          <div className="flex items-center gap-4 mt-4">
            <input
              type="number" value={data[s.key]} onChange={e => setValue(e.target.value)}
              className="w-32 text-center text-3xl font-bold bg-transparent border-2 border-primary rounded-xl py-3 text-primary"
              placeholder={s.placeholder}
            />
            <span className="text-primary text-xl font-bold">{s.suffix}</span>
          </div>
        )}

        {s.type === 'goal' && (
          <div className="w-full max-w-sm space-y-3">
            {s.options!.map(o => (
              <button key={o.value} onClick={() => setValue(o.value)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  data[s.key] === o.value ? 'border-primary bg-primary/5' : 'border-border bg-surface'
                }`}>
                <span className="font-bold text-white block">{o.label}</span>
                <span className="text-gray-500 text-sm">{o.sub}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Button */}
      <button onClick={next}
        className="w-full bg-primary text-black font-extrabold py-4 rounded-2xl active:scale-95 transition-transform neon-glow mt-6">
        {step === steps.length - 1 ? 'Calculate Plan' : 'Next'}
      </button>
    </div>
  );
}
