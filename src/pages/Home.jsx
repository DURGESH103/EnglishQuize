import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Users, Zap } from 'lucide-react';
import GameCard from '../components/GameCard';

const Home = () => {
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

  const stats = [
    { label: 'Words Learned', value: '1,234', icon: BookOpen },
    { label: 'XP Earned', value: '5,678', icon: Zap },
    { label: 'Streak Days', value: '12', icon: Trophy },
    { label: 'Rank', value: '#42', icon: Users },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Learn English
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
            {' '}Through Games
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Improve your English skills with fun, interactive games. Earn points, unlock achievements, and compete with friends!
        </p>
        <Link to="/learn" className="btn btn-primary text-lg px-8 py-3">
          Start Learning
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
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

      {/* Games Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Choose Your Game
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <GameCard key={game.type} game={game} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
