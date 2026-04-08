// GIF URL lookup for Kinex exercises
// Priority: Bourdon94m (descriptive names) > mohamedatef90 (hash names) > local files
//
// Bourdon94m: https://raw.githubusercontent.com/Bourdon94m/Workout-Animated-GIF/main/media/{filename}
// mohamedatef90: https://raw.githubusercontent.com/mohamedatef90/exercise-library/main/gifs/{hash}.gif

// Bourdon94m mapping: our gifName -> actual filename in repo
const BOURDON_MAP: Record<string, string> = {
  'arnold-press.webp': 'dumbbell_arnold_press.gif',
  'barbell-lunge.webp': 'barbell_lunge.gif',
  'barbell-shrug.webp': 'barbell_shrug.gif',
  'bench-press.webp': 'barbell_bench_press.gif',
  'cable-front-raise.webp': 'cable_front_raise.gif',
  'cable-lateral-raise.webp': 'cable_lateral_raise.gif',
  'deadlift.webp': 'barbell_deadlift.gif',
  'dumbbell-front-raise.webp': 'dumbbell_front_raise.gif',
  'dumbbell-lateral-raise.webp': 'dumbbell_lateral_raise.gif',
  'dumbbell-lunge.webp': 'dumbbell_lunge.gif',
  'dumbbell-pullover.webp': 'dumbbell_pullover.gif',
  'front-squat.webp': 'barbell_front_squat.gif',
  'hammer-curl.webp': 'dumbbell_hammer_curl.gif',
  'hanging-leg-raise.webp': 'hanging_leg_raise.gif',
  'incline-bench-press.webp': 'barbell_incline_bench_press.gif',
  'push-press.webp': 'dumbbell_push_press.gif',
  'romanian-deadlift.webp': 'barbell_romanian_deadlift.gif',
  'squat.webp': 'barbell_full_squat.gif',
};

// mohamedatef90 mapping: our gifName -> hash (only when bourdon94m doesn't have it)
const MOHA_MAP: Record<string, string> = {
  'barbell-biceps-curl.webp': 'Yza7XrQ.gif',
  'barbell-hack-squat-exercise.webp': 'Yza7XrQ.gif',
  'barbell-lying-tricep-extension.webp': 'Yza7XrQ.gif',
  'barbell-row.gif': 'Yza7XrQ.gif',
  'barbell-standing-calf-raise-2.webp': 'Yza7XrQ.gif',
  'barbell-standing-triceps-extension.webp': 'Yza7XrQ.gif',
  'belt-squat.webp': 'arsYEd3.gif',
  'bulgarian-split-squat-barbell.webp': 'arsYEd3.gif',
  'cable-chest-press.webp': 'KHPZL0b.gif',
  'cable-crunch.webp': 'KHPZL0b.gif',
  'cable-curl-with-bar.webp': 'KHPZL0b.gif',
  'cable-curl-with-rope.webp': 'KHPZL0b.gif',
  'cable-rear-delt-row.webp': 'KHPZL0b.gif',
  'cable-row-seated-narrow-grip.webp': 'KHPZL0b.gif',
  'cable-row-seated-single-arm.webp': 'KHPZL0b.gif',
  'calf-raise-standing.webp': '9JprnPh.gif',
  'close-grip-bench-press.webp': 'vrhHa6D.gif',
  'crossbody-cable-triceps-extension.webp': 'KHPZL0b.gif',
  'crunch.webp': 'tZkGYZ9.gif',
  'dips.webp': 'LkoAWAE.gif',
  'dumbbell-chest-fly.webp': 'BU15nH4.gif',
  'dumbbell-chest-press.webp': 'BU15nH4.gif',
  'dumbbell-incline-press.webp': 'BU15nH4.gif',
  'ez-curl.webp': '3omWx6P.gif',
  'hack-squat-machine.gif': '5VCj6iH.gif',
  'hip-thrust.webp': 'f7Y9eDZ.gif',
  'incline-bench-skullcrushers.webp': '3TZduzM.gif',
  'incline-dumbbell-curl.webp': '3TZduzM.gif',
  'lat-pulldown-with-neutral-grip-1.webp': '4IKbhHV.gif',
  'lateral-raise-machine.webp': '4IKbhHV.gif',
  'leg-curl-seated.webp': '3omWx6P.gif',
  'leg-extension-one-leg.webp': '7HcfMBP.gif',
  'leg-extension-seated.webp': '7HcfMBP.gif',
  'leg-press.webp': 'khlHMqs.gif',
  'lying-dumbbell-triceps-extension-1.webp': 'GxDwDX0.gif',
  'lying-leg-curl.webp': 'GxDwDX0.gif',
  'machine-chest-fly.webp': 'Pr9Rhf4.gif',
  'machine-chest-press.webp': 'WbNq5Xu.gif',
  'machine-lat-pulldown.webp': 'ecpY0rH.gif',
  'machine-overhead-tricep-extension.webp': 'o8aOcrz.gif',
  'machine-shoulder-press.webp': '67n3r98.gif',
  'one-arm-lat-pulldown.webp': '4IKbhHV.gif',
  'overhead-cable-triceps-extension-from-upper-position.webp': 'NAkmgdx.gif',
  'overhead-press-exercise.webp': 'NAkmgdx.gif',
  'overhead-tricep-extension-lower-position.webp': 'NAkmgdx.gif',
  'preacher-curl-barbell.webp': 'SYJ4Bkt.gif',
  'pull-ups.webp': '4IKbhHV.gif',
  'push-up.webp': 'A9qxk2F.gif',
  'reverse-dumbbell-flyes.webp': 'sTfvVsG.gif',
  'reverse-machine-fly.webp': 'sTfvVsG.gif',
  'seated-calf-raise-barbell.webp': 'RoV1Rfa.gif',
  'seated-dumbbell-shoulder-press.webp': 'RoV1Rfa.gif',
  'seated-machine-row.webp': 'RoV1Rfa.gif',
  'single-leg-leg-curl.webp': 'arsYEd3.gif',
  'smith-machine-lunge.webp': 'HsjbB1z.gif',
  'spider-curl-does-whatever-a-spider-curl-does-2.webp': 'VdLZ3nB.gif',
  't-bar-row-machine.webp': 'FVM1AUZ.gif',
  'triceps-pushdown-with-rope.webp': '7HcfMBP.gif',
  'triceps-pushdown-with-straight-handle.webp': '7HcfMBP.gif',
};

const BOURDON_BASE = 'https://raw.githubusercontent.com/Bourdon94m/Workout-Animated-GIF/main/media';
const MOHA_BASE = 'https://raw.githubusercontent.com/mohamedatef90/exercise-library/main/gifs';

export function getGifUrl(gifName?: string): string | null {
  if (!gifName) return null;

  // 1. Bourdon94m (descriptive, high quality)
  if (BOURDON_MAP[gifName]) {
    return `${BOURDON_BASE}/${BOURDON_MAP[gifName]}`;
  }

  // 2. mohamedatef90 (hash-based, fallback)
  if (MOHA_MAP[gifName]) {
    return `${MOHA_BASE}/${MOHA_MAP[gifName]}`;
  }

  // 3. Local Bourdon94m files (9 we already have downloaded)
  const LOCAL: Record<string, string> = {
    'barbell-lunge.webp': '/gifs/barbell_lunge.gif',
    'barbell-shrug.webp': '/gifs/barbell_shrug.gif',
    'cable-front-raise.webp': '/gifs/cable_front_raise.gif',
    'cable-lateral-raise.webp': '/gifs/cable_lateral_raise.gif',
    'dumbbell-front-raise.webp': '/gifs/dumbbell_front_raise.gif',
    'dumbbell-lateral-raise.webp': '/gifs/dumbbell_lateral_raise.gif',
    'dumbbell-lunge.webp': '/gifs/dumbbell_lunge.gif',
    'dumbbell-pullover.webp': '/gifs/dumbbell_pullover.gif',
    'hanging-leg-raise.webp': '/gifs/hanging_leg_raise.gif',
  };
  if (LOCAL[gifName]) {
    return LOCAL[gifName];
  }

  return null;
}
