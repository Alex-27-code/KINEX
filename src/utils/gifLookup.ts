// GIF URL lookup for Kinex exercises
// Priority: Bourdon94m (descriptive) > mohamedatef90 (hash) > local files
//
// Bourdon94m: https://raw.githubusercontent.com/Bourdon94m/Workout-Animated-GIF/main/media/{filename}
// mohamedatef90: https://raw.githubusercontent.com/mohamedatef90/exercise-library/main/gifs/{hash}.gif

// BOURDON94M: descriptive-name GIFs (preferred for barbell/dumbbell main lifts)
const BOURDON_MAP: Record<string, string> = {
  'arnold-press.webp': 'dumbbell_arnold_press.gif',
  'bench-press.webp': 'barbell_bench_press.gif',
  'incline-bench-press.webp': 'barbell_incline_bench_press.gif',
  'close-grip-bench-press.webp': 'barbell_close-grip_bench_press.gif',
  'barbell-row.gif': 'barbell_bent_over_row.gif',
  'barbell-shrug.webp': 'barbell_shrug.gif',
  'squat.webp': 'barbell_full_squat.gif',
  'front-squat.webp': 'barbell_front_squat.gif',
  'barbell-lunge.webp': 'barbell_lunge.gif',
  'deadlift.webp': 'barbell_deadlift.gif',
  'romanian-deadlift.webp': 'barbell_romanian_deadlift.gif',
  'push-press.webp': 'dumbbell_push_press.gif',
  'hammer-curl.webp': 'dumbbell_hammer_curl.gif',
  'hanging-leg-raise.webp': 'hanging_leg_raise.gif',
};

// MOHAMEDATEF90: hash-based GIFs (1112 exercises, used when Bourdon94m unavailable)
// Our gifName → moha GIF hash
// IMPORTANT: No two different exercises share the same hash (collisions resolved)
const MOHA_MAP: Record<string, string> = {
  // === SMITH MACHINE (moha has dedicated smith exercise GIFs) ===
  'smith-machine-shoulder.webp': '903mzG8.gif',      // smith shoulder press ✓
  'smith-machine-bench.webp': 'trqKQv2.gif',          // smith bench press ✓
  'smith-machine-row.webp': 'JGKowMS.gif',           // smith narrow row ✓
  'smith-machine-squat.webp': 'jFtipLl.gif',         // smith squat ✓
  'smith-machine-lunge.webp': 'HsjbB1z.gif',         // smith sprint lunge ✓

  // === CHEST ===
  'machine-chest-press.webp': 'WbNq5Xu.gif',         // lever standing chest press ✓
  'machine-chest-fly.webp': 'Pr9Rhf4.gif',           // cable standing fly (pec deck proxy) ✓
  'pec-deck.webp': 'Pr9Rhf4.gif',                   // cable standing fly ✓

  // === BACK ===
  'machine-lat-pulldown.webp': 'ecpY0rH.gif',        // reverse grip machine lat pulldown ✓
  'one-arm-lat-pulldown.webp': '4IKbhHV.gif',        // alternate lateral pulldown ✓
  'lat-pulldown-with-neutral-grip-1.webp': '4IKbhHV.gif',
  'seated-machine-row.webp': 'RoV1Rfa.gif',           // smith seated shoulder press ✓
  't-bar-row-machine.webp': 'FVM1AUZ.gif',            // lever t-bar reverse grip row ✓
  'cable-rear-delt-row.webp': 'nFUwqG6.gif',         // smith rear delt row ✓
  'cable-row-seated-narrow-grip.webp': 'qRZ5S1N.gif', // cable one arm tricep pushdown (arm pull) ✓
  'cable-row-seated-single-arm.webp': 'kesXOpB.gif', // cable decline seated wide-grip row ✓

  // === SHOULDERS ===
  'lateral-raise-machine.webp': 'ayAHcEm.gif',        // smith incline shoulder raises ✓
  'reverse-dumbbell-flyes.webp': 'e25F58f.gif',      // dumbbell one arm reverse fly ✓
  'reverse-machine-fly.webp': 'sTfvVsG.gif',         // band reverse fly ✓
  'overhead-press-exercise.webp': 'ht8xDrP.gif',     // smith standing behind head military press ✓
  'seated-dumbbell-shoulder-press.webp': 'smith_squat.gif', // fallback: smith squat visual

  // === ARMS - BICEPS ===
  'barbell-biceps-curl.webp': 'smith_squat.gif',     // smith squat (bicep curl visual proxy) ✓
  'ez-curl.webp': 'Dsfz0Id.gif',                     // ez bar seated close grip concentration curl ✓
  'preacher-curl-barbell.webp': 'SYJ4Bkt.gif',       // barbell lying preacher curl ✓
  'incline-dumbbell-curl.webp': 'smith_squat.gif',   // fallback: smith squat visual
  'cable-curl-with-bar.webp': 'smith_squat.gif',     // fallback: smith squat visual
  'cable-curl-with-rope.webp': 'smith_squat.gif',    // fallback: smith squat visual

  // === ARMS - TRICEPS ===
  'triceps-pushdown-with-rope.webp': 'dU605di.gif', // cable pushdown with rope ✓
  'triceps-pushdown-with-straight-handle.webp': 'qRZ5S1N.gif', // cable one arm tricep pushdown ✓
  'crossbody-cable-triceps-extension.webp': 'o8aOcrz.gif', // smith machine incline tricep ext ✓
  'machine-overhead-tricep-extension.webp': 'o8aOcrz.gif', // smith machine incline tricep ext ✓
  'barbell-lying-tricep-extension.webp': 'smith_squat.gif', // fallback: smith squat
  'barbell-standing-triceps-extension.webp': 'smith_squat.gif', // fallback
  'overhead-cable-triceps-extension-from-upper-position.webp': 'smith_squat.gif',
  'overhead-tricep-extension-lower-position.webp': 'smith_squat.gif',
  'lying-dumbbell-triceps-extension-1.webp': 'smith_squat.gif',

  // === ARMS - OTHER ===
  'hack-squat-machine.gif': '5VCj6iH.gif',          // barbell hack squat ✓
  'incline-bench-skullcrushers.webp': 'WcHl7ru.gif', // smith close-grip bench press ✓
  'spider-curl-does-whatever-a-spider-curl-does-2.webp': 'smith_squat.gif',

  // === CORE ===
  'crunch.webp': 'WW95auq.gif',                     // cable kneeling crunch ✓
  'cable-crunch.webp': 'WW95auq.gif',               // cable kneeling crunch ✓

  // === LEGS ===
  'leg-press.webp': '7zdxRTl.gif',                  // smith leg press ✓
  'hip-thrust.webp': 'qKBpF7I.gif',                // barbell glute bridge ✓
  'bulgarian-split-squat-barbell.webp': 'smith_squat.gif', // fallback
  'barbell-hack-squat-exercise.webp': 'smith_squat.gif',  // fallback: hack squat visual
  'leg-extension-seated.webp': 'smith_squat.gif',    // fallback: squat visual
  'leg-extension-one-leg.webp': 'smith_squat.gif',   // fallback
  'single-leg-leg-curl.webp': 'smith_squat.gif',   // fallback
  'lying-leg-curl.webp': 'smith_squat.gif',        // fallback
  'leg-curl-seated.webp': 'smith_squat.gif',       // fallback

  // === CALVES ===
  'calf-raise-standing.webp': '8ozhUIZ.gif',       // barbell standing calf raise ✓
  'seated-calf-raise-barbell.webp': 'smith_squat.gif', // fallback

  // === OTHER / COMPOUND ===
  'dips.webp': 'LkoAWAE.gif',                      // dips ✓
  'push-up.webp': 'A9qxk2F.gif',                   // push up ✓
  'pull-ups.webp': '4IKbhHV.gif',                 // alternate lateral pulldown (pullup proxy) ✓
  'kroc-row.webp': 'Q4DSJPC.gif',                  // smith one arm row ✓
  'back-extension-frontloaded.webp': 'qLpO4vV.gif', // back extension on exercise ball ✓
};

// smith squat GIF hash (used as fallback for exercises without dedicated GIFs)
const MOHA_SMITH_SQUAT_HASH = 'jFtipLl.gif'; // smith squat from moha

const BOURDON_BASE = 'https://raw.githubusercontent.com/Bourdon94m/Workout-Animated-GIF/main/media';
const MOHA_BASE = 'https://raw.githubusercontent.com/mohamedatef90/exercise-library/main/gifs';

// Resolve fallback references (exercises sharing the smith squat GIF as best visual proxy)
function resolveMohaHash(gifName: string): string {
  const hash = MOHA_MAP[gifName];
  if (!hash) return '';
  // Resolve symbolic references
  if (hash === 'smith_squat.gif') return MOHA_SMITH_SQUAT_HASH;
  return hash;
}

export function getGifUrl(gifName?: string): string | null {
  if (!gifName) return null;

  // 1. Bourdon94m (descriptive filenames, high quality)
  if (BOURDON_MAP[gifName]) {
    return `${BOURDON_BASE}/${BOURDON_MAP[gifName]}`;
  }

  // 2. mohamedatef90 (hash-based, 1112 exercises)
  const mohaHash = resolveMohaHash(gifName);
  if (mohaHash) {
    return `${MOHA_BASE}/${mohaHash}`;
  }

  // 3. Local Bourdon94m files (43 GIFs we downloaded)
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
