import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';

const LeaderboardPage = () => {
  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', xp: 8750, level: 25, avatar: '👑' },
    { rank: 2, name: 'Mike Johnson', xp: 8420, level: 24, avatar: '🥈' },
    { rank: 3, name: 'Emma Davis', xp: 7890, level: 23, avatar: '🥉' },
    { rank: 4, name: 'Alex Rodriguez', xp: 7560, level: 22, avatar: '🏅' },
    { rank: 5, name: 'Lisa Wang', xp: 7230, level: 21, avatar: '⭐' },
    { rank: 6, name: 'Tom Brown', xp: 6980, level: 20, avatar: '🌟' },
    { rank: 7, name: 'Anna Smith', xp: 6750, level: 19, avatar: '💎' },
    { rank: 8, name: 'David Lee', xp: 6420, level: 18, avatar: '🔥' },
    { rank: 9, name: 'Maria Garcia', xp: 6180, level: 17, avatar: '⚡' },
    { rank: 10, name: 'James Wilson', xp: 5950, level: 16, avatar: '🎯' },
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600 dark:text-gray-300">#{rank}</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Leaderboard
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          See how you rank against other learners
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="space-y-4">
          {leaderboard.map((player, index) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-lg ${
                player.rank <= 3
                  ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10">
                  {getRankIcon(player.rank)}
                </div>
                <div className="text-2xl">{player.avatar}</div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {player.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Level {player.level}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary-500">
                  {player.xp.toLocaleString()} XP
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Current User Position */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card border-2 border-primary-500"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-10 h-10">
              <span className="text-lg font-bold text-primary-500">#42</span>
            </div>
            <div className="text-2xl">👤</div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                You (Alex Johnson)
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Level 12
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary-500">
              2,450 XP
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              550 XP to next rank
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LeaderboardPage;
