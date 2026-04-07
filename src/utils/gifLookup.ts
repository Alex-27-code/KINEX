// GIF URL resolver for Bourdon94m/Workout-Animated-GIF repository
const GIF_BASE = 'https://raw.githubusercontent.com/Bourdon94m/Workout-Animated-GIF/main/media';

const NAME_MAP: Record<string, string> = {
  // Exercises from exercises.ts → actual repo filenames
  'arnold-press': 'dumbbell_arnold_press.gif',
  'arnold-press-webp': 'dumbbell_arnold_press.gif',
  'arnold-press-v2': 'dumbbell_arnold_press_v._2.gif',
  'arnold-press-v-2': 'dumbbell_arnold_press_v._2.gif',
  'back-extension-frontloaded': 'back_extension_frontloaded.gif',
  'back-extension-frontloaded-webp': 'back_extension_frontloaded.gif',
  'barbell-biceps-curl': 'barbell_biceps_curl.gif',
  'barbell-biceps-curl-webp': 'barbell_biceps_curl.gif',
  'barbell-hack-squat-exercise': 'barbell_hack_squat.gif',
  'barbell-hack-squat-exercise-webp': 'barbell_hack_squat.gif',
  'barbell-hack-squat': 'barbell_hack_squat.gif',
  'barbell-lunge': 'barbell_lunge.gif',
  'barbell-lunge-webp': 'barbell_lunge.gif',
  'barbell-lying-tricep-extension': 'barbell_lying_tricep_extension.gif',
  'barbell-lying-tricep-extension-webp': 'barbell_lying_tricep_extension.gif',
  'barbell-row': 'barbell_bent_over_row.gif',
  'barbell-row-webp': 'barbell_bent_over_row.gif',
  'barbell-row.gif': 'barbell_bent_over_row.gif',
  'barbell-shrug': 'barbell_shrug.gif',
  'barbell-shrug-webp': 'barbell_shrug.gif',
  'barbell-standing-calf-raise-2': 'barbell_standing_calf_raise.gif',
  'barbell-standing-calf-raise-2-webp': 'barbell_standing_calf_raise.gif',
  'barbell-standing-calf-raise': 'barbell_standing_calf_raise.gif',
  'bench-press': 'barbell_bench_press.gif',
  'bench-press-webp': 'barbell_bench_press.gif',
  'bench-press.gif': 'barbell_bench_press.gif',
  'bent-over-row': 'dumbbell_bent_over_row.gif',
  'bent-over-row-webp': 'dumbbell_bent_over_row.gif',
  'bicep-curl': 'dumbbell_biceps_curl.gif',
  'bicep-curl-webp': 'dumbbell_biceps_curl.gif',
  'cable-crunch': 'cable_crunch.gif',
  'cable-crunch-webp': 'cable_crunch.gif',
  'cable-fly': 'cable_fly.gif',
  'cable-fly-webp': 'cable_fly.gif',
  'calf-raise': 'standing_calf_raise.gif',
  'calf-raise-webp': 'standing_calf_raise.gif',
  'crunch': 'crunch.gif',
  'crunch-webp': 'crunch.gif',
  'deadlift': 'barbell_deadlift.gif',
  'deadlift-webp': 'barbell_deadlift.gif',
  'decline-bench-press': 'barbell_decline_bench_press.gif',
  'decline-bench-press-webp': 'barbell_decline_bench_press.gif',
  'dumbbell-fly': 'dumbbell_fly.gif',
  'dumbbell-fly-webp': 'dumbbell_fly.gif',
  'dumbbell-curl': 'dumbbell_biceps_curl.gif',
  'dumbbell-curl-webp': 'dumbbell_biceps_curl.gif',
  'dumbbell-row': 'dumbbell_bent_over_row.gif',
  'dumbbell-row-webp': 'dumbbell_bent_over_row.gif',
  'dumbbell-shoulder-press': 'dumbbell_shoulder_press.gif',
  'dumbbell-shoulder-press-webp': 'dumbbell_shoulder_press.gif',
  'face-pull': 'face_pull.gif',
  'face-pull-webp': 'face_pull.gif',
  'front-squat': 'barbell_front_squat.gif',
  'front-squat-webp': 'barbell_front_squat.gif',
  'good-morning': 'barbell_good_morning.gif',
  'good-morning-webp': 'barbell_good_morning.gif',
  'hack-squat': 'hack_squat.gif',
  'hack-squat-webp': 'hack_squat.gif',
  'hammer-curl': 'dumbbell_hammer_curl.gif',
  'hammer-curl-webp': 'dumbbell_hammer_curl.gif',
  'hip-thrust': 'barbell_hip_thrust.gif',
  'hip-thrust-webp': 'barbell_hip_thrust.gif',
  'incline-bench-press': 'barbell_incline_bench_press.gif',
  'incline-bench-press-webp': 'barbell_incline_bench_press.gif',
  'incline-dumbbell-press': 'dumbbell_incline_bench_press.gif',
  'incline-dumbbell-press-webp': 'dumbbell_incline_bench_press.gif',
  'lateral-raise': 'lateral_raise.gif',
  'lateral-raise-webp': 'lateral_raise.gif',
  'lat-pulldown': 'cable_lat_pulldown.gif',
  'lat-pulldown-webp': 'cable_lat_pulldown.gif',
  'lat-pulldown-wide': 'cable_wide_grip_lat_pulldown.gif',
  'lat-pulldown-wide-webp': 'cable_wide_grip_lat_pulldown.gif',
  'leg-press': 'leg_press.gif',
  'leg-press-webp': 'leg_press.gif',
  'leg-curl': 'lying_leg_curl.gif',
  'leg-curl-webp': 'lying_leg_curl.gif',
  'leg-extension': 'leg_extension.gif',
  'leg-extension-webp': 'leg_extension.gif',
  'overhead-press': 'barbell_overhead_press.gif',
  'overhead-press-webp': 'barbell_overhead_press.gif',
  'overhead-tricep-extension': 'overhead_tricep_extension.gif',
  'overhead-tricep-extension-webp': 'overhead_tricep_extension.gif',
  'plank': 'front_plank.gif',
  'plank-webp': 'front_plank.gif',
  'preacher-curl': 'preacher_curl.gif',
  'preacher-curl-webp': 'preacher_curl.gif',
  'pull-up': 'pull_up.gif',
  'pull-up-webp': 'pull_up.gif',
  'push-up': 'push_up.gif',
  'push-up-webp': 'push_up.gif',
  'romanian-deadlift': 'romanian_deadlift.gif',
  'romanian-deadlift-webp': 'romanian_deadlift.gif',
  'russian-twist': 'russian_twist.gif',
  'russian-twist-webp': 'russian_twist.gif',
  'seated-calf-raise': 'seated_calf_raise.gif',
  'seated-calf-raise-webp': 'seated_calf_raise.gif',
  'shoulder-press': 'dumbbell_shoulder_press.gif',
  'shoulder-press-webp': 'dumbbell_shoulder_press.gif',
  'shrug': 'barbell_shrug.gif',
  'shrug-webp': 'barbell_shrug.gif',
  'side-plank': 'side_plank.gif',
  'side-plank-webp': 'side_plank.gif',
  'squat': 'barbell_squat.gif',
  'squat-webp': 'barbell_squat.gif',
  't-bar-row': 't_bar_row.gif',
  't-bar-row-webp': 't_bar_row.gif',
  'tricep-dip': 'tricep_dip.gif',
  'tricep-dip-webp': 'tricep_dip.gif',
  'tricep-pushdown': 'cable_tricep_pushdown.gif',
  'tricep-pushdown-webp': 'cable_tricep_pushdown.gif',
  'upright-row': 'upright_row.gif',
  'upright-row-webp': 'upright_row.gif',
  'wrist-curl': 'wrist_curl.gif',
  'wrist-curl-webp': 'wrist_curl.gif',
};

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/\.(webp|gif|png|jpg|jpeg)$/i, '')
    .replace(/[_\s-]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .trim();
}

export function getGifUrl(gifName: string | undefined): string | null {
  if (!gifName || gifName.trim() === '') return null;
  const original = gifName.trim();
  const key1 = normalize(original);
  const mapped1 = NAME_MAP[key1];
  if (mapped1) return `${GIF_BASE}/${mapped1}`;
  const key2 = normalize(original).replace(/\.webp$/, '');
  const mapped2 = NAME_MAP[key2];
  if (mapped2) return `${GIF_BASE}/${mapped2}`;
  const base = original.split('/').pop() || original;
  const key3 = normalize(base);
  const mapped3 = NAME_MAP[key3];
  if (mapped3) return `${GIF_BASE}/${mapped3}`;
  const fallback = key3.replace(/-/g, '_') + '.gif';
  return `${GIF_BASE}/${fallback}`;
}
