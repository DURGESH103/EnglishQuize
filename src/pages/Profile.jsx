import { motion } from 'framer-motion';
import { Trophy, Star, Flame, Target, Award } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';

const Profile = () => {
  const user = {
    name: 'Alex Johnson',
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    streak: 7,
    totalGames: 45,
    correctAnswers: 38,
    badges: [
      { name: 'Word Master', icon: '📚', earned: true },
      { name: 'Grammar Guru', icon: '✍️', earned: true },
      { name: 'Spelling Champion', icon: '🎯', earned: false },
      { name: 'Streak Master', icon: '🔥', earned: true },
    ]
  };

  const stats = [
    { label: 'Total XP', value: user.xp, icon: Star },
    { label: 'Current Streak', value: `${user.streak} days`, icon: Flame },
    { label: 'Games Played', value: user.totalGames, icon: Target },
    { label: 'Accuracy', value: `${Math.round((user.correctAnswers / user.totalGames) * 100)}%`, icon: Trophy },
  ];

  const progressPercent = (user.xp / user.xpToNext) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card text-center"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
          👤
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {user.name}
        </h1>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <span className="text-lg text-gray-600 dark:text-gray-300">
            Level {user.level}
          </span>
          <span className="text-lg text-primary-500 font-semibold">
            {user.xp} XP
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>Progress to Level {user.level + 1}</span>
            <span>{user.xp}/{user.xpToNext} XP</span>
          </div>
          <ProgressBar progress={progressPercent} />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <div key={index} className="card text-center">
            <stat.icon className="h-8 w-8 text-primary-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Award className="h-6 w-6 mr-2" />
          Achievements
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {user.badges.map((badge, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                badge.earned
                  ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900'
                  : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
              }`}
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <div className={`text-sm font-semibold ${
                badge.earned
                  ? 'text-yellow-800 dark:text-yellow-200'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {badge.name}
              </div>
              {!badge.earned && (
                <div className="text-xs text-gray-400 mt-1">Not earned yet</div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
