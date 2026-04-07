export interface ExerciseDefinition {
    id: string;
    name: string;
    category: string;
    equipment: string;
    gifName?: string;
}

export const EXERCISES_DATA: ExerciseDefinition[] = [
    {
        id: "ex_1",
        name: "Arnold Press",
        category: "Shoulders",
        equipment: "Machine",
        gifName: "arnold-press.webp"
    },
    {
        id: "ex_2",
        name: "Back Extension Frontloaded",
        category: "Back",
        equipment: "Machine",
        gifName: "back-extension-frontloaded.webp"
    },
    {
        id: "ex_3",
        name: "Barbell Biceps Curl",
        category: "Biceps",
        equipment: "Barbell",
        gifName: "Barbell-biceps-curl.webp"
    },
    {
        id: "ex_4",
        name: "Barbell Hack Squat Exercise",
        category: "Legs",
        equipment: "Barbell",
        gifName: "Barbell-Hack-Squat-Exercise.webp"
    },
    {
        id: "ex_5",
        name: "Barbell Lunge",
        category: "Legs",
        equipment: "Barbell",
        gifName: "Barbell-Lunge.webp"
    },
    {
        id: "ex_6",
        name: "Barbell Lying Tricep Extension",
        category: "Triceps",
        equipment: "Barbell",
        gifName: "Barbell-Lying-Tricep-Extension.webp"
    },
    {
        id: "ex_7",
        name: "Barbell Row",
        category: "Back",
        equipment: "Barbell",
        gifName: "Barbell-Row.gif"
    },
    {
        id: "ex_8",
        name: "Barbell Shrug",
        category: "Full Body",
        equipment: "Barbell",
        gifName: "Barbell-Shrug.webp"
    },
    {
        id: "ex_9",
        name: "Barbell Standing Calf Raise 2",
        category: "Legs",
        equipment: "Barbell",
        gifName: "barbell-standing-calf-raise-2.webp"
    },
    {
        id: "ex_10",
        name: "Barbell Standing Triceps Extension",
        category: "Triceps",
        equipment: "Barbell",
        gifName: "Barbell-Standing-Triceps-Extension.webp"
    },
    {
        id: "ex_11",
        name: "Belt Squat",
        category: "Legs",
        equipment: "Bodyweight",
        gifName: "belt-squat.webp"
    },
    {
        id: "ex_12",
        name: "Bench Press",
        category: "Chest",
        equipment: "Machine",
        gifName: "bench-press.webp"
    },
    {
        id: "ex_13",
        name: "Bulgarian Split Squat Barbell",
        category: "Legs",
        equipment: "Barbell",
        gifName: "Bulgarian-split-squat-barbell.webp"
    },
    {
        id: "ex_14",
        name: "Cable Chest Press",
        category: "Chest",
        equipment: "Cable",
        gifName: "cable-chest-press.webp"
    },
    {
        id: "ex_15",
        name: "Cable Crunch",
        category: "Core",
        equipment: "Cable",
        gifName: "cable-crunch.webp"
    },
    {
        id: "ex_16",
        name: "Cable Curl With Bar",
        category: "Biceps",
        equipment: "Cable",
        gifName: "cable-curl-with-bar.webp"
    },
    {
        id: "ex_17",
        name: "Cable Curl With Rope",
        category: "Biceps",
        equipment: "Cable",
        gifName: "cable-curl-with-rope.webp"
    },
    {
        id: "ex_18",
        name: "Cable Front Raise",
        category: "Shoulders",
        equipment: "Cable",
        gifName: "cable-front-raise.webp"
    },
    {
        id: "ex_19",
        name: "Cable Lateral Raise",
        category: "Back",
        equipment: "Cable",
        gifName: "cable-lateral-raise.webp"
    },
    {
        id: "ex_20",
        name: "Cable Rear Delt Row",
        category: "Back",
        equipment: "Cable",
        gifName: "cable-rear-delt-row.webp"
    },
    {
        id: "ex_21",
        name: "Cable Row Seated Narrow Grip",
        category: "Back",
        equipment: "Cable",
        gifName: "cable-row-seated-narrow-grip.webp"
    },
    {
        id: "ex_22",
        name: "Cable Row Seated Single Arm",
        category: "Back",
        equipment: "Cable",
        gifName: "cable-row-seated-single-arm.webp"
    },
    {
        id: "ex_23",
        name: "Calf Raise Standing",
        category: "Legs",
        equipment: "Bodyweight",
        gifName: "calf-raise-standing.webp"
    },
    {
        id: "ex_24",
        name: "Close Grip Bench Press",
        category: "Chest",
        equipment: "Machine",
        gifName: "Close-grip-bench-press.webp"
    },
    {
        id: "ex_25",
        name: "Crossbody Cable Triceps Extension",
        category: "Triceps",
        equipment: "Cable",
        gifName: "Crossbody-Cable-Triceps-Extension.webp"
    },
    {
        id: "ex_26",
        name: "Crunch",
        category: "Core",
        equipment: "Bodyweight",
        gifName: "Crunch.webp"
    },
    {
        id: "ex_27",
        name: "Deadlift",
        category: "Back",
        equipment: "Bodyweight",
        gifName: "Deadlift.webp"
    },
    {
        id: "ex_28",
        name: "Dips",
        category: "Full Body",
        equipment: "Bodyweight",
        gifName: "Dips.webp"
    },
    {
        id: "ex_29",
        name: "Dumbbell Chest Fly",
        category: "Chest",
        equipment: "Dumbbell",
        gifName: "Dumbbell-Chest-Fly.webp"
    },
    {
        id: "ex_30",
        name: "Dumbbell Chest Press",
        category: "Chest",
        equipment: "Dumbbell",
        gifName: "Dumbbell-Chest-Press.webp"
    },
    {
        id: "ex_31",
        name: "Dumbbell Front Raise",
        category: "Shoulders",
        equipment: "Dumbbell",
        gifName: "Dumbbell-Front-Raise.webp"
    },
    {
        id: "ex_32",
        name: "Dumbbell Incline Press",
        category: "Chest",
        equipment: "Dumbbell",
        gifName: "Dumbbell-Incline-Press.webp"
    },
    {
        id: "ex_33",
        name: "Dumbbell Lateral Raise",
        category: "Back",
        equipment: "Dumbbell",
        gifName: "Dumbbell-Lateral-Raise.webp"
    },
    {
        id: "ex_34",
        name: "Dumbbell Lunge",
        category: "Legs",
        equipment: "Dumbbell",
        gifName: "Dumbbell-Lunge.webp"
    },
    {
        id: "ex_35",
        name: "Dumbbell Pullover",
        category: "Chest",
        equipment: "Dumbbell",
        gifName: "Dumbbell-Pullover.webp"
    },
    {
        id: "ex_36",
        name: "EZ Curl",
        category: "Biceps",
        equipment: "EZ Bar",
        gifName: "EZ-curl.webp"
    },
    {
        id: "ex_37",
        name: "Front Squat",
        category: "Legs",
        equipment: "Bodyweight",
        gifName: "Front-squat.webp"
    },
    {
        id: "ex_38",
        name: "Hack Squat Machine",
        category: "Legs",
        equipment: "Machine",
        gifName: "hack-squat-machine.gif"
    },
    {
        id: "ex_39",
        name: "Hammer Curl",
        category: "Biceps",
        equipment: "Bodyweight",
        gifName: "Hammer-curl.webp"
    },
    {
        id: "ex_40",
        name: "Hanging Leg Raise",
        category: "Core",
        equipment: "Bodyweight",
        gifName: "hanging-leg-raise.webp"
    },
    {
        id: "ex_41",
        name: "Hip Thrust",
        category: "Legs",
        equipment: "Bodyweight",
        gifName: "Hip-thrust.webp"
    },
    {
        id: "ex_42",
        name: "Incline Bench Press",
        category: "Chest",
        equipment: "Machine",
        gifName: "Incline-Bench-Press.webp"
    },
    {
        id: "ex_43",
        name: "Incline Bench SkullCrushers",
        category: "Triceps",
        equipment: "Bodyweight",
        gifName: "Incline-Bench-SkullCrushers.webp"
    },
    {
        id: "ex_44",
        name: "Incline Dumbbell Curl",
        category: "Biceps",
        equipment: "Dumbbell",
        gifName: "Incline-Dumbbell-Curl.webp"
    },
    {
        id: "ex_45",
        name: "Kroc Row",
        category: "Back",
        equipment: "Dumbbell",
        gifName: "kroc-row.webp"
    },
    {
        id: "ex_46",
        name: "Lat Pulldown With Neutral Grip 1",
        category: "Back",
        equipment: "Bodyweight",
        gifName: "lat-pulldown-with-neutral-grip-1.webp"
    },
    {
        id: "ex_47",
        name: "Lateral Raise Machine",
        category: "Back",
        equipment: "Machine",
        gifName: "lateral-raise-machine.webp"
    },
    {
        id: "ex_48",
        name: "Leg Curl Seated",
        category: "Legs",
        equipment: "Bodyweight",
        gifName: "leg-curl-seated.webp"
    },
    {
        id: "ex_49",
        name: "Leg Extension One Leg",
        category: "Legs",
        equipment: "Machine",
        gifName: "leg-extension-one-leg.webp"
    },
    {
        id: "ex_50",
        name: "Leg Extension Seated",
        category: "Legs",
        equipment: "Machine",
        gifName: "leg-extension-seated.webp"
    },
    {
        id: "ex_51",
        name: "Leg Press",
        category: "Legs",
        equipment: "Machine",
        gifName: "leg-press.webp"
    },
    {
        id: "ex_52",
        name: "Lying Dumbbell Triceps Extension 1",
        category: "Triceps",
        equipment: "Dumbbell",
        gifName: "Lying-Dumbbell-Triceps-Extension-1.webp"
    },
    {
        id: "ex_53",
        name: "Lying Leg Curl",
        category: "Legs",
        equipment: "Bodyweight",
        gifName: "lying-leg-curl.webp"
    },
    {
        id: "ex_54",
        name: "Machine Chest Fly",
        category: "Chest",
        equipment: "Machine",
        gifName: "machine-chest-fly.webp"
    },
    {
        id: "ex_55",
        name: "Machine Chest Press",
        category: "Chest",
        equipment: "Machine",
        gifName: "machine-chest-press.webp"
    },
    {
        id: "ex_56",
        name: "Machine Lat Pulldown",
        category: "Back",
        equipment: "Machine",
        gifName: "machine-lat-pulldown.webp"
    },
    {
        id: "ex_57",
        name: "Machine Overhead Tricep Extension",
        category: "Triceps",
        equipment: "Machine",
        gifName: "machine-overhead-tricep-extension.webp"
    },
    {
        id: "ex_58",
        name: "Machine Shoulder Press",
        category: "Shoulders",
        equipment: "Machine",
        gifName: "machine-shoulder-press.webp"
    },
    {
        id: "ex_59",
        name: "One Arm Lat Pulldown",
        category: "Back",
        equipment: "Bodyweight",
        gifName: "one-arm-lat-pulldown.webp"
    },
    {
        id: "ex_60",
        name: "Overhead Cable Triceps Extension From Upper Position",
        category: "Triceps",
        equipment: "Cable",
        gifName: "Overhead-Cable-Triceps-Extension-from-Upper-Position.webp"
    },
    {
        id: "ex_61",
        name: "Overhead Press Exercise",
        category: "Chest",
        equipment: "Machine",
        gifName: "Overhead-press-exercise.webp"
    },
    {
        id: "ex_62",
        name: "Overhead Tricep Extension Lower Position",
        category: "Triceps",
        equipment: "Machine",
        gifName: "overhead-tricep-extension-lower-position.webp"
    },
    {
        id: "ex_63",
        name: "Pec Deck",
        category: "Chest",
        equipment: "Machine",
        gifName: "pec-deck.webp"
    },
    {
        id: "ex_64",
        name: "Preacher Curl Barbell",
        category: "Biceps",
        equipment: "Barbell",
        gifName: "preacher-curl-barbell.webp"
    },
    {
        id: "ex_65",
        name: "Pull Ups",
        category: "Back",
        equipment: "Bodyweight",
        gifName: "pull-ups.webp"
    },
    {
        id: "ex_66",
        name: "Push Press",
        category: "Chest",
        equipment: "Machine",
        gifName: "push-press.webp"
    },
    {
        id: "ex_67",
        name: "Push Up",
        category: "Chest",
        equipment: "Bodyweight",
        gifName: "Push-up.webp"
    },
    {
        id: "ex_68",
        name: "Reverse Dumbbell Flyes",
        category: "Chest",
        equipment: "Dumbbell",
        gifName: "Reverse-dumbbell-flyes.webp"
    },
    {
        id: "ex_69",
        name: "Reverse Machine Fly",
        category: "Chest",
        equipment: "Machine",
        gifName: "reverse-machine-fly.webp"
    },
    {
        id: "ex_70",
        name: "Romanian Deadlift",
        category: "Back",
        equipment: "Bodyweight",
        gifName: "Romanian-deadlift.webp"
    },
    {
        id: "ex_71",
        name: "Seated Calf Raise Barbell",
        category: "Legs",
        equipment: "Barbell",
        gifName: "seated-calf-raise-barbell.webp"
    },
    {
        id: "ex_72",
        name: "Seated Dumbbell Shoulder Press",
        category: "Shoulders",
        equipment: "Dumbbell",
        gifName: "Seated-dumbbell-shoulder-press.webp"
    },
    {
        id: "ex_73",
        name: "Seated Machine Row",
        category: "Back",
        equipment: "Machine",
        gifName: "seated-machine-row.webp"
    },
    {
        id: "ex_74",
        name: "Single Leg Leg Curl",
        category: "Legs",
        equipment: "Bodyweight",
        gifName: "single-leg-leg-curl.webp"
    },
    {
        id: "ex_75",
        name: "Smith Machine Lunge",
        category: "Legs",
        equipment: "Smith Machine",
        gifName: "smith-machine-lunge.webp"
    },
    {
        id: "ex_76",
        name: "Spider Curl Does Whatever A Spider Curl Does 2",
        category: "Biceps",
        equipment: "Bodyweight",
        gifName: "spider-curl-does-whatever-a-spider-curl-does-2.webp"
    },
    {
        id: "ex_77",
        name: "Squat",
        category: "Legs",
        equipment: "Bodyweight",
        gifName: "squat.webp"
    },
    {
        id: "ex_78",
        name: "T Bar Row Machine",
        category: "Back",
        equipment: "Machine",
        gifName: "t-bar-row-machine.webp"
    },
    {
        id: "ex_79",
        name: "Triceps Pushdown With Rope",
        category: "Triceps",
        equipment: "Bodyweight",
        gifName: "triceps-pushdown-with-rope.webp"
    },
    {
        id: "ex_80",
        name: "Triceps Pushdown With Straight Handle",
        category: "Triceps",
        equipment: "Bodyweight",
        gifName: "triceps-pushdown-with-straight-handle.webp"
    },
];
