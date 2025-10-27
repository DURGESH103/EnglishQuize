import { motion } from 'framer-motion';
import { BookOpen, Zap, Users, Trophy } from 'lucide-react';
import GameCard from '../components/GameCard';

const Learn = () => {
  const games = [
    {
      type: 'vocabulary',
      title: 'Vocabulary Quiz',
      description: 'Test your word knowledge with multiple choice questions',
      icon: BookOpen,
      gradient: 'from-blue-500 to-purple-600',
      difficulty: 'Easy',
      points: 10,
    },
    {
      type: 'spelling',
      title: 'Spelling Bee',
      description: 'Spell words correctly after hearing them',
      icon: Zap,
      gradient: 'from-green-500 to-teal-600',
      difficulty: 'Medium',
      points: 15,
    },
    {
      type: 'grammar',
      title: 'Grammar Challenge',
      description: 'Fill in the blanks and correct grammar mistakes',
      icon: Users,
      gradient: 'from-orange-500 to-red-600',
      difficulty: 'Hard',
      points: 20,
    },
    {
      type: 'match',
      title: 'Word Match',
      description: 'Match words with their meanings by dragging',
      icon: Trophy,
      gradient: 'from-pink-500 to-rose-600',
      difficulty: 'Medium',
      points: 12,
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Choose Your Learning Adventure
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Select a game to start improving your English skills
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {games.map((game, index) => (
          <GameCard key={game.type} game={game} />
        ))}
      </motion.div>
    </div>
  );
};

export default Learn;
