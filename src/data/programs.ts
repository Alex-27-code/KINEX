export interface Exercise { id: string; name: string; sets: string; reps: string; note?: string; }
export interface WorkoutDay { title: string; exercises: Exercise[]; }
export interface WeeklySchedule { weekLabel: string; days: WorkoutDay[]; }
export interface Program {
    id: string; title: string; description: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
    category: "Powerlifting" | "Bodybuilding" | "Powerbuilding" | "Strength + Hypertrophy";
    weeks: number; daysPerWeek: number;
    nutritionGuide?: string;
    schedule: WeeklySchedule[];
    badge?: "⭐ Best for Beginners" | "🔥 Most Popular" | "💪 Editor's Pick" | "🏆 Gold Standard" | "💎 Elite Performance";
    isPremium?: boolean;
}

const _rawPrograms: Program[] = [

    // ─── POWERLIFTING ──────────────────────────────────
    {
        id: "starting-strength", title: "Starting Strength", category: "Powerlifting",
        badge: "⭐ Best for Beginners",
        description: "The gold standard for strength. We've adjusted it for a smoother entry: start with 50% effort and focus on form.",
        difficulty: "Beginner", weeks: 8, daysPerWeek: 3,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Workout A (Mon/Fri)", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "5", note: "Start comfortable, +1-2kg" },
                        { id: "ex_12", name: "Bench Press", sets: "3", reps: "5", note: "Focus on bar path" },
                        { id: "ex_27", name: "Deadlift", sets: "1", reps: "5", note: "Keep back flat" },
                        { id: "ex_1", name: "Arnold Press", sets: "2", reps: "30s", note: "Core stability" },
                    ]
                },
                {
                    title: "Workout B (Wed)", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "5", note: "Recovery focus" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "5", note: "Small jumps in weight" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "5", note: "Control the weight" },
                        { id: "ex_2", name: "Back Extension Frontloaded", sets: "2", reps: "10", note: "Optional accessory" },
                    ]
                },
            ]
        }]
    },
    {
        id: "DELETE_ME", title: "StrongLifts 5x5 (Modified)", category: "Powerlifting",
        badge: "🔥 Most Popular",
        description: "Classic 5x5 modernized with specific percentages and increased volume. Focus on 75-85% 1RM for main lifts. Add 2.5kg to Squat/Bench/Row and 5kg to Deadlift every successful session.",
        difficulty: "Beginner", weeks: 12, daysPerWeek: 3,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Mon: Squat + Press", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "5", reps: "5", note: "Start @ 75% 1RM" },
                        { id: "ex_12", name: "Bench Press", sets: "5", reps: "5", note: "Start @ 75% 1RM" },
                        { id: "ex_7", name: "Barbell Row", sets: "5", reps: "5", note: "+2.5kg next Mon" },
                        { id: "ex_65", name: "Pull Ups", sets: "3", reps: "AMRAP", note: "Accessory" },
                    ]
                },
                {
                    title: "Wed: Squat + Deadlift", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "5", reps: "5", note: "Same weight as Monday" },
                        { id: "ex_1", name: "Arnold Press", sets: "5", reps: "5", note: "Start @ 70% 1RM" },
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "Start @ 80% 1RM, +5kg next Wed" },
                        { id: "ex_28", name: "Dips", sets: "3", reps: "AMRAP", note: "Accessory" },
                    ]
                },
                {
                    title: "Fri: Squat + Pull", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "5", reps: "5", note: "+2.5kg for next Mon" },
                        { id: "ex_12", name: "Bench Press", sets: "5", reps: "5", note: "+2.5kg for next Mon" },
                        { id: "ex_7", name: "Barbell Row", sets: "5", reps: "5", note: "+2.5kg for next Mon" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "20", note: "Core" },
                    ]
                },
            ]
        }]
    },
    {
        id: "texas-method", title: "Texas Method", category: "Powerlifting",
        description: "Intermediate program for strength. Mon: Volume (5x5 @ 75%), Wed: Recovery (2x5 @ 65%), Fri: Intensity (1x5 @ 90%). Add 2.5kg to your 5x5 and 1x5 every week.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 3,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Mon: Volume Day (75%)", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "5", reps: "5", note: "75% 1RM" },
                        { id: "ex_12", name: "Bench Press", sets: "5", reps: "5", note: "75% 1RM" },
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "75% 1RM" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10" },
                    ]
                },
                {
                    title: "Wed: Recovery Day (65%)", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "2", reps: "5", note: "65% 1RM" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "5", note: "60-65% 1RM" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8-10" },
                        { id: "ex_26", name: "Crunch", sets: "3", reps: "20" },
                    ]
                },
                {
                    title: "Fri: Intensity Day (90%)", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "1", reps: "5", note: "90% 1RM — New 5RM PR" },
                        { id: "ex_12", name: "Bench Press", sets: "1", reps: "5", note: "90% 1RM — New 5RM PR" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8", note: "Secondary press" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "15" },
                    ]
                },
            ]
        }]
    },
    {
        id: "wendler-531", title: "Wendler 5/3/1", category: "Powerlifting",
        badge: "🏆 Gold Standard",
        description: "4-week wave loading based on Training Max (TM). Week 1: 75%x5x5, Week 2: 85%x4x3, Week 3: 90%x3x1, Week 4: Deload. Add 2.5kg to upper and 5kg to lower TM after each 4-week cycle.",
        difficulty: "Intermediate", weeks: 4, daysPerWeek: 4,
        nutritionGuide: "Calculate Training Max = 90% of true 1RM. All percentages are based on Training Max.",
        schedule: [
            {
                weekLabel: "Week 1 — 75% x 5x5", days: [
                    { title: "Day 1: Squat", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "5", reps: "5", note: "75% TM" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" }, { id: "ex_26", name: "Crunch", sets: "3", reps: "20" }] },
                    { title: "Day 2: Bench", exercises: [{ id: "ex_12", name: "Bench Press", sets: "5", reps: "5", note: "75% TM" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "10" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "15" }, { id: "ex_66", name: "Push Press", sets: "3", reps: "15" }] },
                    { title: "Day 3: Deadlift", exercises: [{ id: "ex_27", name: "Deadlift", sets: "5", reps: "5", note: "75% TM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" }, { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "20" }] },
                    { title: "Day 4: OHP", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "5", reps: "5", note: "75% TM" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" }, { id: "ex_28", name: "Dips", sets: "3", reps: "AMRAP" }] },
                ]
            },
            {
                weekLabel: "Week 2 — 85% x 4x3", days: [
                    { title: "Day 1: Squat", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "4", reps: "3", note: "85% TM" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" }, { id: "ex_26", name: "Crunch", sets: "3", reps: "20" }] },
                    { title: "Day 2: Bench", exercises: [{ id: "ex_12", name: "Bench Press", sets: "4", reps: "3", note: "85% TM" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "10" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "15" }, { id: "ex_66", name: "Push Press", sets: "3", reps: "15" }] },
                    { title: "Day 3: Deadlift", exercises: [{ id: "ex_27", name: "Deadlift", sets: "4", reps: "3", note: "85% TM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" }, { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "20" }] },
                    { title: "Day 4: OHP", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "3", note: "85% TM" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" }, { id: "ex_28", name: "Dips", sets: "3", reps: "AMRAP" }] },
                ]
            },
            {
                weekLabel: "Week 3 — 90% x 3x1", days: [
                    { title: "Day 1: Squat", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "1", note: "90% TM" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "8" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10" }, { id: "ex_26", name: "Crunch", sets: "3", reps: "20" }] },
                    { title: "Day 2: Bench", exercises: [{ id: "ex_12", name: "Bench Press", sets: "3", reps: "1", note: "90% TM" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "12" }, { id: "ex_66", name: "Push Press", sets: "3", reps: "15" }] },
                    { title: "Day 3: Deadlift", exercises: [{ id: "ex_27", name: "Deadlift", sets: "3", reps: "1", note: "90% TM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" }, { id: "ex_7", name: "Barbell Row", sets: "4", reps: "6" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "20" }] },
                    { title: "Day 4: OHP", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "1", note: "90% TM" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" }, { id: "ex_28", name: "Dips", sets: "3", reps: "AMRAP" }] },
                ]
            },
            {
                weekLabel: "Week 4 — Deload", days: [
                    { title: "Day 1: Squat", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "5", note: "50% TM" }] },
                    { title: "Day 2: Bench", exercises: [{ id: "ex_12", name: "Bench Press", sets: "3", reps: "5", note: "50% TM" }] },
                    { title: "Day 3: Deadlift", exercises: [{ id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "50% TM" }] },
                    { title: "Day 4: OHP", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "5", note: "50% TM" }] },
                ]
            }
        ]
    },

    {
        id: "DELETE_ME", title: "5-Day Advanced Powerlifting", category: "Powerlifting",
        description: "High volume strength peaking. Specific percentages for main lifts (75-90%) and technical accessories. Add 2.5kg to main lifts when RPE is below 8.",
        difficulty: "Advanced", weeks: 8, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                { title: "Day 1: Squat Force", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "5", reps: "3", note: "85% 1RM" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "12" }, { id: "ex_26", name: "Crunch", sets: "3", reps: "20" }] },
                { title: "Day 2: Bench Power", exercises: [{ id: "ex_12", name: "Bench Press", sets: "5", reps: "3", note: "85% 1RM" }, { id: "ex_28", name: "Dips", sets: "3", reps: "10" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_66", name: "Push Press", sets: "3", reps: "15" }] },
                { title: "Day 3: Deadlift Pull", exercises: [{ id: "ex_27", name: "Deadlift", sets: "5", reps: "2", note: "80% 1RM" }, { id: "ex_7", name: "Barbell Row", sets: "4", reps: "6" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" }, { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12" }] },
                { title: "Day 4: Bench Technical", exercises: [{ id: "ex_42", name: "Incline Bench Press", sets: "4", reps: "8", note: "70% 1RM" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "15" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" }] },
                { title: "Day 5: Squat Technical", exercises: [{ id: "ex_51", name: "Leg Press", sets: "4", reps: "12", note: "Hypertrophy" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "20" }] },
            ]
        }]
    },
    {
        id: "DELETE_ME", title: "6-Day High Frequency Power", category: "Powerlifting",
        description: "Extreme frequency for elite trainees. Main lifts hit 3x per week @ 70-85% intensity. High recovery capacity required.",
        difficulty: "Advanced", weeks: 6, daysPerWeek: 6,
        schedule: [{
            weekLabel: "Standard Week", days: [
                { title: "Mon: Squat + Upper", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "5", reps: "5", note: "75% 1RM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" }, { id: "ex_28", name: "Dips", sets: "3", reps: "10" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" }] },
                { title: "Tue: Bench + Rows", exercises: [{ id: "ex_12", name: "Bench Press", sets: "5", reps: "5", note: "75% 1RM" }, { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "12" }, { id: "ex_66", name: "Push Press", sets: "3", reps: "15" }] },
                { title: "Wed: Deadlift + Core", exercises: [{ id: "ex_27", name: "Deadlift", sets: "3", reps: "3", note: "80% 1RM" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "20" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" }, { id: "ex_26", name: "Crunch", sets: "3", reps: "20" }] },
                { title: "Thu: Squat (Light)", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "8", note: "65% 1RM" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "12" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "15" }] },
                { title: "Fri: Bench (Volume)", exercises: [{ id: "ex_12", name: "Bench Press", sets: "5", reps: "10", note: "65% 1RM" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "15" }, { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12" }] },
                { title: "Sat: Deadlift (Technique)", exercises: [{ id: "ex_27", name: "Deadlift", sets: "5", reps: "3", note: "70% 1RM" }, { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "AMRAP" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "15" }] },
            ]
        }]
    },

    // ─── BODYBUILDING ──────────────────────────────────
    {
        id: "ppl-3day", title: "Push / Pull / Legs (3-Day)", category: "Bodybuilding",
        badge: "⭐ Best for Beginners",
        description: "Classic PPL in 3 sessions per week. Each muscle group trained once with full volume.",
        difficulty: "Beginner", weeks: 8, daysPerWeek: 3,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Mon: Push", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "8-10" },
                        { id: "ex_12", name: "Bench Press", sets: "3", reps: "10-12" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "15" },
                        { id: "ex_66", name: "Push Press", sets: "3", reps: "12-15" },
                        { id: "ex_28", name: "Dips", sets: "2", reps: "AMRAP" },
                    ]
                },
                {
                    title: "Wed: Pull", exercises: [
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5" },
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8-10" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "10-12" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" },
                        { id: "ex_39", name: "Hammer Curl", sets: "2", reps: "15" },
                    ]
                },
                {
                    title: "Fri: Legs", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "4", reps: "8-10" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10-12" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "12-15" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" },
                        { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "15" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15-20" },
                    ]
                },
            ]
        }]
    },
    {
        id: "DELETE_ME", title: "3-Day Hypertrophy Split", category: "Bodybuilding",
        description: "Three full-body focused sessions per week with heavy compounds and isolation work.",
        difficulty: "Intermediate", weeks: 6, daysPerWeek: 3,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Day 1: Chest + Triceps", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "8-10" },
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "10" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12-15" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-12" },
                        { id: "ex_66", name: "Push Press", sets: "3", reps: "15" },
                    ]
                },
                {
                    title: "Day 2: Back + Biceps", exercises: [
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "10-12" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "10-12" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "12" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10-12" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "2", reps: "15" },
                    ]
                },
                {
                    title: "Day 3: Shoulders + Legs", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "4", reps: "8-10" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "12-15" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10" },
                        { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8-10" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15-20" },
                    ]
                },
            ]
        }]
    },
    {
        id: "bodybuilding-4day", title: "4-Day Bro Split", category: "Bodybuilding",
        badge: "🔥 Most Popular",
        description: "Classic bodybuilding split. One muscle group per day, maximum volume and isolation.",
        difficulty: "Intermediate", weeks: 6, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Mon: Chest + Triceps", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "8-12" },
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "10-12" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12-15" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15-20" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-12" },
                        { id: "ex_66", name: "Push Press", sets: "3", reps: "15" },
                        { id: "ex_28", name: "Dips", sets: "2", reps: "AMRAP" },
                    ]
                },
                {
                    title: "Tue: Back + Biceps", exercises: [
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "4", reps: "AMRAP" },
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8-10" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "10-12" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "12" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "10-12" },
                        { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12-15" },
                    ]
                },
                {
                    title: "Thu: Shoulders", exercises: [
                        { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8-10" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15-20" },
                        { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "2", reps: "15" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "20" },
                    ]
                },
                {
                    title: "Fri: Legs", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "5", reps: "8-12" },
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "4", reps: "10-12" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "4", reps: "10" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "15-20" },
                        { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "15-20" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12-15" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "5", reps: "15-20" },
                    ]
                },
            ]
        }]
    },
    {
        id: "DELETE_ME", title: "CBum 6-Day Split", category: "Bodybuilding",
        description: "Training split of 5x Classic Physique Olympia champion Chris Bumstead. High volume, extreme isolation.",
        difficulty: "Advanced", weeks: 8, daysPerWeek: 6,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Mon: Chest", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "8-12" },
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "10-12" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12-15" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15-20" },
                        { id: "ex_66", name: "Push Press", sets: "2", reps: "AMRAP" },
                    ]
                },
                {
                    title: "Tue: Back", exercises: [
                        { id: "ex_27", name: "Deadlift", sets: "4", reps: "5-8" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "4", reps: "AMRAP" },
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8-12" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "10-15" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "12-15" },
                    ]
                },
                {
                    title: "Wed: Shoulders", exercises: [
                        { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8-12" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15-20" },
                        { id: "ex_19", name: "Cable Lateral Raise", sets: "3", reps: "15-20" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "20" },
                    ]
                },
                {
                    title: "Thu: Arms", exercises: [
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "10-12" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12-15" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12-15" },
                        { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10-12" },
                        { id: "ex_66", name: "Push Press", sets: "3", reps: "15-20" },
                        { id: "ex_28", name: "Dips", sets: "3", reps: "AMRAP" },
                    ]
                },
                {
                    title: "Fri: Legs (Quads)", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "5", reps: "8-12" },
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "4", reps: "10-15" },
                        { id: "ex_51", name: "Leg Press", sets: "4", reps: "15-20" },
                        { id: "ex_2", name: "Back Extension Frontloaded", sets: "4", reps: "15-20" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "5", reps: "15-20" },
                    ]
                },
                {
                    title: "Sat: Legs (Hamstrings)", exercises: [
                        { id: "ex_70", name: "Romanian Deadlift", sets: "4", reps: "10-12" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "12-15" },
                        { id: "ex_34", name: "Dumbbell Lunge", sets: "3", reps: "12 each" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "20" },
                    ]
                },
            ]
        }]
    },

    {
        id: "DELETE_ME", title: "5-Day UL/PPL Split", category: "Bodybuilding",
        description: "Comprehensive hypertrophy split: Upper-Lower strength foundation followed by a PPL hypertrophy block. Target every muscle group twice for maximum growth. Follow 70-80% 1RM on strength days.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                { title: "Day 1: Upper Strength", exercises: [{ id: "ex_12", name: "Bench Press", sets: "3", reps: "5", note: "80% 1RM" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "5", note: "80% 1RM" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "6-8" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10" }] },
                { title: "Day 2: Lower Strength", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "5", note: "80% 1RM" }, { id: "ex_27", name: "Deadlift", sets: "2", reps: "5", note: "80% 1RM" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "8" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "10" }, { id: "ex_26", name: "Crunch", sets: "3", reps: "15" }] },
                { title: "Day 3: Push Hypertrophy", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-12" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15" }, { id: "ex_66", name: "Push Press", sets: "3", reps: "12-15" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" }, { id: "ex_28", name: "Dips", sets: "3", reps: "AMRAP" }] },
                { title: "Day 4: Pull Hypertrophy", exercises: [{ id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "10-12" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "12" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12-15" }, { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "15" }] },
                { title: "Day 5: Legs Hypertrophy", exercises: [{ id: "ex_51", name: "Leg Press", sets: "3", reps: "12-15" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "15" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15-20" }, { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "20" }] },
            ]
        }]
    },

    // ─── POWERBUILDING ─────────────────────────────────
    {
        id: "powerbuilding-3day", title: "3-Day Powerbuilding", category: "Powerbuilding",
        description: "Heavy compound lifts for strength + accessory work for size. Best bang for buck in 3 days.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 3,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Day 1: Push", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "5", reps: "3-5", note: "Work up to heavy top set" },
                        { id: "ex_12", name: "Bench Press", sets: "3", reps: "8-10" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8-10" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "15" },
                        { id: "ex_66", name: "Push Press", sets: "3", reps: "15" },
                        { id: "ex_28", name: "Dips", sets: "2", reps: "AMRAP" },
                    ]
                },
                {
                    title: "Day 2: Pull", exercises: [
                        { id: "ex_27", name: "Deadlift", sets: "5", reps: "3-5", note: "Work up to heavy top set" },
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "6-8" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "10-12" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" },
                        { id: "ex_39", name: "Hammer Curl", sets: "2", reps: "15" },
                    ]
                },
                {
                    title: "Day 3: Legs", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "5", reps: "3-5", note: "Work up to heavy top set" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "12" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" },
                        { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "15" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15" },
                    ]
                },
            ]
        }]
    },
    {
        id: "DELETE_ME", title: "One Lift Focus Block", category: "Powerbuilding",
        badge: "💪 Editor's Pick",
        description: "Intensive 5-week block with undulating daily intensity. Mon: 75% (Volume), Wed: 85% (Strength), Fri: 90% (Peak). Increase intensity by +2.5% every week. Week 5 is for full recovery.",
        difficulty: "Intermediate", weeks: 5, daysPerWeek: 3,
        schedule: [
            {
                weekLabel: "Week 1 — Undulating Wave (Base)", days: [
                    { title: "Day 1 (75%)", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "5", reps: "5", note: "75% 1RM" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "10" }, { id: "ex_12", name: "Bench Press", sets: "3", reps: "10" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "15" }] },
                    { title: "Day 2 (85%)", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "3", note: "85% 1RM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }] },
                    { title: "Day 3 (90%)", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "1", note: "90% 1RM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "12" }, { id: "ex_28", name: "Dips", sets: "3", reps: "AMRAP" }, { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10" }] },
                ]
            },
            {
                weekLabel: "Week 2 — Undulating Wave (+2.5%)", days: [
                    { title: "Day 1 (77.5%)", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "5", reps: "5", note: "77.5% 1RM" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "10" }, { id: "ex_12", name: "Bench Press", sets: "3", reps: "10" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "15" }] },
                    { title: "Day 2 (87.5%)", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "3", note: "87.5% 1RM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }] },
                    { title: "Day 3 (92.5%)", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "1", note: "92.5% 1RM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "12" }, { id: "ex_28", name: "Dips", sets: "3", reps: "AMRAP" }, { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10" }] },
                ]
            },
            {
                weekLabel: "Week 3 — Undulating Wave (+5%)", days: [
                    { title: "Day 1 (80%)", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "5", reps: "5", note: "80% 1RM" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8" }, { id: "ex_12", name: "Bench Press", sets: "3", reps: "8" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" }] },
                    { title: "Day 2 (90%)", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "3", note: "90% 1RM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10" }] },
                    { title: "Day 3 (95%)", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "1", note: "95% 1RM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "10" }, { id: "ex_28", name: "Dips", sets: "3", reps: "AMRAP" }, { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "8" }] },
                ]
            },
            {
                weekLabel: "Week 4 — Peak Wave (+7.5%)", days: [
                    { title: "Day 1 (82.5%)", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "5", reps: "5", note: "82.5% 1RM" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8" }, { id: "ex_12", name: "Bench Press", sets: "3", reps: "8" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" }] },
                    { title: "Day 2 (92.5%)", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "2", note: "92.5% 1RM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10" }] },
                    { title: "Day 3 (97.5% PR)", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "1", reps: "1", note: "97.5%+ 1RM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "10" }, { id: "ex_28", name: "Dips", sets: "3", reps: "AMRAP" }, { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "8" }] },
                ]
            },
            {
                weekLabel: "Week 5 — Active Recovery", days: [
                    { title: "Day 1", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "5", note: "50% 1RM" }, { id: "ex_26", name: "Crunch", sets: "3", reps: "20" }] },
                    { title: "Day 2", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "5", note: "50% 1RM" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "60s" }] },
                    { title: "Day 3", exercises: [{ id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "50% 1RM" }, { id: "ex_1", name: "Arnold Press", sets: "1", reps: "15 min" }] },
                ]
            }
        ]
    },
    {
        id: "powerbuilding-4day", title: "4-Day Powerbuilding", category: "Powerbuilding",
        description: "Upper/Lower split with heavy strength days and hypertrophy-focused volume days.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Mon: Upper Strength", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "5", reps: "3", note: "Heavy" },
                        { id: "ex_7", name: "Barbell Row", sets: "5", reps: "3", note: "Heavy" },
                        { id: "ex_1", name: "Arnold Press", sets: "4", reps: "6" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "10" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" },
                    ]
                },
                {
                    title: "Tue: Lower Strength", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "5", reps: "3", note: "Heavy" },
                        { id: "ex_27", name: "Deadlift", sets: "4", reps: "3", note: "Heavy" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "8" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15" },
                    ]
                },
                {
                    title: "Thu: Upper Hypertrophy", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "10" },
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "10" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "15" },
                        { id: "ex_66", name: "Push Press", sets: "3", reps: "15" },
                    ]
                },
                {
                    title: "Fri: Lower Hypertrophy", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "4", reps: "10" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "4", reps: "10" },
                        { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "15" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "20" },
                    ]
                },
            ]
        }]
    },

    {
        id: "DELETE_ME", title: "5-Day PHAT (Advanced)", category: "Powerbuilding",
        badge: "🏆 Gold Standard",
        description: "Power Hypertrophy Adaptive Training. Two days of heavy power (RPE 8-9) followed by three days of hypertrophy (RPE 7-8). Ideal for strength and size.",
        difficulty: "Advanced", weeks: 12, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                { title: "Day 1: Upper Power", exercises: [{ id: "ex_12", name: "Bench Press", sets: "3", reps: "5", note: "80-85% 1RM" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "5", note: "85% 1RM" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "6", note: "75% 1RM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "6-8" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "8" }] },
                { title: "Day 2: Lower Power", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "5", note: "80-85% 1RM" }, { id: "ex_27", name: "Deadlift", sets: "2", reps: "5", note: "80% 1RM" }, { id: "ex_51", name: "Leg Press", sets: "2", reps: "10" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "8" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "10" }] },
                { title: "Day 3: Chest/Arms Hyper", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "15" }, { id: "ex_66", name: "Push Press", sets: "3", reps: "15" }, { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12" }] },
                { title: "Day 4: Back/Shoulders Hyper", exercises: [{ id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "12" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "12" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "15" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "20" }] },
                { title: "Day 5: Lower Hypertrophy", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "12" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "15" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "15" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "20" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "20" }] },
            ]
        }]
    },
    {
        id: "DELETE_ME", title: "6-Day Power PPL", category: "Powerbuilding",
        description: "Push/Pull/Legs split with a Heavy/Light wave. Smash PRs (85-90%) in the first half of the week, build size in the second (70%). Follow progressive overload: +2.5kg per week.",
        difficulty: "Advanced", weeks: 8, daysPerWeek: 6,
        schedule: [{
            weekLabel: "Standard Week", days: [
                { title: "Day 1: Heavy Push", exercises: [{ id: "ex_12", name: "Bench Press", sets: "5", reps: "3-5", note: "85% 1RM" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "5", note: "80% 1RM" }, { id: "ex_28", name: "Dips", sets: "3", reps: "8-10" }, { id: "ex_66", name: "Push Press", sets: "3", reps: "12" }] },
                { title: "Day 2: Heavy Pull", exercises: [{ id: "ex_27", name: "Deadlift", sets: "3", reps: "3", note: "85% 1RM" }, { id: "ex_7", name: "Barbell Row", sets: "4", reps: "6", note: "80% 1RM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "8-10" }] },
                { title: "Day 3: Heavy Legs", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "5", reps: "3-5", note: "85% 1RM" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "8" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "12" }] },
                { title: "Day 4: Hypertrophy Push", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "12" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_66", name: "Push Press", sets: "3", reps: "15" }] },
                { title: "Day 5: Hypertrophy Pull", exercises: [{ id: "ex_35", name: "Dumbbell Pullover", sets: "4", reps: "12" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "15" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "12" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "15" }] },
                { title: "Day 6: Hypertrophy Legs", exercises: [{ id: "ex_51", name: "Leg Press", sets: "4", reps: "15" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "20" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "15" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "15" }] },
            ]
        }]
    },
    {
        id: "DELETE_ME", title: "6-Day Elite Powerbuilding", category: "Powerbuilding",
        badge: "💎 Elite Performance",
        description: "Based on the 760kg Total Prep. 6-day split focusing on RPE (Rate of Perceived Exertion) and technical mastery. Balanced mix of high-volume main lifts and target accessory work.",
        difficulty: "Advanced", weeks: 6, daysPerWeek: 6,
        schedule: [{
            weekLabel: "Standard Week", days: [
                { title: "Day 1: Squat / Lower Body", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3-5", reps: "4-6", note: "75-83% 1RM / RPE 7" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10-12" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12-15" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15" }] },
                { title: "Day 2: Bench / Upper Body", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3-5", reps: "4-6", note: "75-83% 1RM / RPE 7" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "AMRAP" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10-15" }, { id: "ex_66", name: "Push Press", sets: "3", reps: "15" }] },
                { title: "Day 3: Deadlift / Back", exercises: [{ id: "ex_27", name: "Deadlift", sets: "3-5", reps: "4-6", note: "75-83% 1RM / RPE 7" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "6-8", note: "Horizontal Row" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "10-15", note: "Vertical Row" }, { id: "ex_15", name: "Cable Crunch", sets: "3", reps: "15-20" }] },
                { title: "Day 4: Shoulders & Arms", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "6-8" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "10-15" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-15" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "6-8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-12" }] },
                { title: "Day 5: Technical Practice", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "6-7", note: "70% 1RM / RPE 6" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "6-7", note: "70% 1RM / No Leg Drive" }, { id: "ex_65", name: "Pull Ups", sets: "3", reps: "AMRAP" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "20" }] },
                { title: "Day 6: Heavy Intensity", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "1-4", note: "Peak Intensity" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "1-4", note: "Peak Intensity" }, { id: "ex_27", name: "Deadlift", sets: "1", reps: "1-4", note: "Peak Intensity Target" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "2", reps: "10-15" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "2", reps: "10-15" }] },
            ]
        }]
    },

    // ─── STRENGTH + HYPERTROPHY ────────────────────────
    {
        id: "upper-lower-beginner", title: "Upper / Lower Split (Beginner)", category: "Strength + Hypertrophy",
        badge: "⭐ Best for Beginners",
        description: "Train every muscle group twice per week. Perfect step up from 3-day programs.",
        difficulty: "Beginner", weeks: 6, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Mon: Upper A (Strength)", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "5" },
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "5" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "2", reps: "12" },
                        { id: "ex_66", name: "Push Press", sets: "2", reps: "12" },
                    ]
                },
                {
                    title: "Tue: Lower A (Strength)", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "4", reps: "5" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "8" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "10" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "15" },
                    ]
                },
                {
                    title: "Thu: Upper B (Hypertrophy)", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "3", reps: "10" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "10" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "15" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "10" },
                        { id: "ex_39", name: "Hammer Curl", sets: "2", reps: "12" },
                        { id: "ex_28", name: "Dips", sets: "2", reps: "AMRAP" },
                    ]
                },
                {
                    title: "Fri: Lower B (Hypertrophy)", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "10" },
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "5" },
                        { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "12" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "15" },
                    ]
                },
            ]
        }]
    },
    {
        id: "upper-lower-intermediate", title: "Upper / Lower Split (Intermediate)", category: "Strength + Hypertrophy",
        badge: "🔥 Most Popular",
        description: "Higher volume Upper/Lower with wave loading on main lifts. Best intermediate program for strength and size.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 4,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Mon: Upper Strength", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "4-6" },
                        { id: "ex_7", name: "Barbell Row", sets: "4", reps: "4-6" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "6-8" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10-12" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-12" },
                    ]
                },
                {
                    title: "Tue: Lower Strength", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "4", reps: "4-6" },
                        { id: "ex_27", name: "Deadlift", sets: "3", reps: "4-6" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "8-10" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15" },
                    ]
                },
                {
                    title: "Thu: Upper Hypertrophy", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "8-12" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "4", reps: "8-12" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" },
                        { id: "ex_66", name: "Push Press", sets: "3", reps: "15" },
                        { id: "ex_28", name: "Dips", sets: "2", reps: "AMRAP" },
                    ]
                },
                {
                    title: "Fri: Lower Hypertrophy", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "4", reps: "10-12" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "4", reps: "10" },
                        { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "12-15" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" },
                        { id: "ex_34", name: "Dumbbell Lunge", sets: "3", reps: "10 each" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "20" },
                    ]
                },
            ]
        }]
    },
    {
        id: "ppl-6day", title: "Reddit PPL (6-Day)", category: "Strength + Hypertrophy",
        badge: "🏆 Gold Standard",
        description: "Legendary Reddit PPL: strength progression on main lifts + bodybuilding accessories. Trusted by hundreds of thousands.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 6,
        schedule: [{
            weekLabel: "Standard Week", days: [
                {
                    title: "Mon: Push Strength", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "3-5", note: "+2.5 kg when you hit all 5 reps" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "6-8" },
                        { id: "ex_12", name: "Bench Press", sets: "3", reps: "8-12" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "15-20" },
                        { id: "ex_66", name: "Push Press", sets: "3", reps: "10-15" },
                        { id: "ex_28", name: "Dips", sets: "3", reps: "AMRAP" },
                    ]
                },
                {
                    title: "Tue: Pull Strength", exercises: [
                        { id: "ex_27", name: "Deadlift", sets: "4", reps: "3-5", note: "+5 kg when you hit all 5 reps" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "6-8" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "AMRAP" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10-15" },
                        { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "10-15" },
                    ]
                },
                {
                    title: "Wed: Legs Strength", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "4", reps: "3-5", note: "+2.5 kg when you hit all 5 reps" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "6-8" },
                        { id: "ex_51", name: "Leg Press", sets: "3", reps: "10-15" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10-15" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "5", reps: "8-12" },
                    ]
                },
                {
                    title: "Thu: Push Hypertrophy", exercises: [
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "10-12" },
                        { id: "ex_12", name: "Bench Press", sets: "4", reps: "10-12" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15-20" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15-20" },
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-15" },
                    ]
                },
                {
                    title: "Fri: Pull Hypertrophy", exercises: [
                        { id: "ex_1", name: "Arnold Press", sets: "3", reps: "AMRAP" },
                        { id: "ex_35", name: "Dumbbell Pullover", sets: "4", reps: "10-12" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "10-15" },
                        { id: "ex_7", name: "Barbell Row", sets: "3", reps: "10-15" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10-15" },
                    ]
                },
                {
                    title: "Sat: Legs Hypertrophy", exercises: [
                        { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "4", reps: "10-12" },
                        { id: "ex_51", name: "Leg Press", sets: "4", reps: "10-15" },
                        { id: "ex_70", name: "Romanian Deadlift", sets: "4", reps: "10-12" },
                        { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "15-20" },
                        { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "15-20" },
                        { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "5", reps: "15-20" },
                    ]
                },
            ]
        }]
    },
    {
        id: "intermediate-4day-cycle", title: "4-Day Intermediate Cycle", category: "Powerlifting",
        description: "8-week linear progression wave. Gradually tapering reps from 5 to 2 while increasing intensity, ending in a 1RM test.",
        difficulty: "Intermediate", weeks: 8, daysPerWeek: 4,
        schedule: [
            {
                weekLabel: "Week 1", days: [
                    { title: "Day 1: Heavy Bench", exercises: [{ id: "ex_12", name: "Bench Press", sets: "4", reps: "5", note: "72.5% 1RM" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8-12", note: "Medium" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8", note: "Light" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "2", reps: "8-12", note: "Light" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "2", reps: "8-12", note: "Medium" }] },
                    { title: "Day 2: Heavy Squat", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "4", reps: "5", note: "72.5% 1RM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "8-12", note: "Light" }, { id: "ex_27", name: "Deadlift", sets: "4", reps: "5", note: "80% 1RM" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8-12", note: "Medium" }] },
                    { title: "Day 3: Heavy OHP", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "5", note: "42.5% 1RM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "8-12", note: "Light" }, { id: "ex_12", name: "Bench Press", sets: "3", reps: "8", note: "Medium (60% 1RM)" }, { id: "ex_7", name: "Barbell Row", sets: "2", reps: "8-12", note: "Medium" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "2", reps: "8-12", note: "Medium" }] },
                    { title: "Day 4: Heavy Deadlift", exercises: [{ id: "ex_27", name: "Deadlift", sets: "4", reps: "5", note: "92.5% 1RM (Heavy)" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "2", reps: "8-12", note: "Medium" }, { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "8", note: "Medium (60% 1RM)" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8-12", note: "Light" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "8-12", note: "Light" }] }
                ]
            },
            {
                weekLabel: "Week 4", days: [
                    { title: "Day 1: Heavy Bench", exercises: [{ id: "ex_12", name: "Bench Press", sets: "4", reps: "5", note: "80% 1RM" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8-12", note: "Medium" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8", note: "Light" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "2", reps: "8-12", note: "Light" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "2", reps: "8-12", note: "Medium" }] },
                    { title: "Day 2: Heavy Squat", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "4", reps: "5", note: "80% 1RM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "8-12", note: "Light" }, { id: "ex_27", name: "Deadlift", sets: "4", reps: "5", note: "85% 1RM" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8-12", note: "Medium" }] },
                    { title: "Day 3: Heavy OHP", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "5", note: "50% 1RM" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "8-12", note: "Light" }, { id: "ex_12", name: "Bench Press", sets: "3", reps: "8", note: "Medium (65% 1RM)" }, { id: "ex_7", name: "Barbell Row", sets: "2", reps: "8-12", note: "Medium" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "2", reps: "8-12", note: "Medium" }] },
                    { title: "Day 4: Heavy Deadlift", exercises: [{ id: "ex_27", name: "Deadlift", sets: "4", reps: "5", note: "105% 1RM (Heavy)" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "2", reps: "8-12", note: "Medium" }, { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "8", note: "Medium (65% 1RM)" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8-12", note: "Light" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "8-12", note: "Light" }] }
                ]
            },
            {
                weekLabel: "Week 8 (Test)", days: [
                    { title: "Day 1", exercises: [{ id: "ex_12", name: "Bench Press", sets: "1", reps: "1", note: "Test 1RM" }] },
                    { title: "Day 2", exercises: [{ id: "ex_77", name: "Squat", sets: "1", reps: "1", note: "Test 1RM" }] },
                    { title: "Day 3", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "1", reps: "1", note: "Test 1RM" }] },
                    { title: "Day 4", exercises: [{ id: "ex_27", name: "Deadlift", sets: "1", reps: "1", note: "Test 1RM" }] }
                ]
            }
        ]
    },
    {
        id: "beginner-2x2", title: "Beginner Level 2x2 Full Body", category: "Bodybuilding",
        badge: "⭐ Best for Beginners",
        description: "4-week undulating program, alternating heavy and light/medium days for a balanced full-body burn twice a week.",
        difficulty: "Beginner", weeks: 4, daysPerWeek: 2,
        schedule: [
            {
                weekLabel: "Block 1", days: [
                    { title: "Workout 1 (Lower/Shoulders)", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "6-8", note: "Medium" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8-12", note: "Medium" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "6-8", note: "Light" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "12-15", note: "Light" }, { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "6-8", note: "Light" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "4", reps: "8-12", note: "Heavy" }] },
                    { title: "Workout 2 (Chest/Back/Arms)", exercises: [{ id: "ex_12", name: "Bench Press", sets: "3", reps: "8-12", note: "Medium" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "8-12", note: "Medium" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "8-12", note: "Light" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8-12", note: "Light" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8-12", note: "Light" }, { id: "ex_66", name: "Push Press", sets: "4", reps: "8-12", note: "Heavy" }] }
                ]
            },
            {
                weekLabel: "Block 2", days: [
                    { title: "Workout 1 (Lower/Shoulders)", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "4", reps: "6-8", note: "Heavy" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8-12", note: "Heavy" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "6-8", note: "Light" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "12-15", note: "Light" }, { id: "ex_70", name: "Romanian Deadlift", sets: "4", reps: "6-8", note: "Heavy" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "8-12", note: "Medium" }] },
                    { title: "Workout 2 (Chest/Back/Arms)", exercises: [{ id: "ex_12", name: "Bench Press", sets: "4", reps: "8-12", note: "Heavy" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "4", reps: "8-12", note: "Heavy" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "8-12", note: "Light" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8-12", note: "Light" }, { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8-12", note: "Heavy" }, { id: "ex_66", name: "Push Press", sets: "3", reps: "8-12", note: "Medium" }] }
                ]
            }
        ]
    },
    {
        id: "heavy-3day-bb", title: "Heavy 3-Day Bodybuilding", category: "Bodybuilding",
        description: "Classic 3-day split: Push/Pull heavy mix. Week by week volume increases with heavy weights.",
        difficulty: "Advanced", weeks: 4, daysPerWeek: 3,
        schedule: [
            {
                weekLabel: "Week 1", days: [
                    { title: "Monday: Chest/Back/Arms", exercises: [{ id: "ex_12", name: "Bench Press", sets: "5", reps: "8-12", note: "Heavy" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "5", reps: "8-12", note: "Medium" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8-12", note: "Light" }, { id: "ex_1", name: "Arnold Press", sets: "5", reps: "8-12", note: "Medium" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "5", reps: "8-12", note: "Medium" }, { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12-15", note: "Light" }] },
                    { title: "Wednesday: Quads/Shoulders", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "5", reps: "6-8", note: "Heavy" }, { id: "ex_1", name: "Arnold Press", sets: "5", reps: "6-8", note: "Heavy" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "8-12", note: "Medium" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "8-12", note: "Medium" }, { id: "ex_1", name: "Arnold Press", sets: "5", reps: "8-12", note: "Heavy" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "8-12", note: "Medium" }] },
                    { title: "Friday: Chest/Back/Calves", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "6-8", note: "Light" }, { id: "ex_12", name: "Bench Press", sets: "5", reps: "8-12", note: "Heavy" }, { id: "ex_7", name: "Barbell Row", sets: "5", reps: "8-12", note: "Medium" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12-15", note: "Light" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "12-15", note: "Light" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "8-12", note: "Medium" }] }
                ]
            },
            {
                weekLabel: "Week 2", days: [
                    { title: "Monday", exercises: [{ id: "ex_12", name: "Bench Press", sets: "7", reps: "8-12", note: "Heavy" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "7", reps: "8-12", note: "Heavy" }, { id: "ex_1", name: "Arnold Press", sets: "5", reps: "8-12", note: "Medium" }, { id: "ex_1", name: "Arnold Press", sets: "5", reps: "8-12", note: "Medium" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "5", reps: "8-12", note: "Medium" }, { id: "ex_39", name: "Hammer Curl", sets: "4", reps: "12-15", note: "Light" }] },
                    { title: "Wednesday", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "5", reps: "6-8", note: "Medium" }, { id: "ex_1", name: "Arnold Press", sets: "7", reps: "6-8", note: "Heavy" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "6", reps: "8-12", note: "Heavy" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "5", reps: "8-12", note: "Medium" }, { id: "ex_1", name: "Arnold Press", sets: "5", reps: "8-12", note: "Heavy" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "5", reps: "8-12", note: "Medium" }] },
                    { title: "Friday", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "6-8", note: "Light" }, { id: "ex_12", name: "Bench Press", sets: "7", reps: "8-12", note: "Heavy" }, { id: "ex_7", name: "Barbell Row", sets: "7", reps: "8-12", note: "Heavy" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "12-15", note: "Medium" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "5", reps: "12-15", note: "Medium" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "5", reps: "8-12", note: "Medium" }] }
                ]
            }
        ]
    },
    {
        id: "heavy-2x2-bb", title: "Men's Heavy 2x2 Bodybuilding", category: "Bodybuilding",
        description: "Intense 4-day (2 on, 1 off) style or 2x/week heavy volume emphasizing absolute load.",
        difficulty: "Advanced", weeks: 4, daysPerWeek: 4,
        schedule: [
            {
                weekLabel: "Block 1", days: [
                    { title: "Workout 1", exercises: [{ id: "ex_12", name: "Bench Press", sets: "8", reps: "8-12", note: "Heavy" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "6-8", note: "Medium" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "6-8", note: "Medium" }, { id: "ex_1", name: "Arnold Press", sets: "6", reps: "8-12", note: "Heavy" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "8", reps: "8-12", note: "Heavy" }] },
                    { title: "Workout 2", exercises: [{ id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "8-12", note: "Medium" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8-12", note: "Medium" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "8-12", note: "Medium" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "6", reps: "8-12", note: "Heavy" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "6", reps: "12-15", note: "Heavy" }] },
                    { title: "Workout 3", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "8-12", note: "Medium" }, { id: "ex_1", name: "Arnold Press", sets: "8", reps: "6-8", note: "Heavy" }, { id: "ex_1", name: "Arnold Press", sets: "8", reps: "6-8", note: "Heavy" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8-12", note: "Medium" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "4", reps: "8-12", note: "Medium" }] },
                    { title: "Workout 4", exercises: [{ id: "ex_3", name: "Barbell Biceps Curl", sets: "6", reps: "8-12", note: "Heavy" }, { id: "ex_1", name: "Arnold Press", sets: "6", reps: "8-12", note: "Heavy" }, { id: "ex_39", name: "Hammer Curl", sets: "6", reps: "8-12", note: "Heavy" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "8-12", note: "Medium" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "12-15", note: "Medium" }] }
                ]
            }
        ]
    },
    {
        id: "5day-gym-split", title: "5x Gym Per Week Split", category: "Bodybuilding",
        badge: "🔥 Most Popular",
        description: "Classic 5-day split hitting everything effectively. Mon: Chest/Tri/Shoulder, Tue: Back/Bi/Forearm, Wed: Leg/Core, Thu: Chest/Tri/Shoulder, Fri: Back/Bi/Forearm.",
        difficulty: "All Levels", weeks: 4, daysPerWeek: 4,
        schedule: [
            {
                weekLabel: "Standard Week", days: [
                    { title: "Monday: Chest, Triceps, Shoulders", exercises: [{ id: "ex_12", name: "Bench Press", sets: "4", reps: "8-12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8-12" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-12" }, { id: "ex_66", name: "Push Press", sets: "3", reps: "15" }] },
                    { title: "Tuesday: Back, Biceps, Forearms", exercises: [{ id: "ex_35", name: "Dumbbell Pullover", sets: "4", reps: "10-12" }, { id: "ex_7", name: "Barbell Row", sets: "4", reps: "8-10" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10-12" }, { id: "ex_39", name: "Hammer Curl", sets: "3", reps: "12-15" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "15-20" }] },
                    { title: "Wednesday: Legs and Core", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "4", reps: "8-10" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10-15" }, { id: "ex_70", name: "Romanian Deadlift", sets: "3", reps: "10-12" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "15" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "20" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "60s" }] },
                    { title: "Thursday: Chest, Triceps, Shoulders", exercises: [{ id: "ex_12", name: "Bench Press", sets: "4", reps: "8-12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "15" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12-15" }] },
                    { title: "Friday: Back, Biceps, Forearms", exercises: [{ id: "ex_65", name: "Pull Ups", sets: "4", reps: "AMRAP" }, { id: "ex_7", name: "Barbell Row", sets: "4", reps: "10-12" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "10-12" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12-15" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "15" }] }
                ]
            }
        ]
    },
    {
        id: "bench-spec-2x", title: "Bench Specialization (2x/week)", category: "Powerlifting",
        description: "9-week bench peaking program. 2 bench days per week. Light squat/deadlift maintenance.",
        difficulty: "Advanced", weeks: 9, daysPerWeek: 3,
        schedule: [
            { weekLabel: "Week 1", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2 / 4", reps: "3 / 2", note: "70% / 80%" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "6-8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_27", name: "Deadlift", sets: "3", reps: "5", note: "Don't overdo volume" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "4", reps: "8", note: "65%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8-10" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]},
            { weekLabel: "Week 2", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "1/1/1/2/1", reps: "3/3/2/3/2", note: "70%/80%/85%/85%/90%" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "6" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_27", name: "Deadlift", sets: "3", reps: "4" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "4", reps: "4", note: "72%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]},
            { weekLabel: "Week 3", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/2/1/1", reps: "3/3/2/1", note: "65%/75%/85%/90% with 1s Pause" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_27", name: "Deadlift", sets: "3", reps: "4" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/2/3", reps: "3/3/2", note: "70%/80%/85%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]},
            { weekLabel: "Week 4", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/3/3", reps: "3/3/3", note: "72%/77%/82%" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_27", name: "Deadlift", sets: "3", reps: "4" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "12" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/3/3", reps: "3/3/2", note: "70%/82%/85%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]},
            { weekLabel: "Week 5", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "3/3/5", reps: "3/3/3", note: "72%/77%/82%" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_27", name: "Deadlift", sets: "3", reps: "4" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/5", reps: "3/4", note: "75%/80%" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" } ] }
            ]},
            { weekLabel: "Week 6", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/2/4", reps: "3/3/2", note: "70%/75%/80% with Pause + Bands" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_27", name: "Deadlift", sets: "3", reps: "6" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "15" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/2/1", reps: "3/1/1", note: "70%/80%/90% with Pause" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "8" } ] }
            ]},
            { weekLabel: "Week 7", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/4", reps: "3/3", note: "70%/75% + Bands" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_27", name: "Deadlift", sets: "3", reps: "4" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/3/3/2", reps: "3/3/1/2", note: "70%/75%/85% (Pause)/80%" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]},
            { weekLabel: "Week 8", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "1/1/1/1", reps: "3/3/1/1", note: "70%/75%/85%/92% with Pause" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_27", name: "Deadlift", sets: "3", reps: "6" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/1/2", reps: "3/2/1", note: "70%/80%/85%" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "15" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]},
            { weekLabel: "Week 9 (Peak)", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "1/1/1/1/1", reps: "3/2/2/1/1", note: "70%/80%/85%/92%/102% (PR)" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_27", name: "Deadlift", sets: "3", reps: "6" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/4", reps: "3/2", note: "70%/80% with Pause" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]}
        ]
    },
    {
        id: "bench-spec-3x", title: "Bench Specialization (3x/week)", category: "Powerlifting",
        description: "11-week intensive bench program. High frequency.",
        difficulty: "Advanced", weeks: 11, daysPerWeek: 3,
        schedule: [
            { weekLabel: "Week 1", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2 / 4", reps: "4 / 2", note: "70% / 80%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "4", reps: "8", note: "60%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "5", note: "No Failure!" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "4", reps: "4", note: "75%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]},
            { weekLabel: "Week 2", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "1/2/4", reps: "5/4/2", note: "65%/75%/82%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/2/2/2/2/2", reps: "4/3/2/1/2/3", note: "70%/80%/85%/90%/85%/80%" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/4", reps: "3/2", note: "70%/80%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]},
            { weekLabel: "Week 3", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/4", reps: "3/3", note: "70%/80%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/2/2/2/2/1/1", reps: "4/4/3/2/3/4/5", note: "65%/75%/80%/85%/80%/75%/65%" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/4", reps: "3/2", note: "70%/80% with Pause 1s" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]},
            { weekLabel: "Week 4", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/5", reps: "3/2", note: "70%/80%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/2/3/2", reps: "3/2/1/2", note: "70%/80%/90%/80%" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/2/5", reps: "4/3/2", note: "65%/75%/82%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]},
            { weekLabel: "Week 5", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/2/5", reps: "4/3/2", note: "65%/75%/80% + Bands" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/6", reps: "3/3", note: "70%/80%" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/2/3/2/1", reps: "3/3/2/3/6", note: "70%/80%/90%/80%/70%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]},
            { weekLabel: "Week 6", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/2/5", reps: "4/3/2", note: "65%/75%/85%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "3/4", reps: "3/3", note: "70%/80%" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/2/4/1", reps: "3/2/1/6", note: "70%/82%/90%/70%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]},
            { weekLabel: "Week 7", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/4", reps: "4/2", note: "72%/85%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/3/2", reps: "3/2/2", note: "70%/80%/80% with Pause" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/2/3/2", reps: "3/2/1/2", note: "72%/80%/85%/80%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]},
            { weekLabel: "Week 8", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/5", reps: "3/2", note: "70%/80%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/4", reps: "3/2", note: "70%/75% + Bands" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "6" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "1/1/1/1", reps: "3/2/1/1", note: "70%/80%/90%/95% Test (PR)" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]},
            { weekLabel: "Week 9", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/2/3", reps: "3/2/1", note: "65%/75%/85%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/4", reps: "3/3", note: "70%/80%" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "6" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/2/2/3", reps: "3/2/1/2", note: "70%/80%/90%/80%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]},
            { weekLabel: "Week 10", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/4", reps: "4/2", note: "70%/80%" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/3/1", reps: "3/1/6", note: "70%/80% (Pause)/70%" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/4", reps: "4/2", note: "70%/75% + Bands" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]},
            { weekLabel: "Week 11 (Peak)", days: [
                { title: "Monday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "2/4", reps: "3/2", note: "70%/75%" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Wednesday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "4", reps: "3", note: "70%" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "6" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] },
                { title: "Friday", exercises: [ { id: "ex_12", name: "Bench Press", sets: "1/1/1/1/1", reps: "3/2/2/1/1", note: "70%/80%/85%/92%/102% (PR)" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "15" } ] }
            ]}
        ]
    },
    {
        id: "adamt-bench", title: "Adam T's Bench Program", category: "Powerlifting",
        description: "Intense bench block focused on heavy doubles and varying grips.",
        difficulty: "Advanced", weeks: 4, daysPerWeek: 3,
        schedule: [
            {
                weekLabel: "Standard Week", days: [
                    { title: "Day 1: Heavy Comp", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "2", note: "85% RPE 8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "8" }, { id: "ex_66", name: "Push Press", sets: "3", reps: "15" }] },
                    { title: "Day 2: Close Grip", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "5", note: "RPE 7" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "6" }] },
                    { title: "Day 3: Paused", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "3", note: "RPE 7.5" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }] }
                ]
            }
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
                    { title: "Day 1: Chest, Triceps, Shoulders", exercises: [{ id: "ex_12", name: "Bench Press", sets: "4", reps: "8-12", note: "Failure" }, { id: "ex_12", name: "Bench Press", sets: "3", reps: "8-12", note: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-12", note: "Failure" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "12-15", note: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-12", note: "Failure" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "10-12", note: "Failure" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "10-12", note: "Failure" }] },
                    { title: "Day 2: Back, Biceps", exercises: [{ id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "8-12", note: "Failure" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8-12", note: "Failure" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "10-12", note: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "12-15", note: "Failure" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10-12", note: "Failure" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10-12", note: "Failure" }] },
                    { title: "Day 3: Legs", exercises: [{ id: "ex_41", name: "Hip Thrust", sets: "4", reps: "10-12", note: "Failure" }, { id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "8-12", note: "Failure" }, { id: "ex_27", name: "Deadlift", sets: "3", reps: "10-12", note: "Failure" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "3", reps: "12-15", note: "Failure" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "12-15", note: "Failure" }] },
                    { title: "Day 4: Shoulders, Chest, Back", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "8-12", note: "Failure" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "12-15", note: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-12", note: "Failure" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10-12", note: "Failure" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "8-12", note: "Failure" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "3", reps: "12-15", note: "Failure" }] }
                ]
            }
        ]
    },
    {
        id: "pana-powerbuilding", title: "Pana Powerbuilding", category: "Powerlifting",
        description: "6-day powerbuilding by French Champion Panagiotis Tarinidis. Focuses on heavy SBD strength and aesthetic hypertrophy. 3 weeks Accumulation, 3 weeks Peaking.",
        difficulty: "Advanced", weeks: 6, daysPerWeek: 6,
        schedule: [
            { weekLabel: "Week 1 (Accumulation)", days: [
                { title: "Day 1: S/B Volume", exercises: [{ id: "ex_77", name: "Squat", sets: "4", reps: "6", note: "75% / RPE 7" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "6", note: "75% / RPE 7" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10" }] },
                { title: "Day 2: Deadlift & Heavy Bench", exercises: [{ id: "ex_27", name: "Deadlift", sets: "4", reps: "6", note: "75% / RPE 7" }, { id: "ex_1", name: "Arnold Press", sets: "1/4", reps: "1/3", note: "90% single, then 85% backoff" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10" }] },
                { title: "Day 3: Shoulders & Arms", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "15" }] },
                { title: "Day 4: Practice S/B", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "6", note: "70% Light" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "6", note: "70% Light" }] },
                { title: "Day 6: Heavy SBD", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "4", note: "RPE 7-8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "4", note: "RPE 7-8" }, { id: "ex_27", name: "Deadlift", sets: "3", reps: "4", note: "RPE 7-8" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10" }] },
                { title: "Day 7 (Optional): Upper Body", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }] }
            ]},
            { weekLabel: "Week 2 (Accumulation)", days: [
                { title: "Day 1: S/B Volume", exercises: [{ id: "ex_77", name: "Squat", sets: "4", reps: "5", note: "78% / RPE 8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5", note: "78% / RPE 8" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10" }] },
                { title: "Day 2: Deadlift & Heavy Bench", exercises: [{ id: "ex_27", name: "Deadlift", sets: "4", reps: "5", note: "78% / RPE 8" }, { id: "ex_1", name: "Arnold Press", sets: "1/4", reps: "1/3", note: "92% single, then 85% backoff" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10" }] },
                { title: "Day 3: Shoulders & Arms", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "15" }] },
                { title: "Day 4: Practice S/B", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "6", note: "70% Light" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "6", note: "70% Light" }] },
                { title: "Day 6: Heavy SBD", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "3", note: "RPE 8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "3", note: "RPE 8" }, { id: "ex_27", name: "Deadlift", sets: "3", reps: "3", note: "RPE 8" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10" }] },
                { title: "Day 7 (Optional): Upper Body", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }] }
            ]},
            { weekLabel: "Week 3 (Accumulation)", days: [
                { title: "Day 1: S/B Volume", exercises: [{ id: "ex_77", name: "Squat", sets: "4", reps: "4", note: "82% / RPE 9" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "4", note: "82% / RPE 9" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10" }] },
                { title: "Day 2: Deadlift & Heavy Bench", exercises: [{ id: "ex_27", name: "Deadlift", sets: "4", reps: "4", note: "82% / RPE 9" }, { id: "ex_1", name: "Arnold Press", sets: "1/3", reps: "1/3", note: "95% single, then 85% backoff" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10" }] },
                { title: "Day 3: Shoulders & Arms", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "15" }] },
                { title: "Day 4: Practice S/B", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "6", note: "70% Light" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "6", note: "70% Light" }] },
                { title: "Day 6: Heavy SBD", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "3", note: "RPE 9-10" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "3", note: "RPE 9-10" }, { id: "ex_27", name: "Deadlift", sets: "3", reps: "3", note: "RPE 9-10" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10" }] }
            ]},
            { weekLabel: "Week 4 (Peaking)", days: [
                { title: "Day 1: S/B Volume", exercises: [{ id: "ex_77", name: "Squat", sets: "4", reps: "3", note: "85% / RPE 7.5" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "3", note: "85% / RPE 7.5" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10" }] },
                { title: "Day 2: Deadlift & Heavy Bench", exercises: [{ id: "ex_27", name: "Deadlift", sets: "4", reps: "3", note: "85% / RPE 7.5" }, { id: "ex_1", name: "Arnold Press", sets: "1/3", reps: "1/2", note: "92% single, then 87% backoff" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10" }] },
                { title: "Day 3: Shoulders & Arms", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "15" }] },
                { title: "Day 4: Practice S/B", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "5", note: "70% Light" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "5", note: "70% Light" }] },
                { title: "Day 6: Heavy SBD", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "2", note: "RPE 8" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "2", note: "RPE 8" }, { id: "ex_27", name: "Deadlift", sets: "3", reps: "2", note: "RPE 8" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10" }] },
                { title: "Day 7 (Optional): Upper Body", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }] }
            ]},
            { weekLabel: "Week 5 (Peaking)", days: [
                { title: "Day 1: S/B Volume", exercises: [{ id: "ex_77", name: "Squat", sets: "3", reps: "3", note: "88% / RPE 8-9" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "3", note: "88% / RPE 8-9" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10" }] },
                { title: "Day 2: Deadlift & Heavy Bench", exercises: [{ id: "ex_27", name: "Deadlift", sets: "3", reps: "3", note: "88% / RPE 8-9" }, { id: "ex_1", name: "Arnold Press", sets: "1/2", reps: "1/2", note: "95% single, then 90% backoff" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "10" }] },
                { title: "Day 3: Shoulders & Arms", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "8" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "4", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "15" }] },
                { title: "Day 4: Practice S/B", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "3", reps: "4", note: "70% Light" }, { id: "ex_1", name: "Arnold Press", sets: "4", reps: "4", note: "70% Light" }] },
                { title: "Day 6: Heavy SBD", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "2", reps: "2", note: "RPE 9" }, { id: "ex_1", name: "Arnold Press", sets: "2", reps: "2", note: "RPE 9" }, { id: "ex_27", name: "Deadlift", sets: "2", reps: "2", note: "RPE 9" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10" }] },
                { title: "Day 7 (Optional): Upper Body", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }] }
            ]},
            { weekLabel: "Week 6 (1RM Test / PR Week)", days: [
                { title: "Day 1: S/B Volume", exercises: [{ id: "ex_77", name: "Squat", sets: "3", reps: "2", note: "80% Deload" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "2", note: "80% Deload" }] },
                { title: "Day 2: Deadlift & Upper", exercises: [{ id: "ex_27", name: "Deadlift", sets: "3", reps: "2", note: "80% Deload" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10" }] },
                { title: "Day 3: Shoulders & Arms (Light)", exercises: [{ id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }] },
                { title: "Day 4: Rest", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "-", reps: "-" }] },
                { title: "Day 6: TEST DAY 🚀", exercises: [{ id: "ex_4", name: "Barbell Hack Squat Exercise", sets: "1", reps: "1", note: "Build up to max" }, { id: "ex_1", name: "Arnold Press", sets: "1", reps: "1", note: "Build up to max" }, { id: "ex_27", name: "Deadlift", sets: "1", reps: "1", note: "Build up to max" }] }
            ]}
        ]
    },
    {
        id: "fst-7-split", title: "FST-7 Bodybuilding Split", category: "Bodybuilding", badge: "🔥 Most Popular",
        description: "Hany Rambod's Fascia Stretch Training-7. Emphasizes 7 high-volume sets with only 30-45s rest to finish the muscle completely.",
        difficulty: "Advanced", weeks: 8, daysPerWeek: 5,
        schedule: [
            { weekLabel: "Standard Rotation", days: [
                { title: "Monday: Chest & Biceps", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "8-12" }, { id: "ex_12", name: "Bench Press", sets: "3", reps: "8-12" }, { id: "ex_1", name: "Arnold Press", sets: "7", reps: "10-12", note: "30s rest, stretch hard" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "3", reps: "10" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "7", reps: "10-12", note: "30s rest" }] },
                { title: "Tuesday: Back & Abs", exercises: [{ id: "ex_35", name: "Dumbbell Pullover", sets: "4", reps: "10" }, { id: "ex_7", name: "Barbell Row", sets: "3", reps: "10" }, { id: "ex_35", name: "Dumbbell Pullover", sets: "7", reps: "10-12", note: "30s rest" }, { id: "ex_1", name: "Arnold Press", sets: "7", reps: "15" }] },
                { title: "Thursday: Shoulders & Triceps", exercises: [{ id: "ex_1", name: "Arnold Press", sets: "4", reps: "8-10" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "12" }, { id: "ex_1", name: "Arnold Press", sets: "7", reps: "12", note: "30s rest" }, { id: "ex_1", name: "Arnold Press", sets: "3", reps: "10" }, { id: "ex_66", name: "Push Press", sets: "7", reps: "10-12", note: "30s rest" }] },
                { title: "Friday: Quads, Hams, Calves", exercises: [{ id: "ex_77", name: "Squat", sets: "4", reps: "8-10" }, { id: "ex_51", name: "Leg Press", sets: "3", reps: "10-12" }, { id: "ex_2", name: "Back Extension Frontloaded", sets: "7", reps: "12", note: "30s rest" }, { id: "ex_3", name: "Barbell Biceps Curl", sets: "7", reps: "10-12", note: "30s rest" }, { id: "ex_9", name: "Barbell Standing Calf Raise 2", sets: "7", reps: "15" }] },
                { title: "Saturday: Arms (Biceps & Triceps)", exercises: [{ id: "ex_3", name: "Barbell Biceps Curl", sets: "4", reps: "8-10" }, { id: "ex_12", name: "Bench Press", sets: "4", reps: "8-10" }, { id: "ex_41", name: "Cable Curl With Bar", sets: "7", reps: "10-12", note: "30s rest" }, { id: "ex_74", name: "Triceps Pushdown With Rope", sets: "7", reps: "10-12", note: "30s rest" }] }
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
    }
];

export const PROGRAMS_DATA = _rawPrograms.filter(p => p.id !== "DELETE_ME");
