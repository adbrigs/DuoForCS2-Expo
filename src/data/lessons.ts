import {CS2Category, Lesson, QuestionType} from '../types';

export const LESSONS: Lesson[] = [
  // MECHANICS Category
  {
    id: 'mech_01',
    title: 'Spray Control Basics',
    description: 'Learn the fundamentals of weapon spray patterns and recoil control',
    category: CS2Category.MECHANICS,
    level: 1,
    xpReward: 50,
    unlocked: true,
    completed: false,
    questions: [
      {
        id: 'mech_01_q1',
        type: QuestionType.MULTIPLE_CHOICE,
        category: CS2Category.MECHANICS,
        question: 'What is the best way to control the AK-47 spray pattern?',
        options: [
          'Pull down and slightly to the left',
          'Pull down and slightly to the right',
          'Keep crosshair steady',
          'Move in circles',
        ],
        correctAnswer: 0,
        explanation:
          'The AK-47 spray pattern moves up and to the right, so you need to pull down and slightly to the left to compensate.',
        xpReward: 10,
      },
      {
        id: 'mech_01_q2',
        type: QuestionType.TRUE_FALSE,
        category: CS2Category.MECHANICS,
        question: 'Crouching while spraying reduces spray pattern spread.',
        correctAnswer: 'true',
        explanation:
          'Crouching does reduce the spread of your spray pattern, making it more accurate.',
        xpReward: 10,
      },
      {
        id: 'mech_01_q3',
        type: QuestionType.MULTIPLE_CHOICE,
        category: CS2Category.MECHANICS,
        question: 'How many bullets should you typically spray before resetting?',
        options: ['5-7 bullets', '10-12 bullets', '15-20 bullets', 'Full magazine'],
        correctAnswer: 0,
        explanation:
          'The first 5-7 bullets are the most accurate. After that, the spray becomes harder to control.',
        xpReward: 10,
      },
    ],
  },

  // MOVEMENT Category
  {
    id: 'move_01',
    title: 'Counter-Strafe Fundamentals',
    description: 'Master the art of stopping movement for accurate shots',
    category: CS2Category.MOVEMENT,
    level: 1,
    xpReward: 50,
    unlocked: true,
    completed: false,
    questions: [
      {
        id: 'move_01_q1',
        type: QuestionType.MULTIPLE_CHOICE,
        category: CS2Category.MOVEMENT,
        question: 'What is counter-strafing?',
        options: [
          'Pressing the opposite movement key to stop instantly',
          'Jumping while shooting',
          'Crouching while moving',
          'Running and gunning',
        ],
        correctAnswer: 0,
        explanation:
          'Counter-strafing is pressing the opposite movement key to cancel your momentum and stop instantly for accurate shots.',
        xpReward: 10,
      },
      {
        id: 'move_01_q2',
        type: QuestionType.SCENARIO,
        category: CS2Category.MOVEMENT,
        question:
          'You are moving left (A key) and spot an enemy. What should you do?',
        options: [
          'Tap D key then shoot',
          'Just stop moving and shoot',
          'Keep moving and shoot',
          'Jump and shoot',
        ],
        correctAnswer: 0,
        explanation:
          'Tapping the D key will counter-strafe your leftward movement, allowing you to shoot accurately faster.',
        xpReward: 15,
      },
    ],
  },

  // GAMESENSE Category
  {
    id: 'game_01',
    title: 'Economy Management 101',
    description: 'Learn when to buy, save, and force-buy',
    category: CS2Category.GAMESENSE,
    level: 1,
    xpReward: 50,
    unlocked: true,
    completed: false,
    questions: [
      {
        id: 'game_01_q1',
        type: QuestionType.MULTIPLE_CHOICE,
        category: CS2Category.GAMESENSE,
        question: 'What is a full buy for a CT player?',
        options: [
          'M4A4/M4A1-S, armor, helmet, utility',
          'SMG, armor, helmet',
          'Pistol, armor, utility',
          'AWP only',
        ],
        correctAnswer: 0,
        explanation:
          'A full buy includes a rifle (M4), full armor with helmet, and a complete set of utility grenades.',
        xpReward: 10,
      },
      {
        id: 'game_01_q2',
        type: QuestionType.SCENARIO,
        category: CS2Category.GAMESENSE,
        question:
          'Your team lost the pistol round. You have $1900. What should you buy?',
        options: [
          'Force buy pistol + armor',
          'Save for next round',
          'Buy SMG no armor',
          'Buy rifle no utility',
        ],
        correctAnswer: 1,
        explanation:
          'After losing pistol, it\'s best to save for a proper buy in round 3. This is called an "eco round".',
        xpReward: 15,
      },
    ],
  },

  // UTILITY Category
  {
    id: 'util_01',
    title: 'Smoke Grenade Basics',
    description: 'Learn essential smoke positions and timing',
    category: CS2Category.UTILITY,
    level: 1,
    xpReward: 50,
    unlocked: true,
    completed: false,
    questions: [
      {
        id: 'util_01_q1',
        type: QuestionType.MULTIPLE_CHOICE,
        category: CS2Category.UTILITY,
        question: 'How long does a smoke grenade last in CS2?',
        options: ['10 seconds', '15 seconds', '18 seconds', '20 seconds'],
        correctAnswer: 2,
        explanation: 'Smoke grenades last for 18 seconds in CS2.',
        xpReward: 10,
      },
      {
        id: 'util_01_q2',
        type: QuestionType.TRUE_FALSE,
        category: CS2Category.UTILITY,
        question: 'You can extinguish molotovs with smoke grenades.',
        correctAnswer: 'true',
        explanation:
          'Smoke grenades can extinguish molotovs and incendiary grenades, making them versatile utility.',
        xpReward: 10,
      },
    ],
  },

  // TEAMPLAY Category
  {
    id: 'team_01',
    title: 'Communication Essentials',
    description: 'Learn effective callouts and team coordination',
    category: CS2Category.TEAMPLAY,
    level: 1,
    xpReward: 50,
    unlocked: true,
    completed: false,
    questions: [
      {
        id: 'team_01_q1',
        type: QuestionType.MULTIPLE_CHOICE,
        category: CS2Category.TEAMPLAY,
        question: 'What information should you give when calling out an enemy?',
        options: [
          'Location, number of enemies, HP if known',
          'Just the location',
          'Just say "enemy"',
          'Wait until they kill you',
        ],
        correctAnswer: 0,
        explanation:
          'Good callouts include enemy location, how many you saw, and their HP status if you damaged them.',
        xpReward: 10,
      },
      {
        id: 'team_01_q2',
        type: QuestionType.SCENARIO,
        category: CS2Category.TEAMPLAY,
        question: 'Your teammate is in a 1v1 clutch. What should you do?',
        options: [
          'Stay quiet and let them focus',
          'Give constant advice',
          'Spectate and backseat game',
          'Leave the match',
        ],
        correctAnswer: 0,
        explanation:
          'During clutch situations, stay quiet to let your teammate hear footsteps and focus.',
        xpReward: 15,
      },
    ],
  },
];

export const getCategoryLessons = (category: CS2Category): Lesson[] => {
  return LESSONS.filter(lesson => lesson.category === category);
};

export const getLessonById = (id: string): Lesson | undefined => {
  return LESSONS.find(lesson => lesson.id === id);
};
