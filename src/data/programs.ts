// Kinex Training Programs — rewritten April 2026
// Exercise ID → Name reference:
// ex_1: Arnold Press        ex_2: Back Extension Frontloaded   ex_3: Barbell Biceps Curl
// ex_4: Barbell Hack Squat  ex_5: Barbell Lunge              ex_6: Barbell Lying Tricep Extension
// ex_7: Barbell Row         ex_8: Barbell Shrug              ex_9: Barbell Standing Calf Raise 2
// ex_10: Barbell Standing Triceps Extension  ex_11: Belt Squat  ex_12: Bench Press
// ex_13: Bulgarian Split Squat Barbell        ex_14: Cable Chest Press  ex_15: Cable Crunch
// ex_16: Cable Curl With Bar    ex_17: Cable Curl With Rope   ex_18: Cable Front Raise
// ex_19: Cable Lateral Raise    ex_20: Cable Rear Delt Row    ex_21: Cable Row Seated Narrow Grip
// ex_22: Cable Row Seated Single Arm   ex_23: Calf Raise Standing   ex_24: Close Grip Bench Press
// ex_25: Crossbody Cable Triceps Extension   ex_26: Crunch   ex_27: Deadlift
// ex_28: Dips   ex_29: Dumbbell Chest Fly   ex_30: Dumbbell Chest Press
// ex_31: Dumbbell Front Raise   ex_32: Dumbbell Incline Press   ex_33: Dumbbell Lateral Raise
// ex_34: Dumbbell Lunge   ex_35: Dumbbell Pullover   ex_36: EZ Curl
// ex_37: Front Squat   ex_38: Hack Squat Machine   ex_39: Hammer Curl
// ex_40: Hanging Leg Raise   ex_41: Hip Thrust   ex_42: Incline Bench Press
// ex_43: Incline Bench SkullCrushers   ex_44: Incline Dumbbell Curl   ex_45: Kroc Row
// ex_46: Lat Pulldown With Neutral Grip 1   ex_47: Lateral Raise Machine   ex_48: Leg Curl Seated
// ex_49: Leg Extension One Leg   ex_50: Leg Extension Seated   ex_51: Leg Press
// ex_52: Lying Dumbbell Triceps Extension 1   ex_53: Lying Leg Curl   ex_54: Machine Chest Fly
// ex_55: Machine Chest Press   ex_56: Machine Lat Pulldown   ex_57: Machine Overhead Tricep Extension
// ex_58: Machine Shoulder Press   ex_59: One Arm Lat Pulldown   ex_60: Overhead Cable Triceps Extension From Upper Position
// ex_61: Overhead Press Exercise   ex_62: Overhead Tricep Extension Lower Position   ex_63: Pec Deck
// ex_64: Preacher Curl Barbell   ex_65: Pull Ups   ex_66: Push Press
// ex_67: Push Up   ex_68: Reverse Dumbbell Flyes   ex_69: Reverse Machine Fly
// ex_70: Romanian Deadlift   ex_71: Seated Calf Raise Barbell   ex_72: Seated Dumbbell Shoulder Press
// ex_73: Seated Machine Row   ex_74: Single Leg Leg Curl   ex_75: Smith Machine Lunge
// ex_76: Spider Curl Does Whatever A Spider Curl Does 2   ex_77: Squat   ex_78: T Bar Row Machine
// ex_79: Triceps Pushdown With Rope   ex_80: Triceps Pushdown With Straight Handle

export interface Exercise { id: string; name: string; sets: string; reps: string; note?: string; }
export interface WorkoutDay { title: string; exercises: Exercise[]; }
export interface WeeklySchedule { weekLabel: string; days: WorkoutDay[]; }
export interface Program {
    id: string; title: string; description: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
    category: "Powerlifting" | "Bodybuilding" | "Powerbuilding" | "Strength + Hypertrophy";
    weeks: number; daysPerWeek: number;
    schedule: WeeklySchedule[];
    badge?: "⭐ Best for Beginners" | "🔥 Most Popular" | "💪 Editor's Pick" | "🏆 Gold Standard" | "💎 Elite Performance";
    isPremium?: boolean;
}

const _rawPrograms: Program[] = [

// ═══════════════════════════════════════════════════
// POWERLIFTING (8 programs)
// ═══════════════════════════════════════════════════

{
    id: "starting-strength", title: "Starting Strength", category: "Powerlifting",
    badge: "🏆 Gold Standard",
    description: "The gold standard for strength beginners. Master the five foundational barbell lifts with linear progression. Add 2.5kg per workout.",
    difficulty: "Beginner", weeks: 8, daysPerWeek: 3,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day A (Mon/Wed/Fri)", exercises: [
                    { id: "ex_77", name: "Squat", sets: "3", reps: "5", note: "5-7 warm-up sets, then 3 work sets @ weight" },
                    { id: "ex_12", name: "Bench Press", sets: "3", reps: "5", note: "3 work sets" },
                    { id: "ex_27", name: "Deadlift", sets: "1", reps: "5", note: "1 work set, focus on form" },
                ]
            },
            {
                title: "Day B (Tue/Thu/Sat)", exercises: [
                    { id: "ex_77", name: "Squat", sets: "3", reps: "5", note: "Same weight as Day A" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "5", note: "3 work sets" },
                    { id: "ex_7", name: "Barbell Row", sets: "3", reps: "5", note: "3 work sets, controlled tempo" },
                ]
            },
        ]
    }]
},

{
    id: "stronglifts-5x5", title: "StrongLifts 5×5", category: "Powerlifting",
    badge: "⭐ Best for Beginners",
    description: "Classic 5×5 program. Alternate Workout A and B three days per week. Squat every session by design.",
    difficulty: "Beginner", weeks: 12, daysPerWeek: 3,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Workout A (Mon/Fri)", exercises: [
                    { id: "ex_77", name: "Squat", sets: "5", reps: "5", note: "Start @ 80% 1RM, add 2.5kg each session" },
                    { id: "ex_12", name: "Bench Press", sets: "5", reps: "5", note: "Start @ 80% 1RM" },
                    { id: "ex_7", name: "Barbell Row", sets: "5", reps: "5", note: "Add 2.5kg each session" },
                ]
            },
            {
                title: "Workout B (Wed)", exercises: [
                    { id: "ex_77", name: "Squat", sets: "5", reps: "5", note: "Same weight as Workout A" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "5", reps: "5", note: "Start @ 75% 1RM" },
                    { id: "ex_27", name: "Deadlift", sets: "1", reps: "5", note: "Start @ 85% 1RM, add 5kg each session" },
                ]
            },
        ]
    }]
},

{
    id: "texas-method", title: "Texas Method", category: "Powerlifting",
    badge: "💪 Editor's Pick",
    description: "Intermediate program. Mon: Volume (5×5 @ 75%), Wed: Recovery (2×5 @ 65%), Fri: Intensity (1×5 @ 90%). Classic 3-day split.",
    difficulty: "Intermediate", weeks: 8, daysPerWeek: 3,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Monday — Volume Day", exercises: [
                    { id: "ex_77", name: "Squat", sets: "5", reps: "5", note: "75% 1RM, 5 total work sets" },
                    { id: "ex_12", name: "Bench Press", sets: "5", reps: "5", note: "75% 1RM" },
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "75% 1RM, 3 sets" },
                ]
            },
            {
                title: "Wednesday — Recovery Day", exercises: [
                    { id: "ex_77", name: "Squat", sets: "2", reps: "5", note: "65% 1RM, lighter recovery" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "5", note: "60-65% 1RM" },
                    { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8-10", note: "Moderate weight, hypertrophy range" },
                    { id: "ex_26", name: "Crunch", sets: "3", reps: "15-20", note: "Core work" },
                ]
            },
            {
                title: "Friday — Intensity Day", exercises: [
                    { id: "ex_77", name: "Squat", sets: "1", reps: "5", note: "90% 1RM, true max attempt" },
                    { id: "ex_12", name: "Bench Press", sets: "1", reps: "5", note: "90% 1RM" },
                    { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "5", note: "Hip hinge, moderate weight" },
                ]
            },
        ]
    }]
},

{
    id: "wendler-531", title: "Wendler 5/3/1", category: "Powerlifting",
    badge: "🔥 Most Popular",
    description: "Jim Wendler's legendary periodization. 4-week wave: 5s → 3s → 5s → Deload. Based on Training Max (90% of true 1RM).",
    difficulty: "Intermediate", weeks: 12, daysPerWeek: 4,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Squat + Legs", exercises: [
                    { id: "ex_77", name: "Squat", sets: "3", reps: "5/3/1", note: "Week 1: 65%×5, Week 2: 70%×3, Week 3: 75%×5, Week 4: Deload" },
                    { id: "ex_70", name: "Romanian Deadlift", sets: "5", reps: "10", note: "Accessory @ 50% TM" },
                    { id: "ex_51", name: "Leg Press", sets: "5", reps: "10", note: "Hypertrophy accessory" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "4", reps: "12-15", note: "Isolation" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "4", reps: "12-15", note: "Hamstrings" },
                ]
            },
            {
                title: "Day 2 — Bench + Arms", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "3", reps: "5/3/1", note: "Same wave structure as squat" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "5", reps: "10", note: "Accessory @ 50% TM" },
                    { id: "ex_54", name: "Machine Chest Fly", sets: "5", reps: "10-12", note: "Chest isolation" },
                    { id: "ex_80", name: "Triceps Pushdown With Straight Handle", sets: "4", reps: "12-15", note: "Triceps" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "12-15", note: "Biceps" },
                ]
            },
            {
                title: "Day 3 — Deadlift + Legs", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "5/3/1", note: "Same wave structure" },
                    { id: "ex_77", name: "Squat", sets: "5", reps: "10", note: "Accessory @ 50% TM" },
                    { id: "ex_41", name: "Hip Thrust", sets: "5", reps: "10", note: "Glute focus" },
                    { id: "ex_48", name: "Leg Curl Seated", sets: "4", reps: "12-15", note: "Hamstrings" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "12-15", note: "Calves" },
                ]
            },
            {
                title: "Day 4 — Overhead + Upper", exercises: [
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "5/3/1", note: "Same wave structure" },
                    { id: "ex_12", name: "Bench Press", sets: "5", reps: "10", note: "Accessory @ 50% TM" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "5", reps: "10-12", note: "Back width" },
                    { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "4", reps: "12-15", note: "Rear delts" },
                    { id: "ex_57", name: "Machine Overhead Tricep Extension", sets: "4", reps: "12-15", note: "Triceps" },
                ]
            },
        ]
    }]
},

{
    id: "juggernaut-method", title: "Juggernaut Method", category: "Powerlifting",
    description: "Chad Wesley Smith. 4×10 → 4×8 → 4×6 → 4×3 wave. Accumulation → Intensification → Realization phases.",
    difficulty: "Advanced", weeks: 16, daysPerWeek: 4,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Squat Focus", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "10", note: "Week 1-4: 4×10 @ 60% TM" },
                    { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10", note: "Week 1-4: 3×10 @ 60% TM" },
                    { id: "ex_51", name: "Leg Press", sets: "3", reps: "12", note: "Accessory" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "Isolation" },
                ]
            },
            {
                title: "Day 2 — Bench Focus", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "10", note: "Week 1-4: 4×10 @ 60% TM" },
                    { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "10", note: "Tricep strength" },
                    { id: "ex_54", name: "Machine Chest Fly", sets: "3", reps: "12", note: "Isolation" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15", note: "Delt width" },
                ]
            },
            {
                title: "Day 3 — Deadlift Focus", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "4", reps: "10", note: "Week 1-4: 4×10 @ 60% TM" },
                    { id: "ex_77", name: "Squat", sets: "3", reps: "10", note: "Supplemental" },
                    { id: "ex_45", name: "Kroc Row", sets: "3", reps: "12", note: "Back thickness" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "Biceps" },
                ]
            },
            {
                title: "Day 4 — Overhead Focus", exercises: [
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "10", note: "Week 1-4: 4×10 @ 60% TM" },
                    { id: "ex_58", name: "Machine Shoulder Press", sets: "3", reps: "10", note: "Shoulder press var." },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "12", note: "Back width" },
                    { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "15", note: "Triceps" },
                ]
            },
        ]
    }]
},

{
    id: "candito-linear", title: "Candito Linear", category: "Powerlifting",
    description: "JY Candito's 6-week linear program. Week 1-2: 70-75% × 5×5, Week 3-4: 77-82% × 4×4, Week 5-6: 85%+ × 3×2. Squat/Bench/Deadlift focused.",
    difficulty: "Intermediate", weeks: 6, daysPerWeek: 4,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Squat + Bench", exercises: [
                    { id: "ex_77", name: "Squat", sets: "5", reps: "5", note: "Week 1-2: 70%×5, Week 3-4: 77%×4, Week 5-6: 85%×3" },
                    { id: "ex_12", name: "Bench Press", sets: "5", reps: "5", note: "Same % scheme" },
                    { id: "ex_6", name: "Barbell Lying Tricep Extension", sets: "3", reps: "10", note: "Hypertrophy" },
                ]
            },
            {
                title: "Day 2 — Deadlift + Overhead", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "5", reps: "5", note: "Week 1-2: 72%×5, Week 3-4: 80%×4, Week 5-6: 87%×3" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "5", reps: "5", note: "Same % scheme" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10", note: "Hypertrophy" },
                ]
            },
            {
                title: "Day 3 — Squat + Bench 2", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "4", note: "Heavier variation" },
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "4", note: "Heavier variation" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "6", note: "Secondary press" },
                    { id: "ex_48", name: "Leg Curl Seated", sets: "3", reps: "10", note: "Hamstrings" },
                ]
            },
            {
                title: "Day 4 — Deadlift 2 + Overhead 2", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "4", reps: "4", note: "Heavier variation" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "4", note: "Heavier variation" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "8", note: "Back work" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "3", reps: "10", note: "Hamstrings" },
                ]
            },
        ]
    }]
},

{
    id: "gzcl-method", title: "GZCL Method", category: "Powerlifting",
    description: "Cody LeGod's GZCL. T1: 6×3 @ 90% (辛), T2: 3×10 @ 75%, T3: 3×20 @ 60%. Linear periodization with tier system.",
    difficulty: "Advanced", weeks: 12, daysPerWeek: 4,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Squat", exercises: [
                    { id: "ex_77", name: "Squat", sets: "6", reps: "3", note: "T1: 90%+ intensity, 6 working sets" },
                    { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10", note: "T2: 70-75% intensity" },
                    { id: "ex_51", name: "Leg Press", sets: "3", reps: "20", note: "T3: 50-60% intensity" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "20", note: "T3 isolation" },
                ]
            },
            {
                title: "Day 2 — Bench", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "6", reps: "3", note: "T1: 90%+ intensity" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "10", note: "T2: 75% intensity" },
                    { id: "ex_54", name: "Machine Chest Fly", sets: "3", reps: "20", note: "T3: 60% intensity" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "20", note: "T3 isolation" },
                ]
            },
            {
                title: "Day 3 — Deadlift", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "6", reps: "3", note: "T1: 90%+ intensity" },
                    { id: "ex_7", name: "Barbell Row", sets: "3", reps: "10", note: "T2: 75% intensity" },
                    { id: "ex_45", name: "Kroc Row", sets: "3", reps: "20", note: "T3: back thickness" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "20", note: "T3: biceps" },
                ]
            },
            {
                title: "Day 4 — Overhead", exercises: [
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "6", reps: "3", note: "T1: 90%+ intensity" },
                    { id: "ex_58", name: "Machine Shoulder Press", sets: "3", reps: "10", note: "T2: 75% intensity" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "20", note: "T3: 60% intensity" },
                    { id: "ex_80", name: "Triceps Pushdown With Straight Handle", sets: "3", reps: "20", note: "T3 isolation" },
                ]
            },
        ]
    }]
},

{
    id: "hst-5x5", title: "HST 5×5", category: "Powerlifting",
    description: "Hypertrophy Specific Training adapted to 5×5. 2-week blocks at 5×5 @ 75-80%, then deload. Good for intermediates wanting size+strength.",
    difficulty: "Intermediate", weeks: 8, daysPerWeek: 4,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Squat + Bench", exercises: [
                    { id: "ex_77", name: "Squat", sets: "5", reps: "5", note: "75-80% 1RM, 5×5 scheme" },
                    { id: "ex_12", name: "Bench Press", sets: "5", reps: "5", note: "75-80% 1RM" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8", note: "Hypertrophy accessory" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "12", note: "Isolation" },
                ]
            },
            {
                title: "Day 2 — Deadlift + Overhead", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "5", reps: "5", note: "75-80% 1RM" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "5", reps: "5", note: "75-80% 1RM" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "4", reps: "8", note: "Back accessory" },
                    { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "12", note: "Triceps" },
                ]
            },
            {
                title: "Day 3 — Squat 2 + Bench 2", exercises: [
                    { id: "ex_77", name: "Squat", sets: "5", reps: "5", note: "Same scheme, heavier if possible" },
                    { id: "ex_12", name: "Bench Press", sets: "5", reps: "5", note: "Same scheme" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "8", note: "Secondary press" },
                    { id: "ex_80", name: "Triceps Pushdown With Straight Handle", sets: "3", reps: "12", note: "Triceps" },
                ]
            },
            {
                title: "Day 4 — Deadlift 2 + Overhead 2", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "5", reps: "5", note: "Heavier variation" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "5", reps: "5", note: "Heavier variation" },
                    { id: "ex_45", name: "Kroc Row", sets: "4", reps: "8", note: "Back work" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "3", reps: "12", note: "Hamstrings" },
                ]
            },
        ]
    }]
},

// ═══════════════════════════════════════════════════
// BODYBUILDING (12 programs)
// ═══════════════════════════════════════════════════

{
    id: "ppl-6day", title: "Push / Pull / Legs (6-Day)", category: "Bodybuilding",
    badge: "🔥 Most Popular",
    description: "The gold standard split. Push (chest/shoulders/triceps), Pull (back/biceps), Legs (quads/hamstrings/glutes). Train each twice per week.",
    difficulty: "Intermediate", weeks: 12, daysPerWeek: 6,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Push A", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "8", note: "4×8 @ 75-80%" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_55", name: "Machine Chest Press", sets: "3", reps: "12", note: "Chest hypertrophy" },
                    { id: "ex_29", name: "Dumbbell Chest Fly", sets: "3", reps: "12-15", note: "Chest isolation" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "8", note: "Shoulders 4×8" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "4", reps: "15", note: "Delt width 4×15" },
                    { id: "ex_57", name: "Machine Overhead Tricep Extension", sets: "3", reps: "12", note: "Triceps 3×12" },
                    { id: "ex_80", name: "Triceps Pushdown With Straight Handle", sets: "3", reps: "15", note: "Triceps 3×15" },
                ]
            },
            {
                title: "Day 2 — Pull A", exercises: [
                    { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8-10", note: " bodyweight or added weight" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8", note: "4×8 @ 75%" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_20", name: "Cable Rear Delt Row", sets: "3", reps: "12-15", note: "Rear delts" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "15", note: "Triceps finisher" },
                ]
            },
            {
                title: "Day 3 — Legs A", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "8", note: "4×8 @ 75-80%" },
                    { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10", note: "Glutes 4×10" },
                    { id: "ex_51", name: "Leg Press", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "4", reps: "12-15", note: "Quads 4×12-15" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "4", reps: "12-15", note: "Hamstrings 4×12-15" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "12-15", note: "Calves 4×12-15" },
                ]
            },
            {
                title: "Day 4 — Push B", exercises: [
                    { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "8", note: "4×8 @ 75-80%" },
                    { id: "ex_12", name: "Bench Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_14", name: "Cable Chest Press", sets: "3", reps: "12", note: "Cable constant tension" },
                    { id: "ex_63", name: "Pec Deck", sets: "3", reps: "12-15", note: "Machine flye" },
                    { id: "ex_58", name: "Machine Shoulder Press", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_18", name: "Cable Front Raise", sets: "3", reps: "15", note: "Front delts" },
                    { id: "ex_25", name: "Crossbody Cable Triceps Extension", sets: "3", reps: "12", note: "Triceps" },
                    { id: "ex_28", name: "Dips", sets: "3", reps: "10-12", note: "Bodyweight triceps" },
                ]
            },
            {
                title: "Day 5 — Pull B", exercises: [
                    { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "4", reps: "8-10", note: "4×8-10" },
                    { id: "ex_78", name: "T Bar Row Machine", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_21", name: "Cable Row Seated Narrow Grip", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "Rear delt isolation" },
                    { id: "ex_36", name: "EZ Curl", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_17", name: "Cable Curl With Rope", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10", note: "Hamstring stretch" },
                ]
            },
            {
                title: "Day 6 — Legs B", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_37", name: "Front Squat", sets: "3", reps: "8", note: "3×8, quad focus" },
                    { id: "ex_38", name: "Hack Squat Machine", sets: "3", reps: "10-12", note: "Quad overload" },
                    { id: "ex_48", name: "Leg Curl Seated", sets: "4", reps: "12-15", note: "4×12-15" },
                    { id: "ex_49", name: "Leg Extension One Leg", sets: "3", reps: "12-15", note: "Single leg quad" },
                    { id: "ex_71", name: "Seated Calf Raise Barbell", sets: "4", reps: "15-20", note: "4×15-20, squeeze top" },
                ]
            },
        ]
    }]
},

{
    id: "ppl-3day", title: "Push / Pull / Legs (3-Day)", category: "Bodybuilding",
    badge: "⭐ Best for Beginners",
    description: "Simplified PPL for 3 days per week. All major muscle groups in each session. Perfect for beginners who want bodybuilding structure.",
    difficulty: "Beginner", weeks: 12, daysPerWeek: 3,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Push", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_80", name: "Triceps Pushdown With Straight Handle", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 2 — Pull", exercises: [
                    { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8-10", note: "Bodyweight or weighted" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 3 — Legs", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "4×15" },
                ]
            },
        ]
    }]
},

{
    id: "bro-split", title: "Bro Split (5-Day)", category: "Bodybuilding",
    badge: "💎 Elite Performance",
    description: "Classic 5-day bodybuilding split. One muscle group per session with high volume. Chest → Back → Shoulders → Legs → Arms.",
    difficulty: "Intermediate", weeks: 12, daysPerWeek: 5,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Chest", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "8-10", note: "4×8-10" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_55", name: "Machine Chest Press", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_29", name: "Dumbbell Chest Fly", sets: "4", reps: "12-15", note: "4×12-15" },
                    { id: "ex_63", name: "Pec Deck", sets: "3", reps: "15-20", note: "3×15-20" },
                    { id: "ex_80", name: "Triceps Pushdown With Straight Handle", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 2 — Back", exercises: [
                    { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8-10", note: "4×8-10" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_73", name: "Seated Machine Row", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_78", name: "T Bar Row Machine", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "12", note: "4×12" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 3 — Shoulders", exercises: [
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "8-10", note: "4×8-10" },
                    { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_58", name: "Machine Shoulder Press", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "4", reps: "15-20", note: "4×15-20" },
                    { id: "ex_18", name: "Cable Front Raise", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "4", reps: "15-20", note: "4×15-20" },
                    { id: "ex_80", name: "Triceps Pushdown With Straight Handle", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 4 — Legs", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "8-10", note: "4×8-10" },
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "6-8", note: "3×6-8" },
                    { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10-12", note: "4×10-12" },
                    { id: "ex_51", name: "Leg Press", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "4", reps: "12-15", note: "4×12-15" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "4", reps: "12-15", note: "4×12-15" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15-20", note: "4×15-20" },
                ]
            },
            {
                title: "Day 5 — Arms", exercises: [
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_36", name: "EZ Curl", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_44", name: "Incline Dumbbell Curl", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_76", name: "Spider Curl Does Whatever A Spider Curl Does 2", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_24", name: "Close Grip Bench Press", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_6", name: "Barbell Lying Tricep Extension", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_57", name: "Machine Overhead Tricep Extension", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_28", name: "Dips", sets: "3", reps: "10", note: "3×10" },
                ]
            },
        ]
    }]
},

{
    id: "upper-lower-4day", title: "Upper / Lower (4-Day)", category: "Bodybuilding",
    description: "4-day upper/lower split. Train each twice per week for optimal volume distribution. Great balance of frequency and recovery.",
    difficulty: "Intermediate", weeks: 12, daysPerWeek: 4,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Upper A", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 2 — Lower A", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_51", name: "Leg Press", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "4×15" },
                ]
            },
            {
                title: "Day 3 — Upper B", exercises: [
                    { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8-10", note: "4×8-10" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_78", name: "T Bar Row Machine", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 4 — Lower B", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "6", note: "3×6" },
                    { id: "ex_37", name: "Front Squat", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_38", name: "Hack Squat Machine", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_48", name: "Leg Curl Seated", sets: "4", reps: "12", note: "4×12" },
                    { id: "ex_49", name: "Leg Extension One Leg", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_71", name: "Seated Calf Raise Barbell", sets: "4", reps: "15-20", note: "4×15-20" },
                ]
            },
        ]
    }]
},

{
    id: "arnold-split", title: "Arnold Split", category: "Bodybuilding",
    description: "Classic Arnold Schwarzenegger split: Chest+Back → Shoulders+Arms → Legs. 6 days on, 1 day rest. High volume bodybuilding.",
    difficulty: "Advanced", weeks: 12, daysPerWeek: 6,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Chest + Back", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8-10", note: "4×8-10" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_29", name: "Dumbbell Chest Fly", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_57", name: "Machine Overhead Tricep Extension", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 2 — Shoulders + Arms", exercises: [
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "4", reps: "15-20", note: "4×15-20" },
                    { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_36", name: "EZ Curl", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_28", name: "Dips", sets: "3", reps: "10", note: "3×10" },
                ]
            },
            {
                title: "Day 3 — Legs", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "6", note: "3×6" },
                    { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_51", name: "Leg Press", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "4×15" },
                ]
            },
            {
                title: "Day 4 — Chest + Back 2", exercises: [
                    { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "4", reps: "8-10", note: "4×8-10" },
                    { id: "ex_12", name: "Bench Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_78", name: "T Bar Row Machine", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_63", name: "Pec Deck", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_21", name: "Cable Row Seated Narrow Grip", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "10", note: "3×10" },
                ]
            },
            {
                title: "Day 5 — Shoulders + Arms 2", exercises: [
                    { id: "ex_58", name: "Machine Shoulder Press", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_18", name: "Cable Front Raise", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_69", name: "Reverse Machine Fly", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_64", name: "Preacher Curl Barbell", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_76", name: "Spider Curl Does Whatever A Spider Curl Does 2", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_6", name: "Barbell Lying Tricep Extension", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 6 — Legs 2", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "4", reps: "6", note: "4×6" },
                    { id: "ex_37", name: "Front Squat", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_38", name: "Hack Squat Machine", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_48", name: "Leg Curl Seated", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_49", name: "Leg Extension One Leg", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_71", name: "Seated Calf Raise Barbell", sets: "4", reps: "15-20", note: "4×15-20" },
                ]
            },
        ]
    }]
},

{
    id: "chest-back-arms-legs", title: "Chest / Back / Arms / Legs (4-Day)", category: "Bodybuilding",
    description: "Simple 4-day split. Each muscle group gets full attention in one session. Great for intermediates who want 4 days per week.",
    difficulty: "Intermediate", weeks: 12, daysPerWeek: 4,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Chest", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_55", name: "Machine Chest Press", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_29", name: "Dumbbell Chest Fly", sets: "4", reps: "12-15", note: "4×12-15" },
                    { id: "ex_63", name: "Pec Deck", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 2 — Back", exercises: [
                    { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8-10", note: "4×8-10" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_20", name: "Cable Rear Delt Row", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 3 — Arms", exercises: [
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_24", name: "Close Grip Bench Press", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_36", name: "EZ Curl", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_6", name: "Barbell Lying Tricep Extension", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 4 — Legs", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "6-8", note: "3×6-8" },
                    { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "4×15" },
                ]
            },
        ]
    }]
},

{
    id: "phul", title: "PHUL (Power Hypertrophy Upper Lower)", category: "Bodybuilding",
    description: "4-day upper/lower split with power and hypertrophy phases. Weeks 1-2: Power (4×6), Weeks 3-4: Hypertrophy (3×10). Combines strength and size.",
    difficulty: "Intermediate", weeks: 8, daysPerWeek: 4,
    schedule: [{
        weekLabel: "Weeks 1-2 (Power)", days: [
            {
                title: "Day 1 — Upper Power", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "4-6", note: "4×4-6 @ 80-85%" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "4-6", note: "4×4-6" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "4-6", note: "4×4-6" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "6-8", note: "3×6-8" },
                    { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "6", note: "3×6" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 2 — Lower Power", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "4-6", note: "4×4-6 @ 80-85%" },
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "4-6", note: "3×4-6" },
                    { id: "ex_41", name: "Hip Thrust", sets: "3", reps: "6-8", note: "3×6-8" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "8-10", note: "3×8-10" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "3", reps: "8-10", note: "3×8-10" },
                ]
            },
            {
                title: "Day 3 — Upper Hypertrophy", exercises: [
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_65", name: "Pull Ups", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_29", name: "Dumbbell Chest Fly", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 4 — Lower Hypertrophy", exercises: [
                    { id: "ex_37", name: "Front Squat", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_38", name: "Hack Squat Machine", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_48", name: "Leg Curl Seated", sets: "4", reps: "12", note: "4×12" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "4×15" },
                ]
            },
        ]
    }]
},

{
    id: "5day-bodybuilding", title: "5-Day Bodybuilding", category: "Bodybuilding",
    description: "High volume 5-day split. Each session is dedicated to one primary muscle group plus complementary muscles. Classic competitive bodybuilder approach.",
    difficulty: "Advanced", weeks: 12, daysPerWeek: 5,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Chest", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_55", name: "Machine Chest Press", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_29", name: "Dumbbell Chest Fly", sets: "4", reps: "12-15", note: "4×12-15" },
                    { id: "ex_63", name: "Pec Deck", sets: "3", reps: "15-20", note: "3×15-20" },
                    { id: "ex_57", name: "Machine Overhead Tricep Extension", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 2 — Back", exercises: [
                    { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8-10", note: "4×8-10" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_78", name: "T Bar Row Machine", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 3 — Shoulders", exercises: [
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_58", name: "Machine Shoulder Press", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "4", reps: "15-20", note: "4×15-20" },
                    { id: "ex_18", name: "Cable Front Raise", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "4", reps: "15", note: "4×15" },
                ]
            },
            {
                title: "Day 4 — Legs", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "6", note: "3×6" },
                    { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_38", name: "Hack Squat Machine", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "4×15" },
                ]
            },
            {
                title: "Day 5 — Arms", exercises: [
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_64", name: "Preacher Curl Barbell", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_44", name: "Incline Dumbbell Curl", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_24", name: "Close Grip Bench Press", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_6", name: "Barbell Lying Tricep Extension", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_28", name: "Dips", sets: "3", reps: "10", note: "3×10" },
                ]
            },
        ]
    }]
},

{
    id: "upper-lower-3day", title: "Upper / Lower (3-Day)", category: "Bodybuilding",
    description: "Simple 3-day upper/lower split for those who can only train 3 times per week. All major compounds hit weekly.",
    difficulty: "Beginner", weeks: 12, daysPerWeek: 3,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Upper", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_80", name: "Triceps Pushdown With Straight Handle", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 2 — Lower", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "6", note: "3×6" },
                    { id: "ex_51", name: "Leg Press", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 3 — Upper 2", exercises: [
                    { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8-10", note: "4×8-10" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_78", name: "T Bar Row Machine", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
        ]
    }]
},
,

{
    id: "4day-upper-lower-hypertrophy", title: "4-Day Upper/Lower Hypertrophy", category: "Bodybuilding",
    description: "4-day upper/lower with focus on hypertrophy. High volume per session, moderate weights, controlled tempo. Great for muscle building phase.",
    difficulty: "Intermediate", weeks: 12, daysPerWeek: 4,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Upper A", exercises: [
                    { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_58", name: "Machine Shoulder Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_29", name: "Dumbbell Chest Fly", sets: "3", reps: "12-15", note: "3×12-15" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15-20", note: "3×15-20" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 2 — Lower A", exercises: [
                    { id: "ex_37", name: "Front Squat", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_70", name: "Romanian Deadlift", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_51", name: "Leg Press", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "4×15" },
                ]
            },
            {
                title: "Day 3 — Upper B", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8-10", note: "4×8-10" },
                    { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_78", name: "T Bar Row Machine", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_63", name: "Pec Deck", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 4 — Lower B", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "6", note: "3×6" },
                    { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_38", name: "Hack Squat Machine", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_48", name: "Leg Curl Seated", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_71", name: "Seated Calf Raise Barbell", sets: "4", reps: "15-20", note: "4×15-20" },
                ]
            },
        ]
    }]
},

{
    id: "bodybuilder-specialization", title: "Bodybuilder's Specialization", category: "Bodybuilding",
    description: "6-day advanced bodybuilding split with specialization phases. Alternates between chest/back emphasis and shoulder/arm emphasis weeks.",
    difficulty: "Advanced", weeks: 12, daysPerWeek: 6,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Chest + Triceps", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_55", name: "Machine Chest Press", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_29", name: "Dumbbell Chest Fly", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_63", name: "Pec Deck", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_57", name: "Machine Overhead Tricep Extension", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 2 — Back + Biceps", exercises: [
                    { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8-10", note: "4×8-10" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_78", name: "T Bar Row Machine", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_45", name: "Kroc Row", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "12", note: "4×12" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 3 — Legs", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "6", note: "3×6" },
                    { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_38", name: "Hack Squat Machine", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "4×15" },
                ]
            },
            {
                title: "Day 4 — Shoulders + Arms", exercises: [
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "4", reps: "15-20", note: "4×15-20" },
                    { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_24", name: "Close Grip Bench Press", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_6", name: "Barbell Lying Tricep Extension", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 5 — Chest + Back", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8-10", note: "4×8-10" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_29", name: "Dumbbell Chest Fly", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_80", name: "Triceps Pushdown With Straight Handle", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 6 — Legs 2", exercises: [
                    { id: "ex_37", name: "Front Squat", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_70", name: "Romanian Deadlift", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_51", name: "Leg Press", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_48", name: "Leg Curl Seated", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_49", name: "Leg Extension One Leg", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_71", name: "Seated Calf Raise Barbell", sets: "4", reps: "15-20", note: "4×15-20" },
                ]
            },
        ]
    }]
},

// ═══════════════════════════════════════════════════
// POWERBUILDING (4 programs)
// ═══════════════════════════════════════════════════

{
    id: "n-suns-lp", title: "nSuns LP", category: "Powerbuilding",
    badge: "💪 Editor's Pick",
    description: "nSuns' linear progression. 4-day upper/lower. Week 1: 70%×5+, Week 2: 72.5%×4+, Week 3: 75%×3+, Week 4: 77.5%×5+. AMRAP sets drive progression.",
    difficulty: "Intermediate", weeks: 12, daysPerWeek: 4,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Squat + Bench", exercises: [
                    { id: "ex_77", name: "Squat", sets: "5+", reps: "5", note: "Week 1: 70%×5+, add reps each week until 8+, then add weight" },
                    { id: "ex_12", name: "Bench Press", sets: "5+", reps: "5", note: "5+ AMRAP sets" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "10", note: "3×10 @ 65%" },
                    { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_80", name: "Triceps Pushdown With Straight Handle", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 2 — Deadlift + Overhead", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "5+", reps: "5", note: "5+ AMRAP sets" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "5+", reps: "5", note: "5+ AMRAP sets" },
                    { id: "ex_7", name: "Barbell Row", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 3 — Squat 2 + Bench 2", exercises: [
                    { id: "ex_77", name: "Squat", sets: "5+", reps: "5", note: "Heavier than Day 1" },
                    { id: "ex_12", name: "Bench Press", sets: "5+", reps: "5", note: "Heavier than Day 1" },
                    { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 4 — Deadlift 2 + Overhead 2", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "3", note: "Heavy singles/doubles/triples" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "5+", reps: "5", note: "5+ AMRAP sets" },
                    { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_48", name: "Leg Curl Seated", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15", note: "3×15" },
                ]
            },
        ]
    }]
},
,

{
    id: "upper-lower-powerbuilding", title: "Upper/Lower Powerbuilding (4-Day)", category: "Powerbuilding",
    description: "Classic 4-day upper/lower powerbuilding split. Alternates between strength days (5×5) and hypertrophy days (3×10). 2 compounds + 4 accessories per session.",
    difficulty: "Intermediate", weeks: 12, daysPerWeek: 4,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Upper Strength", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "5", reps: "5", note: "5×5 @ 80-85%" },
                    { id: "ex_7", name: "Barbell Row", sets: "5", reps: "5", note: "5×5 @ 80-85%" },
                    { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_29", name: "Dumbbell Chest Fly", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 2 — Lower Strength", exercises: [
                    { id: "ex_77", name: "Squat", sets: "5", reps: "5", note: "5×5 @ 80-85%" },
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "3×5 @ 80%" },
                    { id: "ex_41", name: "Hip Thrust", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "4×15" },
                ]
            },
            {
                title: "Day 3 — Upper Hypertrophy", exercises: [
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "10", note: "3×10 @ 70%" },
                    { id: "ex_65", name: "Pull Ups", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 4 — Lower Hypertrophy", exercises: [
                    { id: "ex_37", name: "Front Squat", sets: "3", reps: "10", note: "3×10 @ 70%" },
                    { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_51", name: "Leg Press", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_38", name: "Hack Squat Machine", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_48", name: "Leg Curl Seated", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_71", name: "Seated Calf Raise Barbell", sets: "4", reps: "15-20", note: "4×15-20" },
                ]
            },
        ]
    }]
},

{
    id: "westside-bodybuilding", title: "Westside for Bodybuilders", category: "Powerbuilding",
    description: "Conjugate method adapted for bodybuilding. Max Effort Upper/Lower + Dynamic Effort Upper/Lower. Speed work + max strength + accessories.",
    difficulty: "Advanced", weeks: 12, daysPerWeek: 4,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Max Effort Upper", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "1", reps: "1-3", note: "ME Upper: find 1-3RM, rotate variations weekly" },
                    { id: "ex_7", name: "Barbell Row", sets: "1", reps: "1-3", note: "ME Upper accessory" },
                    { id: "ex_55", name: "Machine Chest Press", sets: "3", reps: "8-10", note: "3×8-10" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_80", name: "Triceps Pushdown With Straight Handle", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 2 — Max Effort Lower", exercises: [
                    { id: "ex_77", name: "Squat", sets: "1", reps: "1-3", note: "ME Lower: find 1-3RM, rotate variations" },
                    { id: "ex_27", name: "Deadlift", sets: "1", reps: "1-3", note: "ME Lower" },
                    { id: "ex_41", name: "Hip Thrust", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 3 — Dynamic Effort Upper", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "8", reps: "3", note: "DE Upper: 8×3 @ 50-60% + bands, explosive" },
                    { id: "ex_65", name: "Pull Ups", sets: "8", reps: "3", note: "8×3 explosive" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_29", name: "Dumbbell Chest Fly", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 4 — Dynamic Effort Lower", exercises: [
                    { id: "ex_77", name: "Squat", sets: "8", reps: "3", note: "DE Lower: 8×3 @ 50-60% + bands" },
                    { id: "ex_27", name: "Deadlift", sets: "5", reps: "3", note: "5×3 moderate" },
                    { id: "ex_51", name: "Leg Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_38", name: "Hack Squat Machine", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "4×15" },
                ]
            },
        ]
    }]
},

// ═══════════════════════════════════════════════════
// STRENGTH + HYPERTROPHY (8 programs)
// ═══════════════════════════════════════════════════

{
    id: "full-body-strength-3day", title: "Full Body Strength (3-Day)", category: "Strength + Hypertrophy",
    badge: "⭐ Best for Beginners",
    description: "3 full body sessions per week. 2 compound lifts + 3-4 accessories per day. Perfect for beginners, great for intermediates in strength phase.",
    difficulty: "Beginner", weeks: 12, daysPerWeek: 3,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Full Body A", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_41", name: "Hip Thrust", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_80", name: "Triceps Pushdown With Straight Handle", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 2 — Full Body B", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "3×5 @ 75-80%" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 3 — Full Body C", exercises: [
                    { id: "ex_77", name: "Squat", sets: "3", reps: "8", note: "3×8 @ 70% (lighter)" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_65", name: "Pull Ups", sets: "3", reps: "8-10", note: "3×8-10" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "4×15" },
                ]
            },
        ]
    }]
},

{
    id: "upper-lower-strength-4day", title: "Upper/Lower Strength (4-Day)", category: "Strength + Hypertrophy",
    description: "4-day upper/lower split. 2-3 compounds + 3-4 accessories per session. 8-12 total sets per muscle per week. Classic strength-builder.",
    difficulty: "Intermediate", weeks: 12, daysPerWeek: 4,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Upper", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 2 — Lower", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "3×5 @ 75%" },
                    { id: "ex_41", name: "Hip Thrust", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "4×15" },
                ]
            },
            {
                title: "Day 3 — Upper 2", exercises: [
                    { id: "ex_65", name: "Pull Ups", sets: "4", reps: "6", note: "4×6 (weighted)" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 4 — Lower 2", exercises: [
                    { id: "ex_37", name: "Front Squat", sets: "3", reps: "6", note: "3×6 @ 75%" },
                    { id: "ex_70", name: "Romanian Deadlift", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_51", name: "Leg Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_38", name: "Hack Squat Machine", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_48", name: "Leg Curl Seated", sets: "4", reps: "12", note: "4×12" },
                    { id: "ex_71", name: "Seated Calf Raise Barbell", sets: "4", reps: "15", note: "4×15" },
                ]
            },
        ]
    }]
},

{
    id: "strength-hypertrophy-5day", title: "Strength + Hypertrophy 5-Day", category: "Strength + Hypertrophy",
    description: "5 days per week with alternating strength (4×6) and hypertrophy (3×10) sessions. Push-Pull-Legs-Knockout-Hyper. High volume, rapid progress.",
    difficulty: "Intermediate", weeks: 8, daysPerWeek: 5,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Push Strength", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_55", name: "Machine Chest Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_80", name: "Triceps Pushdown With Straight Handle", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 2 — Pull Strength", exercises: [
                    { id: "ex_65", name: "Pull Ups", sets: "4", reps: "6", note: "4×6 (weighted)" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "6", note: "4×6" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "12", note: "4×12" },
                    { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 3 — Legs Strength", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "3×5 @ 75%" },
                    { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10", note: "4×10" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "4×15" },
                ]
            },
            {
                title: "Day 4 — Knockout Day", exercises: [
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "10", note: "3×10 @ 70%" },
                    { id: "ex_65", name: "Pull Ups", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_58", name: "Machine Shoulder Press", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_7", name: "Barbell Row", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_29", name: "Dumbbell Chest Fly", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 5 — Hyper Day", exercises: [
                    { id: "ex_37", name: "Front Squat", sets: "3", reps: "10", note: "3×10 @ 70%" },
                    { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_38", name: "Hack Squat Machine", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_48", name: "Leg Curl Seated", sets: "4", reps: "15", note: "4×15" },
                    { id: "ex_49", name: "Leg Extension One Leg", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_71", name: "Seated Calf Raise Barbell", sets: "4", reps: "20", note: "4×20" },
                ]
            },
        ]
    }]
},

{
    id: "5x5-strength", title: "5×5 Strength (3-Day)", category: "Strength + Hypertrophy",
    description: "Classic 5×5 strength program. 3 compound lifts per session, 5×5 scheme. Focus on the big three. 70-85% intensity. Linear progression.",
    difficulty: "Beginner", weeks: 12, daysPerWeek: 3,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Workout A", exercises: [
                    { id: "ex_77", name: "Squat", sets: "5", reps: "5", note: "5×5 @ 75-80%" },
                    { id: "ex_12", name: "Bench Press", sets: "5", reps: "5", note: "5×5 @ 75-80%" },
                    { id: "ex_7", name: "Barbell Row", sets: "5", reps: "5", note: "5×5 @ 75%" },
                ]
            },
            {
                title: "Day 2 — Workout B", exercises: [
                    { id: "ex_77", name: "Squat", sets: "5", reps: "5", note: "5×5 (same as A or +2.5kg)" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "5", reps: "5", note: "5×5 @ 75%" },
                    { id: "ex_27", name: "Deadlift", sets: "1", reps: "5", note: "1×5 @ 80%" },
                ]
            },
            {
                title: "Day 3 — Workout C", exercises: [
                    { id: "ex_77", name: "Squat", sets: "5", reps: "5", note: "5×5 (same or +2.5kg)" },
                    { id: "ex_12", name: "Bench Press", sets: "5", reps: "5", note: "5×5" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "10", note: "3×10 accessory" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15", note: "3×15" },
                ]
            },
        ]
    }]
},

{
    id: "compound-focus", title: "Compound Focus (3-Day)", category: "Strength + Hypertrophy",
    description: "3 days per week. 3 compounds + 2 accessories. Focus on compound lifts. Squat/Bench/Deadlift + 2 accessories per day. Simple, effective.",
    difficulty: "Beginner", weeks: 12, daysPerWeek: 3,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Squat + Bench", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_80", name: "Triceps Pushdown With Straight Handle", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 2 — Deadlift + Overhead", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "3×5 @ 75-80%" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 3 — Squat + Row", exercises: [
                    { id: "ex_77", name: "Squat", sets: "3", reps: "8", note: "3×8 @ 70%" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "6", note: "4×6" },
                    { id: "ex_12", name: "Bench Press", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "3×15" },
                ]
            },
        ]
    }]
},

{
    id: "barbells-only", title: "Barbells Only (3-Day)", category: "Strength + Hypertrophy",
    description: "Pure barbell training. Only barbell exercises. 3 days per week. Great for garage gym or minimal equipment. Compound focus with barbell row and squat.",
    difficulty: "Intermediate", weeks: 12, daysPerWeek: 3,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Heavy Squat + Bench", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_6", name: "Barbell Lying Tricep Extension", sets: "3", reps: "10", note: "3×10" },
                ]
            },
            {
                title: "Day 2 — Heavy Deadlift + Overhead", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "3×5 @ 75-80%" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10", note: "3×10" },
                ]
            },
            {
                title: "Day 3 — Squat + Row + Accessories", exercises: [
                    { id: "ex_77", name: "Squat", sets: "3", reps: "8", note: "3×8 @ 70%" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "6", note: "4×6" },
                    { id: "ex_12", name: "Bench Press", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_8", name: "Barbell Shrug", sets: "3", reps: "12", note: "3×12" },
                ]
            },
        ]
    }]
},

{
    id: "intermediate-full-body", title: "Intermediate Full Body (4-Day)", category: "Strength + Hypertrophy",
    description: "4-day full body for intermediate lifters. 3 compounds + 3 accessories per session. Train 4 days, rest 3. High frequency, excellent progress.",
    difficulty: "Intermediate", weeks: 12, daysPerWeek: 4,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Full Body A", exercises: [
                    { id: "ex_77", name: "Squat", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_12", name: "Bench Press", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "6", note: "4×6" },
                    { id: "ex_41", name: "Hip Thrust", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 2 — Full Body B", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "3×5 @ 75%" },
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "6", note: "4×6 @ 75-80%" },
                    { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_80", name: "Triceps Pushdown With Straight Handle", sets: "3", reps: "15", note: "3×15" },
                ]
            },
            {
                title: "Day 3 — Full Body C", exercises: [
                    { id: "ex_77", name: "Squat", sets: "3", reps: "8", note: "3×8 @ 70%" },
                    { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "4×15" },
                ]
            },
            {
                title: "Day 4 — Full Body D", exercises: [
                    { id: "ex_37", name: "Front Squat", sets: "3", reps: "6", note: "3×6 @ 75%" },
                    { id: "ex_12", name: "Bench Press", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8", note: "4×8" },
                    { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_48", name: "Leg Curl Seated", sets: "4", reps: "12", note: "4×12" },
                    { id: "ex_71", name: "Seated Calf Raise Barbell", sets: "4", reps: "15", note: "4×15" },
                ]
            },
        ]
    }]
},

{
    id: "strength-4day", title: "Advanced Strength 4-Day", category: "Strength + Hypertrophy",
    badge: "💎 Elite Performance",
    description: "4 days on, 1 day off. Squat → Bench → Deadlift → Press. Each day: 1 main lift heavy (85%+), 1 variation moderate, accessories. True strength focus.",
    difficulty: "Advanced", weeks: 12, daysPerWeek: 4,
    schedule: [{
        weekLabel: "Standard Week", days: [
            {
                title: "Day 1 — Squat Focus", exercises: [
                    { id: "ex_77", name: "Squat", sets: "3", reps: "3-5", note: "85-90% × 3-5 (true max)" },
                    { id: "ex_37", name: "Front Squat", sets: "3", reps: "6", note: "3×6 @ 75%" },
                    { id: "ex_41", name: "Hip Thrust", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "12", note: "3×12" },
                    { id: "ex_53", name: "Lying Leg Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 2 — Bench Focus", exercises: [
                    { id: "ex_12", name: "Bench Press", sets: "3", reps: "3-5", note: "85-90% × 3-5" },
                    { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "6", note: "3×6 @ 75%" },
                    { id: "ex_55", name: "Machine Chest Press", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "10", note: "3×10" },
                ]
            },
            {
                title: "Day 3 — Deadlift Focus", exercises: [
                    { id: "ex_27", name: "Deadlift", sets: "3", reps: "3-5", note: "85-90% × 3-5" },
                    { id: "ex_7", name: "Barbell Row", sets: "3", reps: "6", note: "3×6" },
                    { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_45", name: "Kroc Row", sets: "3", reps: "10", note: "3×10" },
                    { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "3×12" },
                ]
            },
            {
                title: "Day 4 — Press Focus", exercises: [
                    { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "3-5", note: "85-90% × 3-5" },
                    { id: "ex_66", name: "Push Press", sets: "3", reps: "6", note: "3×6" },
                    { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8", note: "3×8" },
                    { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "3×15" },
                    { id: "ex_6", name: "Barbell Lying Tricep Extension", sets: "3", reps: "10", note: "3×10" },
                ]
            },
        ]
    }]
},


    {
        id: "fst-7-split", title: "FST-7 Bodybuilding Split", category: "Bodybuilding", badge: "🔥 Most Popular",
        description: "Hany Rambod's Fascia Stretch Training-7. Emphasizes 7 high-volume sets with only 30-45s rest to finish the muscle completely.",
        difficulty: "Advanced", weeks: 8, daysPerWeek: 5,
        schedule: [
            { weekLabel: "Standard Rotation", days: [
                { title: "Monday: Chest & Biceps", exercises: [{ id: "ex_29", name: "Dumbbell Chest Fly", sets: "4", reps: "8-12" }, { id: "ex_12", name: "Bench Press", sets: "3", reps: "8-12" }, { id: "ex_29", name: "Dumbbell Chest Fly", sets: "7", reps: "10-12", note: "30s rest, stretch hard" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "7", reps: "10-12", note: "30s rest" }] },
                { title: "Tuesday: Back & Abs", exercises: [{ id: "ex_35", name: "Dumbbell Pullover", sets: "4", reps: "10" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "10" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "7", reps: "10-12", note: "30s rest" }, { id: "ex_17", name: "Cable Curl With Rope", sets: "7", reps: "12", note: "30s rest" }] },
                { title: "Thursday: Shoulders & Triceps", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "8-10" }, { id: "ex_66", name: "Push Press", sets: "3", reps: "8-10" }, { id: "ex_1", name: "Arnold Press", sets: "7", reps: "12", note: "30s rest" }, { id: "ex_62", name: "Overhead Tricep Extension Lower Position", sets: "3", reps: "10" }, { id: "ex_60", name: "Overhead Cable Triceps Extension From Upper Position", sets: "7", reps: "10-12", note: "30s rest" }] },
                { title: "Friday: Quads, Hams, Calves", exercises: [{ id: "ex_77", name: "Squat", sets: "4", reps: "8-10" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10-12" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "7", reps: "12", note: "30s rest" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "7", reps: "10-12", note: "30s rest" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "7", reps: "15" }] },
                { title: "Saturday: Arms (Biceps & Triceps)", exercises: [{ id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "8-10" }, { id: "ex_12", name: "Bench Press", sets: "4", reps: "8-10" }, { id: "ex_16", name: "Cable Curl With Bar", sets: "7", reps: "10-12", note: "30s rest" }, { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "7", reps: "10-12", note: "30s rest" }] }
            ]}
        ]
    },
    {
        id: "mike-mentzer-3day", title: "Mike Mentzer HIT 3-Day Split", category: "Bodybuilding",
        badge: "🏆 Gold Standard",
        description: "Mike Mentzer's Heavy Duty High-Intensity Training. Focuses on 1-2 work sets taken to absolute failure. Maximum intensity, maximum recovery.",
        difficulty: "Advanced", weeks: 4, daysPerWeek: 3,
        schedule: [
            { weekLabel: "Standard Cycle", days: [
                { title: "Day 1: Chest & Back", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "1-2", reps: "6-10", note: "Pre-exhaust, to failure" }, { id: "ex_1", name: "Arnold Press", sets: "1", reps: "3-5", note: "Absolute failure immediately after fly" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "1-2", reps: "6-10", note: "Pre-exhaust" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "1", reps: "6-10", note: "Failure" }, { id: "ex_27", name: "Deadlift", sets: "1", reps: "6-8", note: "Max effort" }] },
                { title: "Day 2: Legs & Abs", exercises: [{ id: "ex_2", name: "Back Extension Frontloaded", sets: "1-2", reps: "12-15", note: "Pre-exhaust" }, { id: "ex_51", name: "Leg Press", sets: "1", reps: "10-15", note: "Immediately after extensions to failure" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "1", reps: "10-12", note: "Failure" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "1", reps: "15-20", note: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "1", reps: "15-20", note: "Failure" }] },
                { title: "Day 3: Shoulders & Arms", exercises: [{ id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "1-2", reps: "8-10", note: "Pre-exhaust" }, { id: "ex_1", name: "Arnold Press", sets: "1", reps: "6-8", note: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "1", reps: "8-10", note: "Failure" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "1", reps: "6-8", note: "Failure" }, { id: "ex_66", name: "Push Press", sets: "1-2", reps: "8-10", note: "Pre-exhaust" }, { id: "ex_28", name: "Dips", sets: "1", reps: "6-8", note: "Failure" }] }
            ]}
        ]
    },
    {
        id: "full-body-3x", title: "Full Body 3x/Week", category: "Bodybuilding",
        description: "A balanced 3-day full body routine perfect for beginners and intermediates looking for high frequency.",
        difficulty: "Beginner", weeks: 8, daysPerWeek: 3,
        schedule: [
            { weekLabel: "Standard Week", days: [
                { title: "Day 1: Full Body A", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "8-10" }, { id: "ex_12", name: "Bench Press", sets: "3", reps: "8-10" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8-10" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-12" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "2", reps: "12-15" }, { id: "ex_66", name: "Push Press", sets: "2", reps: "12-15" }] },
                { title: "Day 2: Full Body B", exercises: [{ id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "8-10" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8-10" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "8-10" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "15" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10-12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15-20" }] },
                { title: "Day 3: Full Body C", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "10-12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "AMRAP" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "10-12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-12" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "2", reps: "12-15" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "2", reps: "12-15" }] }
            ]}
        ]
    },
    {
        id: "full-body-2x", title: "Full Body 2x/Week", category: "Bodybuilding",
        description: "A minimalist 2-day full body routine for those with limited time or as a maintenance program.",
        difficulty: "Beginner", weeks: 8, daysPerWeek: 2,
        schedule: [
            { weekLabel: "Standard Week", days: [
                { title: "Day 1: Full Body 1", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "8-10" }, { id: "ex_12", name: "Bench Press", sets: "3", reps: "8-10" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "8-12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8-12" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10-15" }] },
                { title: "Day 2: Full Body 2", exercises: [{ id: "ex_27", name: "Deadlift", sets: "3", reps: "5-8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8-12" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8-12" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10-15" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "15-20" }] }
            ]}
        ]
    },

    {
        id: "sam-sulek-4day", title: "Sam Sulek 4-Day Split", category: "Bodybuilding",
        badge: "🔥 Most Popular",
        description: "High intensity, high effort bro split popularized by Sam Sulek. Push, Pull, Legs, Arms. Go heavy, train to failure.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 4,
        schedule: [
            {
                weekLabel: "Standard Flow", days: [
                    { title: "Day 1: Chest, Triceps, Shoulders", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "8-12", note: "To failure" },
                        { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "8-12", note: "To failure" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-12", note: "To failure" },
                        { id: "ex_19", name: "Cable Lateral Raise", sets: "4", reps: "12-15", note: "To failure" },
                        { id: "ex_80", name: "Triceps Pushdown With Straight Handle", sets: "3", reps: "10-12", note: "To failure" },
                        { id: "ex_57", name: "Machine Overhead Tricep Extension", sets: "3", reps: "12-15", note: "To failure" }
                    ]},
                    { title: "Day 2: Back, Biceps", exercises: [
                        { id: "ex_65", name: "Pull Ups", sets: "3", reps: "8-12", note: "To failure" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8-12", note: "To failure" },
                        { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "10-12", note: "To failure" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "10-12", note: "To failure" },
                        { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12-15", note: "To failure" }
                    ]},
                    { title: "Day 3: Legs", exercises: [
                        { id: "ex_77", name: "Squat", sets: "4", reps: "8-12", note: "To failure" },
                        { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10-12", note: "To failure" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "10-12", note: "To failure" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10-12", note: "To failure" },
                        { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "12-15", note: "To failure" },
                        { id: "ex_53", name: "Lying Leg Curl", sets: "3", reps: "12-15", note: "To failure" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15-20", note: "To failure" }
                    ]},
                    { title: "Day 4: Shoulders, Arms", exercises: [
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "8-12", note: "To failure" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-12", note: "To failure" },
                        { id: "ex_19", name: "Cable Lateral Raise", sets: "4", reps: "12-15", note: "To failure" },
                        { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "To failure" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10-12", note: "To failure" },
                        { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "10-12", note: "To failure" },
                        { id: "ex_28", name: "Dips", sets: "3", reps: "8-12", note: "To failure" }
                    ]}
                ]
            }
        ]
    },
];

export const PROGRAMS_DATA = _rawPrograms.filter(p => p.id !== "DELETE_ME");
