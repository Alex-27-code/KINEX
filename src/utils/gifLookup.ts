// GIF URL lookup for Kinex exercises
// Sources: Bourdon94m (local) + mohamedatef90 (hash-based, raw GitHub URLs)
// gifName from exercises.ts → MOHA_MAP[key] → mohamedatef90 hash → raw GitHub URL

// === BOURDON94M local files (43 GIFs, preferred where available) ===
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

// === BOURDON94M GitHub (preferred for barbell main lifts) ===
const BOURDON_GITHUB: Record<string, string> = {
  'bench-press.webp': 'barbell_bench_press.gif',
  'incline-bench-press.webp': 'barbell_incline_bench_press.gif',
  'close-grip-bench-press.webp': 'barbell_close-grip_bench_press.gif',
  'barbell-row.gif': 'barbell_bent_over_row.gif',
  'squat.webp': 'barbell_full_squat.gif',
  'front-squat.webp': 'barbell_front_squat.gif',
  'deadlift.webp': 'barbell_deadlift.gif',
  'romanian-deadlift.webp': 'barbell_romanian_deadlift.gif',
  'push-press.webp': 'dumbbell_push_press.gif',
  'hanging-leg-raise.webp': 'hanging_leg_raise.gif',
};
const BOURDON_BASE = 'https://raw.githubusercontent.com/Bourdon94m/Workout-Animated-GIF/main/media';

// === mohamedatef90 mappings (gifName → hash) ===
// Verified against mohamedatef90/exercise-library GitHub (2026-04-09)
// Only include exercises that EXACTLY match mohamedatef90 names
const MOHA_MAP: Record<string, string> = {

  // SMITH MACHINE (all verified 2026-04-09)
  'smith-machine-shoulder.webp': '903mzG8.gif',     // smith shoulder press
  'smith-machine-bench.webp': 'trqKQv2.gif',       // smith bench press
  'smith-machine-row.webp': 'JGKowMS.gif',         // smith narrow row
  'smith-machine-squat.webp': 'jFtipLl.gif',        // smith squat
  'smith-machine-lunge.webp': 'HsjbB1z.gif',       // smith sprint lunge

  // CHEST
  'machine-chest-press.webp': 'WbNq5Xu.gif',       // lever standing chest press
  'pec-deck.webp': 'Pr9Rhf4.gif',                  // cable standing fly (pec deck proxy)
  'machine-chest-fly.webp': 'Pr9Rhf4.gif',          // cable standing fly

  // BACK
  'machine-lat-pulldown.webp': 'LEprlgG.gif',      // cable lat pulldown full range of motion
  'lat-pulldown-with-neutral-grip-1.webp': 'rkg41Fb.gif', // twin handle parallel grip lat pulldown
  'one-arm-lat-pulldown.webp': 'LEprlgG.gif',       // cable lat pulldown (single arm proxy)
  'seated-machine-row.webp': 'c8oybX6.gif',        // cable rope elevated seated row
  't-bar-row-machine.webp': 'aaXr7ld.gif',        // lever t-bar row
  'cable-rear-delt-row.webp': 'yUdIGNs.gif',      // cable rear delt row (stirrups)
  'cable-row-seated-narrow-grip.webp': 'hvV79Si.gif', // cable low seated row
  'cable-row-seated-single-arm.webp': 'UFGF6gk.gif', // cable rope crossover seated row
  'kroc-row.webp': 'Q4DSJPC.gif',                 // smith one arm row

  // SHOULDERS
  'overhead-press-exercise.webp': 'jjUPrze.gif',   // smith standing military press
  'seated-dumbbell-shoulder-press.webp': 'xUwnBMT.gif', // smith seated shoulder press
  'lateral-raise-machine.webp': 'ayAHcEm.gif',    // smith incline shoulder raises
  'reverse-dumbbell-flyes.webp': 'EAs3xL9.gif',   // dumbbell reverse fly
  'reverse-machine-fly.webp': 'P5p0j8B.gif',      // cable standing cross-over high reverse fly
  'cable-front-raise.webp': 'u2X71Np.gif',        // cable front raise ✓ (also in LOCAL)
  'dumbbell-front-raise.webp': '3eGE2JC.gif',     // dumbbell front raise ✓ (also in LOCAL)

  // ARMS - BICEPS
  'arnold-press.webp': 'Xy4jlWA.gif',             // dumbbell arnold press
  'barbell-biceps-curl.webp': 'aee2Fcj.gif',      // barbell biceps curl (with arm blaster)
  'ez-curl.webp': 'Dsfz0Id.gif',                 // ez bar seated close grip concentration curl
  'preacher-curl-barbell.webp': 'qOgPVf6.gif',   // barbell preacher curl
  'incline-dumbbell-curl.webp': 'ae9UoXQ.gif',  // dumbbell incline curl
  'spider-curl-does-whatever-a-spider-curl-does-2.webp': 'VdLZ3nB.gif', // dumbbell one arm reverse spider curl
  'cable-curl-with-bar.webp': 'G08RZcQ.gif',     // cable curl
  'cable-curl-with-rope.webp': 'HPlPoQA.gif',     // cable hammer curl (rope)
  'hammer-curl.webp': 'HPlPoQA.gif',              // cable hammer curl (rope)

  // ARMS - TRICEPS
  'triceps-pushdown-with-rope.webp': 'gAwDzB3.gif', // cable triceps pushdown (v-bar)
  'triceps-pushdown-with-straight-handle.webp': 'OxJk1fg.gif', // cable triceps pushdown (v-bar) (with arm blaster)
  'barbell-lying-tricep-extension.webp': 'iZop9xO.gif', // barbell lying triceps extension
  'barbell-standing-triceps-extension.webp': 'dZl9Q27.gif', // barbell standing overhead triceps extension
  'lying-dumbbell-triceps-extension-1.webp': 'mpKZGWz.gif', // dumbbell lying triceps extension
  'crossbody-cable-triceps-extension.webp': 'ThKP69G.gif', // cable reverse grip triceps pushdown (sz-bar)
  'machine-overhead-tricep-extension.webp': 'o8aOcrz.gif', // smith machine incline tricep extension
  'overhead-cable-triceps-extension-from-upper-position.webp': '2IxROQ1.gif', // cable overhead triceps extension (rope)
  'overhead-tricep-extension-lower-position.webp': '2IxROQ1.gif', // cable overhead triceps extension (rope)
  'incline-bench-skullcrushers.webp': 'h8LFzo9.gif', // barbell lying triceps extension skull crusher
  'dips.webp': 'LkoAWAE.gif',                     // elbow dips
  'push-up.webp': 'A9qxk2F.gif',                 // archer push up

  // BACK / LATS
  'barbell-row.gif': 'ZX9UZmj.gif',              // smith bent over row (barbell row proxy)
  'barbell-shrug.webp': 'dG7tG5y.gif',            // barbell shrug ✓ (also in LOCAL)

  // CHEST
  'bench-press.webp': 'EIeI8Vf.gif',             // barbell bench press
  'incline-bench-press.webp': '3TZduzM.gif',      // barbell incline bench press
  'close-grip-bench-press.webp': 'J6Dx1Mu.gif',  // barbell close-grip bench press
  'dumbbell-chest-press.webp': 'SpYC0Kp.gif',    // dumbbell bench press
  'dumbbell-chest-fly.webp': 'xXm4nYq.gif',      // dumbbell decline fly
  'cable-chest-press.webp': '7xI5MXA.gif',       // cable bench press
  'barbell-lunge.webp': 't8iSghb.gif',           // barbell lunge ✓ (also in LOCAL)

  // LEGS
  'squat.webp': 'NNoHCEA.gif',                   // smith full squat (back squat proxy)
  'front-squat.webp': 'zG0zs85.gif',             // barbell front squat
  'deadlift.webp': 'ila4NZS.gif',                // barbell deadlift
  'romanian-deadlift.webp': 'wQ2c4XD.gif',       // barbell romanian deadlift
  'leg-press.webp': '7zdxRTl.gif',               // smith leg press
  'hip-thrust.webp': 'wSScovH.gif',              // band bent-over hip extension (glute bridge proxy)
  'bulgarian-split-squat-barbell.webp': 'arsYEd3.gif', // band one arm single leg split squat
  'barbell-hack-squat-exercise.webp': '5VCj6iH.gif', // barbell hack squat
  'hack-squat-machine.gif': 'ZuPXtCK.gif',       // smith hack squat
  'leg-extension-seated.webp': 'Y1MsI1l.gif',    // resistance band leg extension
  'leg-extension-one-leg.webp': 'Y1MsI1l.gif',    // resistance band leg extension (single leg proxy)
  'lying-leg-curl.webp': 'GwYwElT.gif',          // self assisted inverse leg curl (on floor)
  'leg-curl-seated.webp': 'C5jncD2.gif',         // standing single leg curl
  'single-leg-leg-curl.webp': 'C5jncD2.gif',    // standing single leg curl
  'calf-raise-standing.webp': '8ozhUIZ.gif',    // smith standing leg calf raise (calf raise proxy)
  'seated-calf-raise-barbell.webp': 'ktsFQAZ.gif', // barbell seated calf raise
  'dumbbell-lunge.webp': 'RRWFUcw.gif',         // dumbbell lunge ✓ (also in LOCAL)
  'pull-ups.webp': '0V2YQjW.gif',               // pull up (neutral grip)
  'back-extension-frontloaded.webp': 'qLpO4vV.gif', // back extension on exercise ball

  // CORE
  'crunch.webp': 'WW95auq.gif',                 // cable kneeling crunch
  'cable-crunch.webp': 'WW95auq.gif',           // cable kneeling crunch

  // SMITH MACHINE UPPER (additional)
  'smith-machine-shoulder.webp': '903mzG8.gif', // already listed above
  'smith-machine-bench.webp': 'trqKQv2.gif',     // already listed above

  // MISSING (found via mohamedatef90 exercises.json)
  'dumbbell-incline-press.webp': 'bfiHMpI.gif',    // dumbbell incline press on exercise ball
  'machine-shoulder-press.webp': '67n3r98.gif',     // lever shoulder press
  'belt-squat.webp': '5VCj6iH.gif',                // barbell hack squat (belt squat proxy)
  'barbell-standing-calf-raise-2.webp': '8ozhUIZ.gif', // barbell standing calf raise
};

const MOHA_BASE = 'https://raw.githubusercontent.com/mohamedatef90/exercise-library/main/gifs';

export function getGifUrl(gifName?: string): string | null {
  if (!gifName) return null;

  // 1. Local Bourdon94m files
  if (LOCAL[gifName]) {
    return LOCAL[gifName];
  }

  // 2. Bourdon94m GitHub
  if (BOURDON_GITHUB[gifName]) {
    return `${BOURDON_BASE}/${BOURDON_GITHUB[gifName]}`;
  }

  // 3. mohamedatef90
  const mohaHash = MOHA_MAP[gifName];
  if (mohaHash) {
    return `${MOHA_BASE}/${mohaHash}`;
  }

  return null;
}
