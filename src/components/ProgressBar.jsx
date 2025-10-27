import { motion } from 'framer-motion';

const ProgressBar = ({ progress, className = '' }) => {
  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 md:h-3 ${className}`}>
      <motion.div
        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 md:h-3 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
};

export default ProgressBar;
