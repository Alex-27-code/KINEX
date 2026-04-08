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

    // ─── POWERLIFTING ──────────────────────────────────
    {
        id: "starting-strength", title: "Starting Strength", category: "Powerlifting",
        badge: "🏆 Gold Standard",
        description: "The gold standard for strength beginners. Master the five foundational barbell lifts with linear progression. Add weight every workout.",
        difficulty: "Beginner", weeks: 8, daysPerWeek: 3,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Day A (Mon/Wed/Fri)", exercises: [
                        { id: "ex_77", name: "Squat", sets: "3", reps: "5", note: "3-5 warm-up sets then work sets" },
                        { id: "ex_12", name: "Bench Press", sets: "3", reps: "5", note: "Alternate with Overhead Press" },
                        { id: "ex_27", name: "Deadlift", sets: "1", reps: "5", note: "Focus on bar path, keep back flat" },
                    ]
                },
                {
                    title: "Day B (Tue/Thu/Sat)", exercises: [
                        { id: "ex_77", name: "Squat", sets: "3", reps: "5", note: "Same weight as Day A" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "5", note: "Alternate with Bench Press" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "5", note: "Control the weight, full range" },
                    ]
                },
            ]
        }]
    },
    {
        id: "stronglifts-5x5", title: "StrongLifts 5x5", category: "Powerlifting",
        badge: "⭐ Best for Beginners",
        description: "Classic 5x5 program modernized. Alternate Workout A and B three days per week. Squat every session by design.",
        difficulty: "Beginner", weeks: 12, daysPerWeek: 3,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Workout A (Mon/Fri)", exercises: [
                        { id: "ex_77", name: "Squat", sets: "5", reps: "5", note: "Start @ 75% 1RM, add 2.5kg each session" },
                        { id: "ex_12", name: "Bench Press", sets: "5", reps: "5", note: "Start @ 75% 1RM" },
                        { id: "ex_7", name: "Barbell Row", sets: "5", reps: "5", note: "Add 2.5kg each session" },
                    ]
                },
                {
                    title: "Workout B (Wed)", exercises: [
                        { id: "ex_77", name: "Squat", sets: "5", reps: "5", note: "Same weight as Workout A" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "5", reps: "5", note: "Start @ 70% 1RM" },
                        { id: "ex_27", name: "Deadlift", sets: "1", reps: "5", note: "Start @ 80% 1RM, add 5kg each session" },
                    ]
                },
            ]
        }]
    },
    {
        id: "texas-method", title: "Texas Method", category: "Powerlifting",
        description: "Intermediate program for strength. Mon: Volume (5x5 @ 75%), Wed: Recovery (2x5 @ 65%), Fri: Intensity (1x5 @ 90%). Classic 3-day split.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 3,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Monday — Volume Day", exercises: [
                        { id: "ex_77", name: "Squat", sets: "5", reps: "5", note: "75% 1RM, 5 total sets" },
                        { id: "ex_12", name: "Bench Press", sets: "5", reps: "5", note: "75% 1RM" },
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "75% 1RM" },
                    ]
                },
                {
                    title: "Wednesday — Recovery Day", exercises: [
                        { id: "ex_77", name: "Squat", sets: "2", reps: "5", note: "65% 1RM, lighter recovery" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "5", note: "60-65% 1RM" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8-10", note: "Moderate weight, hypertrophy rep range" },
                        { id: "ex_26", name: "Crunch", sets: "3", reps: "20", note: "Core work" },
                    ]
                },
                {
                    title: "Friday — Intensity Day", exercises: [
                        { id: "ex_77", name: "Squat", sets: "1", reps: "5", note: "90% 1RM, true max attempt" },
                        { id: "ex_12", name: "Bench Press", sets: "1", reps: "5", note: "90% 1RM" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "5", note: "Hip hinge pattern, moderate weight" },
                    ]
                },
            ]
        }]
    },
    {
        id: "wendler-531", title: "Wendler 5/3/1", category: "Powerlifting",
        badge: "🔥 Most Popular",
        description: "4-week wave loading based on Training Max (TM). Week 1: 65%x5, Week 2: 75%x5, Week 3: 85%x5, Week 4: Deload. Classic powerlifting periodization.",
        difficulty: "Intermediate", weeks: 12, daysPerWeek: 4,
        schedule: [{
            weekLabel: "4-Week Cycle", days: [
                {
                    title: "Day 1 — Squat", exercises: [
                        { id: "ex_77", name: "Squat", sets: "1", reps: "5", note: "Week 1: 65%, Week 2: 75%, Week 3: 85%" },
                        { id: "ex_77", name: "Squat", sets: "1", reps: "5", note: "Same percentage, second set" },
                        { id: "ex_77", name: "Squat", sets: "1", reps: "5+", note: "AMRAP final set" },
                        { id: "ex_15", name: "Cable Crunch", sets: "5", reps: "10", note: "Accessory" },
                    ]
                },
                {
                    title: "Day 2 — Bench Press", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "1", reps: "5", note: "65/75/85% scheme" },
                        { id: "ex_12", name: "Bench Press", sets: "1", reps: "5", note: "" },
                        { id: "ex_12", name: "Bench Press", sets: "1", reps: "5+", note: "AMRAP final set" },
                        { id: "ex_16", name: "Cable Curl With Bar", sets: "5", reps: "10", note: "Biceps accessory" },
                    ]
                },
                {
                    title: "Day 3 — Deadlift", exercises: [
                        { id: "ex_27", name: "Deadlift", sets: "1", reps: "5", note: "65/75/85% scheme" },
                        { id: "ex_27", name: "Deadlift", sets: "1", reps: "5", note: "" },
                        { id: "ex_27", name: "Deadlift", sets: "1", reps: "5+", note: "AMRAP final set" },
                        { id: "ex_40", name: "Hanging Leg Raise", sets: "5", reps: "10-15", note: "Core" },
                    ]
                },
                {
                    title: "Day 4 — Overhead Press", exercises: [
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "1", reps: "5", note: "65/75/85% scheme" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "1", reps: "5", note: "" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "1", reps: "5+", note: "AMRAP final set" },
                        { id: "ex_24", name: "Close Grip Bench Press", sets: "5", reps: "10", note: "Triceps accessory" },
                    ]
                },
            ]
        }]
    },

    // ─── BODYBUILDING ──────────────────────────────────
    {
        id: "ppl-3day", title: "Push / Pull / Legs (3-Day)", category: "Bodybuilding",
        description: "Classic PPL split adapted for 3 days per week. Train each muscle group once per week with balanced volume and compound focus.",
        difficulty: "Beginner", weeks: 8, daysPerWeek: 3,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Monday — Push", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "6-8", note: "Compound, heavy" },
                        { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "8-10", note: "Upper chest focus" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "8-10", note: "Compound shoulder" },
                        { id: "ex_33", name: "Dumbbell Lateral Raise", sets: "3", reps: "12-15", note: "Isolation, lateral delts" },
                        { id: "ex_60", name: "Overhead Cable Triceps Extension From Upper Position", sets: "3", reps: "12-15", note: "Triceps isolation" },
                    ]
                },
                {
                    title: "Wednesday — Pull", exercises: [
                        { id: "ex_27", name: "Deadlift", sets: "4", reps: "5-6", note: "Compound, heavy" },
                        { id: "ex_65", name: "Pull Ups", sets: "3", reps: "8-12", note: "Vertical pull" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8-10", note: "Horizontal pull" },
                        { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12-15", note: "Biceps, brachialis" },
                        { id: "ex_20", name: "Cable Rear Delt Row", sets: "3", reps: "12-15", note: "Rear delts, upper back" },
                    ]
                },
                {
                    title: "Friday — Legs", exercises: [
                        { id: "ex_77", name: "Squat", sets: "4", reps: "6-8", note: "Compound, heavy" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "8-10", note: "Hamstrings, hip hinge" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "10-12", note: "Quad dominant" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "3", reps: "10-12", note: "Hamstrings isolation" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "12-15", note: "Gastrocnemius" },
                    ]
                },
            ]
        }]
    },
    {
        id: "bodybuilding-4day", title: "4-Day Bro Split", category: "Bodybuilding",
        badge: "💪 Editor's Pick",
        description: "Classic bodybuilding split. One muscle group per day for maximum volume and pump. Proven approach for hypertrophy.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Monday — Chest + Triceps", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "8", note: "Heavy compound" },
                        { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "10", note: "Upper chest" },
                        { id: "ex_29", name: "Dumbbell Chest Fly", sets: "3", reps: "12", note: "Stretch under load" },
                        { id: "ex_14", name: "Cable Chest Press", sets: "3", reps: "12", note: "Constant tension" },
                        { id: "ex_60", name: "Overhead Cable Triceps Extension From Upper Position", sets: "3", reps: "12", note: "Long head triceps" },
                        { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "12", note: "Lateral head triceps" },
                    ]
                },
                {
                    title: "Tuesday — Back + Biceps", exercises: [
                        { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8-10", note: "Heavy vertical pull" },
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8", note: "Heavy horizontal pull" },
                        { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "12", note: "Lat isolation" },
                        { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "12", note: "Mid-back thickness" },
                        { id: "ex_36", name: "EZ Curl", sets: "3", reps: "12", note: "Biceps" },
                        { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "Brachialis, indirect" },
                    ]
                },
                {
                    title: "Thursday — Shoulders + Arms", exercises: [
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "8", note: "Compound shoulder" },
                        { id: "ex_72", name: "Seated Dumbbell Shoulder Press", sets: "3", reps: "10", note: "Dumbbell variation" },
                        { id: "ex_33", name: "Dumbbell Lateral Raise", sets: "4", reps: "15", note: "Lateral delts" },
                        { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "Rear delts" },
                        { id: "ex_44", name: "Incline Dumbbell Curl", sets: "3", reps: "12", note: "Long head biceps" },
                        { id: "ex_43", name: "Incline Bench SkullCrushers", sets: "3", reps: "12", note: "Triceps long head" },
                    ]
                },
                {
                    title: "Friday — Legs", exercises: [
                        { id: "ex_77", name: "Squat", sets: "4", reps: "8", note: "Heavy quad compound" },
                        { id: "ex_41", name: "Hip Thrust", sets: "3", reps: "10", note: "Glute focus" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "12", note: "Volume for quads" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "3", reps: "12", note: "Hamstrings" },
                        { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "Quad isolation" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "Calf development" },
                    ]
                },
            ]
        }]
    },

    // ─── POWERBUILDING ──────────────────────────────────
    {
        id: "powerbuilding-3day", title: "3-Day Powerbuilding", category: "Powerbuilding",
        description: "Heavy compound lifts for strength combined with accessory work for size. Best strength-to-size ratio in 3 days per week.",
        difficulty: "Beginner", weeks: 8, daysPerWeek: 3,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Day 1 — Upper Strength", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "5", note: "Heavy compound, 85% 1RM" },
                        { id: "ex_77", name: "Squat", sets: "3", reps: "5", note: "Heavy quad compound" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "6-8", note: "Heavy back" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "8", note: "Accessory press" },
                    ]
                },
                {
                    title: "Day 2 — Lower Strength", exercises: [
                        { id: "ex_27", name: "Deadlift", sets: "4", reps: "5", note: "Heavy hip hinge" },
                        { id: "ex_37", name: "Front Squat", sets: "3", reps: "6-8", note: "Quad strength, anterior core" },
                        { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "3", reps: "10", note: "Lat width" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "12", note: "Calf work" },
                    ]
                },
                {
                    title: "Day 3 — Hypertrophy Push", exercises: [
                        { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "8-10", note: "Chest hypertrophy" },
                        { id: "ex_65", name: "Pull Ups", sets: "3", reps: "10-12", note: "Vertical pull hypertrophy" },
                        { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "10", note: "Triceps focus" },
                        { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "Biceps" },
                    ]
                },
            ]
        }]
    },
    {
        id: "powerbuilding-4day", title: "4-Day Powerbuilding", category: "Powerbuilding",
        badge: "💎 Elite Performance",
        description: "Upper/Lower split with alternating strength and hypertrophy days. Four days per week for serious development of strength and muscle.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Monday — Upper Strength", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "5", note: "Heavy compound, 85-90% 1RM" },
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "5-6", note: "Heavy horizontal pull" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "6-8", note: "Heavy press" },
                        { id: "ex_65", name: "Pull Ups", sets: "3", reps: "8-10", note: "Weighted if possible" },
                    ]
                },
                {
                    title: "Tuesday — Lower Strength", exercises: [
                        { id: "ex_77", name: "Squat", sets: "4", reps: "5", note: "Heavy quad compound" },
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "Heavy hip hinge" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "8", note: "Hamstring focus" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "3", reps: "10-12", note: "Hamstring isolation" },
                    ]
                },
                {
                    title: "Thursday — Upper Hypertrophy", exercises: [
                        { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "8-10", note: "Chest hypertrophy" },
                        { id: "ex_56", name: "Machine Lat Pulldown", sets: "4", reps: "10-12", note: "Lat width" },
                        { id: "ex_72", name: "Seated Dumbbell Shoulder Press", sets: "3", reps: "10-12", note: "Shoulder volume" },
                        { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "12-15", note: "Triceps isolation" },
                        { id: "ex_36", name: "EZ Curl", sets: "3", reps: "12-15", note: "Biceps isolation" },
                    ]
                },
                {
                    title: "Friday — Lower Hypertrophy", exercises: [
                        { id: "ex_37", name: "Front Squat", sets: "4", reps: "8-10", note: "Quad and core focus" },
                        { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10-12", note: "Glute hypertrophy" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "12-15", note: "Quad volume" },
                        { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "Quad isolation" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "Calf development" },
                    ]
                },
            ]
        }]
    },

    // ─── STRENGTH + HYPERTROPHY ──────────────────────────
    {
        id: "upper-lower-beginner", title: "Upper / Lower Split (Beginner)", category: "Strength + Hypertrophy",
        description: "Perfect step up from 3-day full body programs. Train each muscle group twice per week with balanced strength and hypertrophy work.",
        difficulty: "Beginner", weeks: 8, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Monday — Upper A", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "3", reps: "6-8", note: "Heavy compound" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "6-8", note: "Horizontal pull" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "8", note: "Shoulder compound" },
                        { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "3", reps: "10", note: "Vertical pull" },
                    ]
                },
                {
                    title: "Tuesday — Lower A", exercises: [
                        { id: "ex_77", name: "Squat", sets: "3", reps: "6-8", note: "Heavy quad compound" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "8-10", note: "Hamstring focus" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "3", reps: "10-12", note: "Hamstring isolation" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "3", reps: "12-15", note: "Calf work" },
                    ]
                },
                {
                    title: "Thursday — Upper B", exercises: [
                        { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "8-10", note: "Upper chest" },
                        { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "10-12", note: "Back thickness" },
                        { id: "ex_72", name: "Seated Dumbbell Shoulder Press", sets: "3", reps: "10-12", note: "Dumbbell press variation" },
                        { id: "ex_33", name: "Dumbbell Lateral Raise", sets: "3", reps: "12-15", note: "Delt isolation" },
                    ]
                },
                {
                    title: "Friday — Lower B", exercises: [
                        { id: "ex_37", name: "Front Squat", sets: "3", reps: "8-10", note: "Quad and anterior core" },
                        { id: "ex_41", name: "Hip Thrust", sets: "3", reps: "10-12", note: "Glute focus" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "12-15", note: "Quad volume" },
                        { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "Quad isolation" },
                    ]
                },
            ]
        }]
    },
    {
        id: "upper-lower-intermediate", title: "Upper / Lower Split (Intermediate)", category: "Strength + Hypertrophy",
        description: "Higher volume Upper/Lower with wave loading on main lifts. Best intermediate program for simultaneous strength and size development.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Monday — Upper Strength", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "5", note: "Heavy compound 85% 1RM" },
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "5-6", note: "Heavy pull" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "6-8", note: "Heavy press" },
                        { id: "ex_65", name: "Pull Ups", sets: "3", reps: "8-10", note: "Weighted pull" },
                    ]
                },
                {
                    title: "Tuesday — Lower Strength", exercises: [
                        { id: "ex_77", name: "Squat", sets: "4", reps: "5", note: "Heavy quad work" },
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "Heavy hinge" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "8", note: "Hamstring accessory" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "12", note: "Calf work" },
                    ]
                },
                {
                    title: "Thursday — Upper Hypertrophy", exercises: [
                        { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "8-10", note: "Chest volume" },
                        { id: "ex_56", name: "Machine Lat Pulldown", sets: "4", reps: "10-12", note: "Lat width" },
                        { id: "ex_72", name: "Seated Dumbbell Shoulder Press", sets: "3", reps: "10-12", note: "Shoulder volume" },
                        { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "12-15", note: "Triceps" },
                        { id: "ex_36", name: "EZ Curl", sets: "3", reps: "12-15", note: "Biceps" },
                    ]
                },
                {
                    title: "Friday — Lower Hypertrophy", exercises: [
                        { id: "ex_37", name: "Front Squat", sets: "4", reps: "8-10", note: "Quad and core" },
                        { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10-12", note: "Glute development" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "12-15", note: "Quad volume" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "3", reps: "12", note: "Hamstring isolation" },
                        { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "Quad isolation" },
                    ]
                },
            ]
        }]
    },
    {
        id: "ppl-6day", title: "Reddit PPL (6-Day)", category: "Strength + Hypertrophy",
        badge: "🔥 Most Popular",
        description: "The legendary Reddit PPL program. 6 days per week with Push/Pull/Legs split. High volume, proven results. Not for the faint-hearted.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 6,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Monday — Push A", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "5", note: "Heavy compound" },
                        { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "6", note: "Upper chest" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "6", note: "Compound press" },
                        { id: "ex_55", name: "Machine Chest Press", sets: "3", reps: "8-10", note: "Machine push" },
                        { id: "ex_33", name: "Dumbbell Lateral Raise", sets: "3", reps: "15", note: "Isolation" },
                        { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "15", note: "Isolation" },
                    ]
                },
                {
                    title: "Tuesday — Pull A", exercises: [
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "Heavy compound" },
                        { id: "ex_65", name: "Pull Ups", sets: "3", reps: "8-10", note: "Vertical pull" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "6", note: "Horizontal pull" },
                        { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "3", reps: "10", note: "Lat width" },
                        { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "Biceps" },
                        { id: "ex_20", name: "Cable Rear Delt Row", sets: "3", reps: "15", note: "Rear delts" },
                    ]
                },
                {
                    title: "Wednesday — Legs A", exercises: [
                        { id: "ex_77", name: "Squat", sets: "4", reps: "5", note: "Heavy quad compound" },
                        { id: "ex_41", name: "Hip Thrust", sets: "3", reps: "8", note: "Glute focus" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "8", note: "Hamstring hinge" },
                        { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "12", note: "Quad isolation" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "3", reps: "12", note: "Hamstring isolation" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "5", reps: "12", note: "Calf development" },
                    ]
                },
                {
                    title: "Thursday — Push B", exercises: [
                        { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "6", note: "Heavy incline" },
                        { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "6", note: "Triceps focus" },
                        { id: "ex_72", name: "Seated Dumbbell Shoulder Press", sets: "3", reps: "8", note: "Dumbbell variation" },
                        { id: "ex_29", name: "Dumbbell Chest Fly", sets: "3", reps: "10", note: "Chest isolation" },
                        { id: "ex_18", name: "Cable Front Raise", sets: "3", reps: "15", note: "Front delt" },
                        { id: "ex_60", name: "Overhead Cable Triceps Extension From Upper Position", sets: "3", reps: "15", note: "Long head triceps" },
                    ]
                },
                {
                    title: "Friday — Pull B", exercises: [
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "5", note: "Heavy horizontal pull" },
                        { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "4", reps: "8", note: "Heavy lat work" },
                        { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "10", note: "Machine variation" },
                        { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "10", note: "Back thickness" },
                        { id: "ex_36", name: "EZ Curl", sets: "3", reps: "10", note: "Biceps mass" },
                        { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "Rear delt" },
                    ]
                },
                {
                    title: "Saturday — Legs B", exercises: [
                        { id: "ex_37", name: "Front Squat", sets: "4", reps: "6", note: "Quad focus" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "8", note: "Heavy leg press" },
                        { id: "ex_41", name: "Hip Thrust", sets: "3", reps: "10", note: "Glute pump" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "4", reps: "12", note: "Hamstring volume" },
                        { id: "ex_49", name: "Leg Extension One Leg", sets: "3", reps: "15", note: "Quad unilateral" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "5", reps: "15", note: "Calf volume" },
                    ]
                },
            ]
        }]
    },

    // ─── FULL BODY ──────────────────────────────────────
    {
        id: "full-body-3x", title: "Full Body 3x/Week", category: "Bodybuilding",
        badge: "⭐ Best for Beginners",
        description: "Three full-body sessions per week for maximum efficiency. Perfect for beginners and those with limited time. Compounds + isolation.",
        difficulty: "Beginner", weeks: 8, daysPerWeek: 3,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Day 1 — Push Focus", exercises: [
                        { id: "ex_77", name: "Squat", sets: "3", reps: "6-8", note: "Full body compound" },
                        { id: "ex_12", name: "Bench Press", sets: "3", reps: "6-8", note: "Horizontal push" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "8-10", note: "Vertical push" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "3", reps: "12", note: "Hamstring work" },
                        { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "2", reps: "15", note: "Quick triceps" },
                    ]
                },
                {
                    title: "Day 2 — Pull Focus", exercises: [
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "Full body hinge" },
                        { id: "ex_65", name: "Pull Ups", sets: "3", reps: "8-10", note: "Vertical pull" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8", note: "Horizontal pull" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "3", reps: "15", note: "Calf work" },
                        { id: "ex_36", name: "EZ Curl", sets: "2", reps: "15", note: "Quick biceps" },
                    ]
                },
                {
                    title: "Day 3 — Accessory Focus", exercises: [
                        { id: "ex_77", name: "Squat", sets: "3", reps: "8-10", note: "Moderate weight, higher volume" },
                        { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "8-10", note: "Chest volume" },
                        { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "3", reps: "12", note: "Lat work" },
                        { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "Quad isolation" },
                        { id: "ex_15", name: "Cable Crunch", sets: "3", reps: "20", note: "Core work" },
                    ]
                },
            ]
        }]
    },

    // ─── SPECIALIZED ────────────────────────────────────
    {
        id: "bench-spec-2x", title: "Bench Specialization (2x/week)", category: "Powerlifting",
        description: "Targeted bench press program for those looking to break through plateaus. High frequency bench work with accessory exercises.",
        difficulty: "Intermediate", weeks: 6, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Monday — Heavy Bench", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "5", reps: "3", note: "Heavy singles/doubles, 90%+ 1RM" },
                        { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "6", note: "Upper chest accessory" },
                        { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "8", note: "Triceps strength" },
                        { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "Rear delts for stability" },
                    ]
                },
                {
                    title: "Wednesday — Volume Bench", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "6", note: "Moderate weight, volume" },
                        { id: "ex_14", name: "Cable Chest Press", sets: "3", reps: "10", note: "Machine press for volume" },
                        { id: "ex_55", name: "Machine Chest Press", sets: "3", reps: "12", note: "Constant tension" },
                        { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "15", note: "Triceps endurance" },
                    ]
                },
                {
                    title: "Friday — Intensity Bench", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "3", reps: "2", note: "True intensity, singles at 95%+" },
                        { id: "ex_12", name: "Bench Press", sets: "2", reps: "3", note: "Back-off sets" },
                        { id: "ex_43", name: "Incline Bench SkullCrushers", sets: "3", reps: "8-10", note: "Heavy triceps work" },
                        { id: "ex_47", name: "Lateral Raise Machine", sets: "3", reps: "15", note: "Side delt specialization" },
                    ]
                },
            ]
        }]
    },
    {
        id: "fst-7-split", title: "FST-7 Bodybuilding Split", category: "Bodybuilding",
        badge: "🔥 Most Popular",
        description: "FST-7 (Faszien-SToffwechsel-7) — German high-volume training protocol. End every muscle group with 7 sets of 8-12 reps at 30-40% 1RM to maximize pump and hypertrophy.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Monday — Chest + FST-7", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "8", note: "Compound foundation" },
                        { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "10", note: "Upper chest" },
                        { id: "ex_29", name: "Dumbbell Chest Fly", sets: "3", reps: "12", note: "Stretch work" },
                        { id: "ex_54", name: "Machine Chest Fly", sets: "7", reps: "8-12", note: "FST-7 finisher @ 30-40%" },
                        { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "7", reps: "8-12", note: "FST-7 triceps finisher" },
                    ]
                },
                {
                    title: "Tuesday — Back + FST-7", exercises: [
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8", note: "Heavy compound row" },
                        { id: "ex_65", name: "Pull Ups", sets: "3", reps: "10", note: "Vertical pull" },
                        { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "3", reps: "12", note: "Lat width" },
                        { id: "ex_56", name: "Machine Lat Pulldown", sets: "7", reps: "8-12", note: "FST-7 lat finisher" },
                        { id: "ex_36", name: "EZ Curl", sets: "7", reps: "8-12", note: "FST-7 biceps finisher" },
                    ]
                },
                {
                    title: "Thursday — Shoulders + Arms + FST-7", exercises: [
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "8", note: "Compound shoulder" },
                        { id: "ex_72", name: "Seated Dumbbell Shoulder Press", sets: "3", reps: "10", note: "Dumbbell variation" },
                        { id: "ex_33", name: "Dumbbell Lateral Raise", sets: "7", reps: "8-12", note: "FST-7 lateral delt finisher" },
                        { id: "ex_39", name: "Hammer Curl", sets: "7", reps: "8-12", note: "FST-7 biceps finisher" },
                    ]
                },
                {
                    title: "Friday — Legs + FST-7", exercises: [
                        { id: "ex_77", name: "Squat", sets: "4", reps: "8", note: "Heavy quad compound" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10", note: "Hamstring emphasis" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "12", note: "Quad volume" },
                        { id: "ex_50", name: "Leg Extension Seated", sets: "7", reps: "8-12", note: "FST-7 quad finisher" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "7", reps: "8-12", note: "FST-7 calf finisher" },
                    ]
                },
            ]
        }]
    },

    // ─── MORE BODYBUILDING ──────────────────────────────
    {
        id: "ppl-4day", title: "Push / Pull / Legs (4-Day)", category: "Bodybuilding",
        badge: "🔥 Most Popular",
        description: "Classic PPL split in 4 days — each muscle group hit twice per week with optimal volume. Best bang-for-buck split for intermediate lifters.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Monday — Push A", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "6-8", note: "Heavy compound" },
                        { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "8-10", note: "Upper chest" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "8", note: "Compound press" },
                        { id: "ex_33", name: "Dumbbell Lateral Raise", sets: "3", reps: "12-15", note: "Lateral delt isolation" },
                        { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "12-15", note: "Triceps isolation" },
                        { id: "ex_25", name: "Crossbody Cable Triceps Extension", sets: "2", reps: "15", note: "Triceps finish" },
                    ]
                },
                {
                    title: "Tuesday — Pull A", exercises: [
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "Heavy compound hinge" },
                        { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8-10", note: "Vertical pull, weighted if possible" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8", note: "Horizontal pull" },
                        { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "3", reps: "12", note: "Lat width" },
                        { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "Brachialis and bicep" },
                        { id: "ex_20", name: "Cable Rear Delt Row", sets: "2", reps: "15", note: "Rear delts" },
                    ]
                },
                {
                    title: "Thursday — Push B", exercises: [
                        { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "8", note: "Heavy incline" },
                        { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "8-10", note: "Triceps focus" },
                        { id: "ex_72", name: "Seated Dumbbell Shoulder Press", sets: "3", reps: "10", note: "Dumbbell variation" },
                        { id: "ex_47", name: "Lateral Raise Machine", sets: "3", reps: "15", note: "Machine lateral raise" },
                        { id: "ex_60", name: "Overhead Cable Triceps Extension From Upper Position", sets: "3", reps: "15", note: "Long head triceps" },
                    ]
                },
                {
                    title: "Friday — Pull B", exercises: [
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "6", note: "Heavy row" },
                        { id: "ex_56", name: "Machine Lat Pulldown", sets: "4", reps: "10", note: "Machine lat work" },
                        { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "12", note: "Mid-back thickness" },
                        { id: "ex_36", name: "EZ Curl", sets: "3", reps: "12", note: "Biceps mass builder" },
                        { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "Rear delt isolation" },
                    ]
                },
            ]
        }]
    },
    {
        id: "chest-back-arms-legs", title: "Chest / Back / Arms / Legs (4-Day)", category: "Bodybuilding",
        description: "Classic 4-day split popularized by fitness influencers. One major muscle group per day with targeted isolation work.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Monday — Chest", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "6-8", note: "Heavy compound" },
                        { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "8-10", note: "Upper chest" },
                        { id: "ex_29", name: "Dumbbell Chest Fly", sets: "3", reps: "12", note: "Stretch and squeeze" },
                        { id: "ex_14", name: "Cable Chest Press", sets: "3", reps: "12", note: "Constant tension" },
                        { id: "ex_63", name: "Pec Deck", sets: "3", reps: "15", note: "Final chest isolation" },
                    ]
                },
                {
                    title: "Tuesday — Back", exercises: [
                        { id: "ex_27", name: "Deadlift", sets: "4", reps: "5", note: "Heavy compound" },
                        { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8-10", note: "Vertical pull" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8", note: "Heavy horizontal pull" },
                        { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "3", reps: "12", note: "Lat width" },
                        { id: "ex_45", name: "Kroc Row", sets: "3", reps: "12", note: "Unilateral back work" },
                    ]
                },
                {
                    title: "Thursday — Arms", exercises: [
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "8", note: "Compound shoulder" },
                        { id: "ex_36", name: "EZ Curl", sets: "4", reps: "10", note: "Biceps mass" },
                        { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "Brachialis focus" },
                        { id: "ex_43", name: "Incline Bench SkullCrushers", sets: "3", reps: "10", note: "Heavy triceps" },
                        { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "15", note: "Triceps finish" },
                        { id: "ex_44", name: "Incline Dumbbell Curl", sets: "3", reps: "12", note: "Long head bicep" },
                    ]
                },
                {
                    title: "Friday — Legs", exercises: [
                        { id: "ex_77", name: "Squat", sets: "4", reps: "6-8", note: "Heavy quad compound" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "8-10", note: "Hamstring focus" },
                        { id: "ex_41", name: "Hip Thrust", sets: "3", reps: "10-12", note: "Glute isolation" },
                        { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "Quad isolation" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "3", reps: "15", note: "Hamstring isolation" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "15", note: "Calf development" },
                    ]
                },
            ]
        }]
    },
    {
        id: "bro-split-5day", title: "5-Day Bro Split", category: "Bodybuilding",
        description: "Classic bodybuilding split from the golden era. Train one muscle group per day with high volume and maximum pump. Chest, Back, Shoulders, Arms, Legs.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 5,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Monday — Chest", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "8", note: "Compound foundation" },
                        { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "10", note: "Upper chest" },
                        { id: "ex_55", name: "Machine Chest Press", sets: "3", reps: "10", note: "Machine press" },
                        { id: "ex_29", name: "Dumbbell Chest Fly", sets: "3", reps: "12", note: "Chest isolation" },
                        { id: "ex_14", name: "Cable Chest Press", sets: "3", reps: "12", note: "Cable tension" },
                        { id: "ex_63", name: "Pec Deck", sets: "4", reps: "15", note: "Final pump work" },
                    ]
                },
                {
                    title: "Tuesday — Back", exercises: [
                        { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8-10", note: "Vertical pull" },
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "Heavy hinge" },
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8", note: "Horizontal pull" },
                        { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "12", note: "Lat width" },
                        { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "12", note: "Back thickness" },
                        { id: "ex_21", name: "Cable Row Seated Narrow Grip", sets: "3", reps: "15", note: "Lower trap focus" },
                    ]
                },
                {
                    title: "Wednesday — Shoulders", exercises: [
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "4", reps: "6-8", note: "Heavy compound" },
                        { id: "ex_72", name: "Seated Dumbbell Shoulder Press", sets: "3", reps: "8", note: "Dumbbell variation" },
                        { id: "ex_33", name: "Dumbbell Lateral Raise", sets: "4", reps: "15", note: "Lateral delt volume" },
                        { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "Rear delts" },
                        { id: "ex_18", name: "Cable Front Raise", sets: "3", reps: "15", note: "Front delt" },
                        { id: "ex_47", name: "Lateral Raise Machine", sets: "3", reps: "15", note: "Machine finish" },
                    ]
                },
                {
                    title: "Thursday — Arms", exercises: [
                        { id: "ex_36", name: "EZ Curl", sets: "4", reps: "10", note: "Biceps mass" },
                        { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "Brachialis" },
                        { id: "ex_64", name: "Preacher Curl Barbell", sets: "3", reps: "10", note: "Strict bicep curl" },
                        { id: "ex_43", name: "Incline Bench SkullCrushers", sets: "4", reps: "8-10", note: "Heavy triceps" },
                        { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "12", note: "Triceps isolation" },
                        { id: "ex_25", name: "Crossbody Cable Triceps Extension", sets: "3", reps: "15", note: "Triceps finish" },
                    ]
                },
                {
                    title: "Friday — Legs", exercises: [
                        { id: "ex_77", name: "Squat", sets: "4", reps: "8", note: "Heavy quad compound" },
                        { id: "ex_37", name: "Front Squat", sets: "3", reps: "8", note: "Quad and anterior core" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10", note: "Hamstring emphasis" },
                        { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10-12", note: "Glute focus" },
                        { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "Quad isolation" },
                        { id: "ex_74", name: "Single Leg Leg Curl", sets: "3", reps: "15", note: "Unilateral hamstring" },
                        { id: "ex_71", name: "Seated Calf Raise Barbell", sets: "4", reps: "15", note: "Calf work" },
                    ]
                },
            ]
        }]
    },
    {
        id: "upper-lower-3day", title: "Upper / Lower (3-Day)", category: "Strength + Hypertrophy",
        badge: "⭐ Best for Beginners",
        description: "Simple and effective 3-day upper/lower split. Perfect for beginners or those with busy schedules. Each muscle group trained twice per week.",
        difficulty: "Beginner", weeks: 8, daysPerWeek: 3,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Monday — Upper", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "3", reps: "6-8", note: "Heavy horizontal push" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "6-8", note: "Heavy horizontal pull" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "8", note: "Vertical press" },
                        { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "3", reps: "10", note: "Lat work" },
                        { id: "ex_33", name: "Dumbbell Lateral Raise", sets: "2", reps: "15", note: "Delt isolation" },
                    ]
                },
                {
                    title: "Wednesday — Lower", exercises: [
                        { id: "ex_77", name: "Squat", sets: "3", reps: "6-8", note: "Heavy quad compound" },
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "Heavy hip hinge" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "3", reps: "10-12", note: "Hamstring isolation" },
                        { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "Quad isolation" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "3", reps: "15", note: "Calf work" },
                    ]
                },
                {
                    title: "Friday — Upper", exercises: [
                        { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "8-10", note: "Upper chest focus" },
                        { id: "ex_65", name: "Pull Ups", sets: "3", reps: "8-10", note: "Vertical pull" },
                        { id: "ex_72", name: "Seated Dumbbell Shoulder Press", sets: "3", reps: "10", note: "Dumbbell press" },
                        { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "12", note: "Back isolation" },
                        { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "2", reps: "15", note: "Triceps finish" },
                    ]
                },
            ]
        }]
    },
    {
        id: "full-body-4day", title: "Full Body 4x/Week", category: "Bodybuilding",
        badge: "💪 Editor's Pick",
        description: "Hit your full body twice per week with four sessions. Efficient for muscle growth and strength. Combines heavy compounds with targeted isolation.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Day 1 — Heavy", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "5", note: "Heavy compound push" },
                        { id: "ex_77", name: "Squat", sets: "4", reps: "5", note: "Heavy quad compound" },
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "Heavy hinge" },
                        { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "10", note: "Biceps accessory" },
                    ]
                },
                {
                    title: "Day 2 — Volume", exercises: [
                        { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "8-10", note: "Chest hypertrophy" },
                        { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "4", reps: "10", note: "Lat width" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "8", note: "Shoulder work" },
                        { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "Quad isolation" },
                    ]
                },
                {
                    title: "Day 3 — Heavy", exercises: [
                        { id: "ex_65", name: "Pull Ups", sets: "4", reps: "8", note: "Weighted vertical pull" },
                        { id: "ex_37", name: "Front Squat", sets: "4", reps: "6", note: "Quad and anterior core" },
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "6", note: "Heavy horizontal pull" },
                        { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "12", note: "Triceps finish" },
                    ]
                },
                {
                    title: "Day 4 — Volume", exercises: [
                        { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10", note: "Glute hypertrophy" },
                        { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "12", note: "Lat pump work" },
                        { id: "ex_72", name: "Seated Dumbbell Shoulder Press", sets: "3", reps: "10", note: "Dumbbell press" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "3", reps: "15", note: "Hamstring isolation" },
                    ]
                },
            ]
        }]
    },
    {
        id: "ppl-6day-advanced", title: "Push / Pull / Legs (6-Day)", category: "Strength + Hypertrophy",
        badge: "🔥 Most Popular",
        description: "The legendary Reddit PPL — 6 days per week with Push/Pull/Legs split. Each muscle group trained twice with high volume. Not for the faint-hearted.",
        difficulty: "Advanced", weeks: 8, daysPerWeek: 6,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Monday — Push A", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "5", note: "Heavy compound" },
                        { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "6", note: "Upper chest" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "6", note: "Compound press" },
                        { id: "ex_55", name: "Machine Chest Press", sets: "3", reps: "8-10", note: "Machine push" },
                        { id: "ex_33", name: "Dumbbell Lateral Raise", sets: "3", reps: "15", note: "Isolation" },
                        { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "15", note: "Isolation" },
                    ]
                },
                {
                    title: "Tuesday — Pull A", exercises: [
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "Heavy compound" },
                        { id: "ex_65", name: "Pull Ups", sets: "3", reps: "8-10", note: "Vertical pull" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "6", note: "Horizontal pull" },
                        { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "3", reps: "10", note: "Lat width" },
                        { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "Biceps" },
                        { id: "ex_20", name: "Cable Rear Delt Row", sets: "3", reps: "15", note: "Rear delts" },
                    ]
                },
                {
                    title: "Wednesday — Legs A", exercises: [
                        { id: "ex_77", name: "Squat", sets: "4", reps: "5", note: "Heavy quad compound" },
                        { id: "ex_41", name: "Hip Thrust", sets: "3", reps: "8", note: "Glute focus" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "8", note: "Hamstring hinge" },
                        { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "12", note: "Quad isolation" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "3", reps: "12", note: "Hamstring isolation" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "5", reps: "12", note: "Calf development" },
                    ]
                },
                {
                    title: "Thursday — Push B", exercises: [
                        { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "6", note: "Heavy incline" },
                        { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "6", note: "Triceps focus" },
                        { id: "ex_72", name: "Seated Dumbbell Shoulder Press", sets: "3", reps: "8", note: "Dumbbell variation" },
                        { id: "ex_29", name: "Dumbbell Chest Fly", sets: "3", reps: "10", note: "Chest isolation" },
                        { id: "ex_18", name: "Cable Front Raise", sets: "3", reps: "15", note: "Front delt" },
                        { id: "ex_60", name: "Overhead Cable Triceps Extension From Upper Position", sets: "3", reps: "15", note: "Long head triceps" },
                    ]
                },
                {
                    title: "Friday — Pull B", exercises: [
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "5", note: "Heavy horizontal pull" },
                        { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "4", reps: "8", note: "Heavy lat work" },
                        { id: "ex_56", name: "Machine Lat Pulldown", sets: "3", reps: "10", note: "Machine variation" },
                        { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "10", note: "Back thickness" },
                        { id: "ex_36", name: "EZ Curl", sets: "3", reps: "10", note: "Biceps mass" },
                        { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "Rear delt" },
                    ]
                },
                {
                    title: "Saturday — Legs B", exercises: [
                        { id: "ex_37", name: "Front Squat", sets: "4", reps: "6", note: "Quad focus" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "8", note: "Heavy leg press" },
                        { id: "ex_41", name: "Hip Thrust", sets: "3", reps: "10", note: "Glute pump" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "4", reps: "12", note: "Hamstring volume" },
                        { id: "ex_49", name: "Leg Extension One Leg", sets: "3", reps: "15", note: "Quad unilateral" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "5", reps: "15", note: "Calf volume" },
                    ]
                },
            ]
        }]
    },
    {
        id: "powerbuilding-5day", title: "5-Day Powerbuilding", category: "Powerbuilding",
        description: "High-frequency powerbuilding split hitting each muscle group twice per week with strength focus on main lifts and hypertrophy on accessories.",
        difficulty: "Advanced", weeks: 8, daysPerWeek: 5,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Day 1 — Heavy Upper", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "5", note: "Heavy compound 85-90% 1RM" },
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "5", note: "Heavy horizontal pull" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "6", note: "Heavy press" },
                        { id: "ex_65", name: "Pull Ups", sets: "3", reps: "8", note: "Weighted pull" },
                    ]
                },
                {
                    title: "Day 2 — Heavy Lower", exercises: [
                        { id: "ex_77", name: "Squat", sets: "4", reps: "5", note: "Heavy quad work" },
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "Heavy hinge" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "8", note: "Hamstring accessory" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "12", note: "Calf work" },
                    ]
                },
                {
                    title: "Day 3 — Volume Upper", exercises: [
                        { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "8-10", note: "Chest volume" },
                        { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "4", reps: "10", note: "Lat width" },
                        { id: "ex_72", name: "Seated Dumbbell Shoulder Press", sets: "3", reps: "10", note: "Dumbbell press" },
                        { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "12-15", note: "Triceps isolation" },
                        { id: "ex_36", name: "EZ Curl", sets: "3", reps: "12-15", note: "Biceps isolation" },
                    ]
                },
                {
                    title: "Day 4 — Volume Lower", exercises: [
                        { id: "ex_37", name: "Front Squat", sets: "4", reps: "8-10", note: "Quad and core" },
                        { id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10", note: "Glute development" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "12", note: "Quad volume" },
                        { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "Quad isolation" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "3", reps: "15", note: "Hamstring isolation" },
                    ]
                },
                {
                    title: "Day 5 — Intensity Upper", exercises: [
                        { id: "ex_24", name: "Close Grip Bench Press", sets: "4", reps: "6", note: "Triceps and chest strength" },
                        { id: "ex_56", name: "Machine Lat Pulldown", sets: "4", reps: "8", note: "Heavy lat work" },
                        { id: "ex_72", name: "Seated Dumbbell Shoulder Press", sets: "4", reps: "8", note: "Dumbbell strength" },
                        { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12", note: "Brachialis" },
                        { id: "ex_43", name: "Incline Bench SkullCrushers", sets: "3", reps: "10", note: "Triceps strength" },
                    ]
                },
            ]
        }]
    },
    {
        id: "athletic-performance", title: "Athletic Performance", category: "Strength + Hypertrophy",
        badge: "💎 Elite Performance",
        description: "For athletes who need power, speed, and conditioning. Combines strength training with explosive movements and conditioning. Train 4 days per week.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Day 1 — Lower Power", exercises: [
                        { id: "ex_77", name: "Squat", sets: "4", reps: "3", note: "Explosive, 80-85% 1RM" },
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "Heavy hinge" },
                        { id: "ex_41", name: "Hip Thrust", sets: "3", reps: "8", note: "Glute power" },
                        { id: "ex_23", name: "Calf Raise Standing", sets: "4", reps: "12", note: "Calf explosive power" },
                    ]
                },
                {
                    title: "Day 2 — Upper Power", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "3", note: "Explosive press 80-85%" },
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "5", note: "Heavy pull" },
                        { id: "ex_66", name: "Push Press", sets: "3", reps: "5", note: "Explosive overhead" },
                        { id: "ex_65", name: "Pull Ups", sets: "3", reps: "8", note: "Weighted pull" },
                    ]
                },
                {
                    title: "Day 3 — Lower Volume", exercises: [
                        { id: "ex_37", name: "Front Squat", sets: "4", reps: "6", note: "Quad volume and control" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "8", note: "Hamstring endurance" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "10", note: "Quad hypertrophy" },
                        { id: "ex_74", name: "Single Leg Leg Curl", sets: "3", reps: "12", note: "Unilateral hamstring" },
                    ]
                },
                {
                    title: "Day 4 — Upper Volume", exercises: [
                        { id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "8", note: "Upper chest volume" },
                        { id: "ex_46", name: "Lat Pulldown With Neutral Grip 1", sets: "4", reps: "10", note: "Lat width" },
                        { id: "ex_72", name: "Seated Dumbbell Shoulder Press", sets: "3", reps: "10", note: "Shoulder volume" },
                        { id: "ex_73", name: "Seated Machine Row", sets: "3", reps: "12", note: "Back thickness" },
                        { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "15", note: "Triceps finish" },
                    ]
                },
            ]
        }]
    },
    {
        id: "full-body-2x", title: "Full Body 2x/Week", category: "Bodybuilding",
        description: "Minimalist maintenance program — just 2 days per week for busy professionals or those in maintenance phase. Cover all major movement patterns.",
        difficulty: "All Levels", weeks: 12, daysPerWeek: 2,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Day 1 — Full Body A", exercises: [
                        { id: "ex_77", name: "Squat", sets: "4", reps: "6", note: "Lower compound" },
                        { id: "ex_12", name: "Bench Press", sets: "3", reps: "8", note: "Push compound" },
                        { id: "ex_65", name: "Pull Ups", sets: "3", reps: "8-10", note: "Vertical pull" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10", note: "Posterior chain" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "3", reps: "12", note: "Hamstring accessory" },
                    ]
                },
                {
                    title: "Day 2 — Full Body B", exercises: [
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "Heavy hinge" },
                        { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "8", note: "Upper push" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8", note: "Horizontal pull" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "3", reps: "8", note: "Vertical press" },
                        { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "Quad accessory" },
                    ]
                },
            ]
        }]
    },
    {
        id: "powerlifting-conjugate", title: "Conjugate Method (Westside)", category: "Powerlifting",
        description: "Westside Bar conjugate method for advanced lifters. Max effort upper/lower days and dynamic effort days. Requires reverse hyper and bands.",
        difficulty: "Advanced", weeks: 12, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Day 1 — Max Effort Lower", exercises: [
                        { id: "ex_77", name: "Squat", sets: "3", reps: "1-3", note: "Max effort, vary exercises (SSB, high bar, pause)" },
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "3-5", note: "Max effort variation" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "8", note: "Accessory strength" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "4", reps: "10", note: "Hamstring work" },
                        { id: "ex_74", name: "Single Leg Leg Curl", sets: "3", reps: "12", note: "Unilateral" },
                    ]
                },
                {
                    title: "Day 2 — Max Effort Upper", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "3", reps: "1-3", note: "Max effort, vary grips and bars" },
                        { id: "ex_42", name: "Incline Bench Press", sets: "3", reps: "3-5", note: "Max effort incline" },
                        { id: "ex_24", name: "Close Grip Bench Press", sets: "3", reps: "8", note: "Triceps strength" },
                        { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "4", reps: "12", note: "Rear delt for pressing stability" },
                        { id: "ex_79", name: "Triceps Pushdown With Rope", sets: "3", reps: "15", note: "Triceps isolation" },
                    ]
                },
                {
                    title: "Day 3 — Dynamic Effort Lower", exercises: [
                        { id: "ex_77", name: "Squat", sets: "8", reps: "3", note: "Dynamic effort @ 50-60% with speed" },
                        { id: "ex_51", name: "Leg Press", sets: "5", reps: "8", note: "Volume accessory" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10", note: "Hamstring work" },
                        { id: "ex_74", name: "Single Leg Leg Curl", sets: "3", reps: "12", note: "Unilateral" },
                    ]
                },
                {
                    title: "Day 4 — Dynamic Effort Upper", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "10", reps: "3", note: "Dynamic effort with bands/chains" },
                        { id: "ex_61", name: "Overhead Press Exercise", sets: "5", reps: "5", note: "Pressing volume" },
                        { id: "ex_56", name: "Machine Lat Pulldown", sets: "4", reps: "10", note: "Lat work" },
                        { id: "ex_39", name: "Hammer Curl", sets: "4", reps: "12", note: "Biceps for pressing balance" },
                        { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "Rear delt finish" },
                    ]
                },
            ]
        }]
    },
    {
        id: "dumbbell-only-3day", title: "Dumbbell Only 3-Day", category: "Bodybuilding",
        description: "Complete workout program using only dumbbells. Perfect for home gym or travel. Compound and isolation exercises designed for dumbbell-only training.",
        difficulty: "Beginner", weeks: 8, daysPerWeek: 3,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Day 1 — Push Focus", exercises: [
                        { id: "ex_30", name: "Dumbbell Chest Press", sets: "4", reps: "8-10", note: "Flat chest press" },
                        { id: "ex_32", name: "Dumbbell Incline Press", sets: "3", reps: "10-12", note: "Upper chest" },
                        { id: "ex_72", name: "Seated Dumbbell Shoulder Press", sets: "3", reps: "8-10", note: "Overhead press" },
                        { id: "ex_33", name: "Dumbbell Lateral Raise", sets: "3", reps: "15", note: "Lateral delt isolation" },
                        { id: "ex_52", name: "Lying Dumbbell Triceps Extension 1", sets: "3", reps: "12", note: "Triceps extension" },
                    ]
                },
                {
                    title: "Day 2 — Pull Focus", exercises: [
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8", note: "Rowing motion (requires dumbbells)" },
                        { id: "ex_65", name: "Pull Ups", sets: "3", reps: "8-12", note: "Bodyweight vertical pull" },
                        { id: "ex_39", name: "Hammer Curl", sets: "4", reps: "10", note: "Biceps" },
                        { id: "ex_68", name: "Reverse Dumbbell Flyes", sets: "3", reps: "15", note: "Rear delt" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "12", note: "Lat and chest stretch" },
                    ]
                },
                {
                    title: "Day 3 — Legs + Core", exercises: [
                        { id: "ex_34", name: "Dumbbell Lunge", sets: "3", reps: "10 each leg", note: "Bilateral leg work" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "12", note: "Use as extra leg/serratus work" },
                        { id: "ex_48", name: "Leg Curl Seated", sets: "3", reps: "12", note: "Hamstring isolation" },
                        { id: "ex_50", name: "Leg Extension Seated", sets: "3", reps: "15", note: "Quad isolation" },
                        { id: "ex_40", name: "Hanging Leg Raise", sets: "3", reps: "12", note: "Core hanging work" },
                        { id: "ex_26", name: "Crunch", sets: "3", reps: "20", note: "Core finish" },
                    ]
                },
            ]
        }]
    },

];

export const PROGRAMS_DATA = _rawPrograms.filter(p => p.id !== "DELETE_ME");