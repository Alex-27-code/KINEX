// GIF URL resolver for Bourdon94m/Workout-Animated-GIF repository
// Files are stored with underscores and lowercase naming

const GIF_BASE = 'https://raw.githubusercontent.com/Bourdon94m/Workout-Animated-GIF/main/media';

// Known mappings from app data gifName → actual repo filename
// Covers common exercises that have different naming
const NAME_MAP: Record<string, string> = {
  'arnold-press.webp': 'dumbbell_arnold_press.gif',
  'arnold-press': 'dumbbell_arnold_press.gif',
  'back-extension-frontloaded.webp': 'back_extension_frontloaded.gif',
  'barbell-biceps-curl.webp': 'barbell_biceps_curl.gif',
  'barbell-hack-squat.webp': 'barbell_hack_squat.gif',
  'barbell-lunge.webp': 'barbell_lunge.gif',
  'barbell-lying-tricep-extension.webp': 'barbell_lying_tricep_extension.gif',
  'barbell-row.gif': 'barbell_bent_over_row.gif',
  'barbell-row': 'barbell_bent_over_row.gif',
  'barbell-shrug.webp': 'barbell_shrug.gif',
  'barbell-standing-calf-raise-2.webp': 'barbell_standing_calf_raise.gif',
  'bench-press.webp': 'barbell_bench_press.gif',
  'bench-press': 'barbell_bench_press.gif',
  'bent-over-row.webp': 'dumbbell_bent_over_row.gif',
  'bent-over-row': 'dumbbell_bent_over_row.gif',
  'bicep-curl.webp': 'dumbbell_biceps_curl.gif',
  'bicep-curl': 'dumbbell_biceps_curl.gif',
  'cable-crunch.webp': 'cable_crunch.gif',
  'cable-fly.webp': 'cable_fly.gif',
  'calf-raise.webp': 'standing_calf_raise.gif',
  'calf-raise': 'standing_calf_raise.gif',
  'crunch.webp': 'crunch.gif',
  'crunch': 'crunch.gif',
  'deadlift.webp': 'barbell_deadlift.gif',
  'deadlift': 'barbell_deadlift.gif',
  'decline-bench-press.webp': 'barbell_decline_bench_press.gif',
  'decline-bench-press': 'barbell_decline_bench_press.gif',
  'dumbbell-fly.webp': 'dumbbell_fly.gif',
  'dumbbell-fly': 'dumbbell_fly.gif',
  'dumbbell-curl.webp': 'dumbbell_biceps_curl.gif',
  'dumbbell-curl': 'dumbbell_biceps_curl.gif',
  'dumbbell-row.webp': 'dumbbell_bent_over_row.gif',
  'dumbbell-row': 'dumbbell_bent_over_row.gif',
  'dumbbell-shoulder-press.webp': 'dumbbell_shoulder_press.gif',
  'dumbbell-shoulder-press': 'dumbbell_shoulder_press.gif',
  'face-pull.webp': 'face_pull.gif',
  'face-pull': 'face_pull.gif',
  'front-squat.webp': 'barbell_front_squat.gif',
  'front-squat': 'barbell_front_squat.gif',
  'good-morning.webp': 'barbell_good_morning.gif',
  'good-morning': 'barbell_good_morning.gif',
  'hack-squat.webp': 'hack_squat.gif',
  'hack-squat': 'hack_squat.gif',
  'hammer-curl.webp': 'dumbbell_hammer_curl.gif',
  'hammer-curl': 'dumbbell_hammer_curl.gif',
  'hip-thrust.webp': 'barbell_hip_thrust.gif',
  'hip-thrust': 'barbell_hip_thrust.gif',
  'incline-bench-press.webp': 'barbell_incline_bench_press.gif',
  'incline-bench-press': 'barbell_incline_bench_press.gif',
  'incline-dumbbell-press.webp': 'dumbbell_incline_bench_press.gif',
  'incline-dumbbell-press': 'dumbbell_incline_bench_press.gif',
  'lateral-raise.webp': 'lateral_raise.gif',
  'lateral-raise': 'lateral_raise.gif',
  'lat-pulldown.webp': 'cable_lat_pulldown.gif',
  'lat-pulldown': 'cable_lat_pulldown.gif',
  'lat-pulldown-wide.webp': 'cable_wide_grip_lat_pulldown.gif',
  'lat-pulldown-wide': 'cable_wide_grip_lat_pulldown.gif',
  'leg-press.webp': 'leg_press.gif',
  'leg-press': 'leg_press.gif',
  'leg-curl.webp': 'lying_leg_curl.gif',
  'leg-curl': 'lying_leg_curl.gif',
  'leg-extension.webp': 'leg_extension.gif',
  'leg-extension': 'leg_extension.gif',
  'overhead-press.webp': 'barbell_overhead_press.gif',
  'overhead-press': 'barbell_overhead_press.gif',
  'overhead-tricep-extension.webp': 'overhead_tricep_extension.gif',
  'overhead-tricep-extension': 'overhead_tricep_extension.gif',
  'plank.webp': 'front_plank.gif',
  'plank': 'front_plank.gif',
  'preacher-curl.webp': 'preacher_curl.gif',
  'preacher-curl': 'preacher_curl.gif',
  'pull-up.webp': 'pull_up.gif',
  'pull-up': 'pull_up.gif',
  'push-up.webp': 'push_up.gif',
  'push-up': 'push_up.gif',
  'romanian-deadlift.webp': 'romanian_deadlift.gif',
  'romanian-deadlift': 'romanian_deadlift.gif',
  'russian-twist.webp': 'russian_twist.gif',
  'russian-twist': 'russian_twist.gif',
  'seated-calf-raise.webp': 'seated_calf_raise.gif',
  'seated-calf-raise': 'seated_calf_raise.gif',
  'shoulder-press.webp': 'dumbbell_shoulder_press.gif',
  'shoulder-press': 'dumbbell_shoulder_press.gif',
  'shrug.webp': 'barbell_shrug.gif',
  'shrug': 'barbell_shrug.gif',
  'side-plank.webp': 'side_plank.gif',
  'side-plank': 'side_plank.gif',
  'squat.webp': 'barbell_squat.gif',
  'squat': 'barbell_squat.gif',
  't-bar-row.webp': 't_bar_row.gif',
  't-bar-row': 't_bar_row.gif',
  'tricep-dip.webp': 'tricep_dip.gif',
  'tricep-dip': 'tricep_dip.gif',
  'tricep-pushdown.webp': 'cable_tricep_pushdown.gif',
  'tricep-pushdown': 'cable_tricep_pushdown.gif',
  'upright-row.webp': 'upright_row.gif',
  'upright-row': 'upright_row.gif',
  'wrist-curl.webp': 'wrist_curl.gif',
  'wrist-curl': 'wrist_curl.gif',
};

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/\.webp$/i, '')
    .replace(/\.gif$/i, '')
    .replace(/[_\s-]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .trim();
}

export function getGifUrl(gifName: string | undefined): string | null {
  if (!gifName) return null;
  
  // Check direct name map first
  const direct = NAME_MAP[gifName];
  if (direct) return `${GIF_BASE}/${direct}`;
  
  const directLower = NAME_MAP[gifName.toLowerCase()];
  if (directLower) return `${GIF_BASE}/${directLower}`;
  
  // Normalize and search
  const normalized = normalize(gifName);
  const mapped = NAME_MAP[normalized];
  if (mapped) return `${GIF_BASE}/${mapped}`;
  
  // Try lowercase with underscores
  const fallback = normalized.replace(/-/g, '_') + '.gif';
  return `${GIF_BASE}/${fallback}`;
}

export function getGifUrlOrPlaceholder(gifName: string | undefined): string {
  const url = getGifUrl(gifName);
  if (!url) return '';
  return url;
}
