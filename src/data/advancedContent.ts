import {CS2Category, Lesson, QuestionType} from '../types';

// Additional advanced lessons
export const ADVANCED_LESSONS: Lesson[] = [
  // Advanced Mechanics
  {
    id: 'mech_02',
    title: 'Advanced Crosshair Placement',
    description: 'Master pre-aiming and angle holding techniques',
    category: CS2Category.MECHANICS,
    level: 2,
    xpReward: 75,
    unlocked: false,
    completed: false,
    questions: [
      {
        id: 'mech_02_q1',
        type: QuestionType.MULTIPLE_CHOICE,
        category: CS2Category.MECHANICS,
        question: 'At what height should you keep your crosshair?',
        options: [
          'Head level',
          'Body level',
          'Ground level',
          'Sky level',
        ],
        correctAnswer: 0,
        explanation:
          'Always keep your crosshair at head level to get instant headshots when enemies peek.',
        xpReward: 15,
      },
      {
        id: 'mech_02_q2',
        type: QuestionType.SCENARIO,
        category: CS2Category.MECHANICS,
        question: 'You are holding an angle. Where should your crosshair be?',
        options: [
          'Slightly off the corner expecting enemy peek',
          'Directly on the corner',
          'Away from the corner',
          'Moving randomly',
        ],
        correctAnswer: 0,
        explanation:
          'Position crosshair slightly off the corner to account for peekers advantage and reaction time.',
        xpReward: 20,
      },
    ],
  },

  // Advanced Movement
  {
    id: 'move_02',
    title: 'Jump Spotting & Peeking',
    description: 'Learn advanced movement techniques for information gathering',
    category: CS2Category.MOVEMENT,
    level: 2,
    xpReward: 75,
    unlocked: false,
    completed: false,
    questions: [
      {
        id: 'move_02_q1',
        type: QuestionType.MULTIPLE_CHOICE,
        category: CS2Category.MOVEMENT,
        question: 'What is the purpose of jump spotting?',
        options: [
          'Gather information without committing',
          'Look cool',
          'Confuse enemies',
          'Waste time',
        ],
        correctAnswer: 0,
        explanation:
          'Jump spotting allows you to quickly gather information about enemy positions without exposing yourself for long.',
        xpReward: 15,
      },
      {
        id: 'move_02_q2',
        type: QuestionType.TRUE_FALSE,
        category: CS2Category.MOVEMENT,
        question: 'Wide peeking is better than shoulder peeking in all situations.',
        correctAnswer: 'false',
        explanation:
          'Wide peeking and shoulder peeking serve different purposes. Shoulder peeking baits shots and gathers info.',
        xpReward: 15,
      },
    ],
  },

  // Advanced Game Sense
  {
    id: 'game_02',
    title: 'Reading Enemy Economy',
    description: 'Predict enemy buys and adjust your strategy',
    category: CS2Category.GAMESENSE,
    level: 2,
    xpReward: 75,
    unlocked: false,
    completed: false,
    questions: [
      {
        id: 'game_02_q1',
        type: QuestionType.SCENARIO,
        category: CS2Category.GAMESENSE,
        question:
          'Enemies lost pistol and the next round. What will they likely do?',
        options: [
          'Full buy in round 3',
          'Save again',
          'Force buy pistols',
          'Quit the game',
        ],
        correctAnswer: 0,
        explanation:
          'After two lost rounds, teams typically have enough for a full buy in round 3.',
        xpReward: 20,
      },
    ],
  },

  // Advanced Utility
  {
    id: 'util_02',
    title: 'Flashbang Strategies',
    description: 'Master pop flashes and team coordination',
    category: CS2Category.UTILITY,
    level: 2,
    xpReward: 75,
    unlocked: false,
    completed: false,
    questions: [
      {
        id: 'util_02_q1',
        type: QuestionType.MULTIPLE_CHOICE,
        category: CS2Category.UTILITY,
        question: 'What is a pop flash?',
        options: [
          'A flash that explodes immediately as it comes into view',
          'A flash that bounces many times',
          'A flash thrown at the ground',
          'Any flashbang',
        ],
        correctAnswer: 0,
        explanation:
          'A pop flash is designed to detonate immediately as it enters the enemy\'s view, giving no time to look away.',
        xpReward: 15,
      },
      {
        id: 'util_02_q2',
        type: QuestionType.TRUE_FALSE,
        category: CS2Category.UTILITY,
        question: 'You should always follow up immediately after throwing a flash.',
        correctAnswer: 'false',
        explanation:
          'Wait for the flash to pop before peeking, or you might get caught in your own flash effect.',
        xpReward: 15,
      },
    ],
  },

  // Advanced Team Play
  {
    id: 'team_02',
    title: 'Trade Fragging',
    description: 'Learn how to effectively trade kills with teammates',
    category: CS2Category.TEAMPLAY,
    level: 2,
    xpReward: 75,
    unlocked: false,
    completed: false,
    questions: [
      {
        id: 'team_02_q1',
        type: QuestionType.MULTIPLE_CHOICE,
        category: CS2Category.TEAMPLAY,
        question: 'What is trade fragging?',
        options: [
          'Getting a kill on an enemy who just killed your teammate',
          'Trading weapons with teammates',
          'Swapping positions',
          'Saving weapons',
        ],
        correctAnswer: 0,
        explanation:
          'Trade fragging means immediately eliminating an enemy who killed your teammate, maintaining numerical advantage.',
        xpReward: 15,
      },
      {
        id: 'team_02_q2',
        type: QuestionType.SCENARIO,
        category: CS2Category.TEAMPLAY,
        question:
          'Your teammate pushes and gets killed. What should you do?',
        options: [
          'Immediately peek to get the trade',
          'Run away',
          'Wait 10 seconds',
          'Switch positions',
        ],
        correctAnswer: 0,
        explanation:
          'You should immediately peek to trade the kill while the enemy might be vulnerable.',
        xpReward: 20,
      },
    ],
  },
];

// Tips and tricks for each category
export const CS2_TIPS = {
  [CS2Category.MECHANICS]: [
    'Practice spray control in deathmatch for at least 15 minutes daily',
    'Always aim for the head - bodyshots should be a backup',
    'Learn the first 10 bullets of your main weapons spray pattern',
    'Use aim training maps to improve muscle memory',
  ],
  [CS2Category.MOVEMENT]: [
    'Always counter-strafe before shooting for maximum accuracy',
    'Learn to jiggle peek to bait AWP shots',
    'Use crouch peeking in unexpected situations',
    'Master the art of silent walking for sneaky plays',
  ],
  [CS2Category.GAMESENSE]: [
    'Always track enemy economy and utility usage',
    'Learn common timings for different maps',
    'Use sound cues to predict enemy positions',
    'Understand when to save and when to force',
  ],
  [CS2Category.UTILITY]: [
    'Learn at least 3 smokes per map you play',
    'Practice one-way smokes for site holds',
    'Use molotovs to delay pushes and deny plant positions',
    'Save utility for retakes or executes',
  ],
  [CS2Category.TEAMPLAY]: [
    'Communication should be clear, concise, and timely',
    'Play default positions until you have information',
    'Support your teammates with utility and trades',
    'Avoid baiting - play with your team',
  ],
};

// Map-specific content structure (for future expansion)
export const MAP_LESSONS = {
  dust2: {
    name: 'Dust II',
    icon: '🏜️',
    lessons: [],
  },
  mirage: {
    name: 'Mirage',
    icon: '🌴',
    lessons: [],
  },
  inferno: {
    name: 'Inferno',
    icon: '🔥',
    lessons: [],
  },
  nuke: {
    name: 'Nuke',
    icon: '☢️',
    lessons: [],
  },
  vertigo: {
    name: 'Vertigo',
    icon: '🏢',
    lessons: [],
  },
};
