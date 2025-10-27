import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, BookOpen, Trophy, User, Volume2, Sparkles } from 'lucide-react';
import GameCard from '../components/GameCard';
import data from '../data/data.json';

const Home = () => {
  const games = [
    {
      type: 'vocabulary',
      title: 'Vocabulary Quiz',
      description: 'Test your knowledge of English words and their meanings',
      icon: BookOpen,
      gradient: 'from-blue-500 to-blue-600',
      difficulty: 'Easy',
      points: 10,
    },
    {
      type: 'spelling',
      title: 'Spelling Bee',
      description: 'Spell challenging English words correctly with audio hints',
      icon: Volume2,
      gradient: 'from-green-500 to-green-600',
      difficulty: 'Medium',
      points: 15,
    },
    {
      type: 'grammar',
      title: 'Grammar Challenge',
      description: 'Master English grammar rules and structures',
      icon: BookOpen,
      gradient: 'from-purple-500 to-purple-600',
      difficulty: 'Hard',
      points: 20,
    },
    {
      type: 'match',
      title: 'Word Match',
      description: 'Match words with their correct meanings using drag & drop',
      icon: Play,
      gradient: 'from-orange-500 to-orange-600',
      difficulty: 'Medium',
      points: 12,
    }
  ];

  const dailyChallenge = data.dailyChallenge;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Learn & Play English
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 block sm:inline">
                {' '}Through Games
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Master English through fun, interactive games designed for all levels
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/learn" className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
                Start Learning
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Daily Challenge Section */}
      <section className="py-12 bg-yellow-50 dark:bg-yellow-900/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="card border-yellow-200 dark:border-yellow-700 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Daily Challenge
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Word of the Day: {dailyChallenge.word}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {dailyChallenge.definition}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    "{dailyChallenge.example}"
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-primary flex-1"
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Listen to Pronunciation
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn bg-purple-500 hover:bg-purple-600 text-white flex-1"
                  >
                    Explain Word
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Game
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Select from our collection of engaging English learning games. Each game is designed to help you improve different aspects of English proficiency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GameCard game={game} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Learn with Us?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our gamified approach makes learning English fun and effective for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Interactive Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Engage with dynamic content that adapts to your learning pace and style.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Gamified Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Earn points, unlock achievements, and compete with friends as you learn.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Personalized Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track your improvement with detailed statistics and personalized recommendations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
