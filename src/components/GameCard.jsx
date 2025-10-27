import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';

const GameCard = ({ game }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="card group cursor-pointer"
    >
      <Link to={`/play/${game.type}`}>
        <div className="relative overflow-hidden rounded-t-xl">
          <div className={`h-32 bg-gradient-to-br ${game.gradient} flex items-center justify-center`}>
            <game.icon className="h-16 w-16 text-white" />
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {game.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
            {game.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {game.difficulty}
              </span>
            </div>
            <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full">
              {game.points} XP
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default GameCard;
