import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, Home, Volume2, HelpCircle } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import WordMatchGame from '../components/WordMatchGame';
import data from '../data/data.json';

const Play = () => {
  const { gameType } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Load questions from data.json
  const questions = {
    vocabulary: data.vocabulary.map(item => ({
      question: `What does '${item.word}' mean?`,
      options: item.options,
      correct: item.correct,
      explanation: item.definition
    })),
    spelling: data.spelling.map(item => ({
      question: `Spell the word: '${item.word}'`,
      correct: item.word,
      phonetic: item.phonetic,
      hint: `Difficulty: ${item.difficulty}`
    })),
    grammar: data.grammar.map(item => ({
      question: item.question,
      options: item.options,
      correct: item.correct,
      explanation: item.explanation
    })),
    match: data.wordMatch.reduce((acc, item, index) => {
      const existingGroup = acc.find(group => group.category === item.category);
      if (existingGroup) {
        existingGroup.words.push(item.word);
        existingGroup.meanings.push(item.meaning);
      } else {
        acc.push({
          category: item.category,
          words: [item.word],
          meanings: [item.meaning],
          correct: []
        });
      }
      return acc;
    }, [])
  };

  const currentQ = questions[gameType]?.[currentQuestion];
  const progress = ((currentQuestion + 1) / questions[gameType]?.length) * 100;

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQ.correct;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (currentQuestion < questions[gameType].length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setGameCompleted(true);
      }
    }, 1500);
  };

  const handleSpellingSubmit = (spelling) => {
    const correct = spelling.toLowerCase() === currentQ.correct.toLowerCase();
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 15);
    }
    setTimeout(() => {
      if (currentQuestion < questions[gameType].length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setGameCompleted(true);
      }
    }, 1500);
  };

  if (!questions[gameType]) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Game not found</h1>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Go Home
        </button>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card text-center max-w-md mx-auto"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Congratulations!
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          You scored {score} points!
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </button>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-secondary"
          >
            Play Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="mb-6 md:mb-8">
        <ProgressBar progress={progress} />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Question {currentQuestion + 1} of {questions[gameType].length}
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Score: {score}
          </span>
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="card"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
          {currentQ.question}
        </h2>

        {gameType === 'vocabulary' || gameType === 'grammar' ? (
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-3 md:p-4 text-left rounded-lg border-2 transition-all text-sm md:text-base ${
                  selectedAnswer === null
                    ? 'border-gray-200 dark:border-gray-600 hover:border-primary-500'
                    : selectedAnswer === index
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900'
                      : 'border-red-500 bg-red-50 dark:bg-red-900'
                    : index === currentQ.correct && selectedAnswer !== null
                    ? 'border-green-500 bg-green-50 dark:bg-green-900'
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white">{option}</span>
                  <AnimatePresence>
                    {selectedAnswer === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        {isCorrect ? (
                          <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ))}
          </div>
        ) : gameType === 'spelling' ? (
          <SpellingGame
            question={currentQ}
            onSubmit={handleSpellingSubmit}
            isCorrect={isCorrect}
          />
        ) : gameType === 'match' ? (
          <WordMatchGame
            question={currentQ}
            onComplete={(correct) => {
              if (correct) setScore(score + 12);
              setTimeout(() => {
                if (currentQuestion < questions[gameType].length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                } else {
                  setGameCompleted(true);
                }
              }, 2000);
            }}
          />
        ) : (
          <div>Game type not supported</div>
        )}

        {selectedAnswer !== null && currentQ.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 dark:bg-blue-900 rounded-lg"
          >
            <p className="text-sm md:text-base text-blue-800 dark:text-blue-200">{currentQ.explanation}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

const SpellingGame = ({ question, onSubmit, isCorrect }) => {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!input.trim()) return;
    setSubmitted(true);
    onSubmit(input);
  };

  useEffect(() => {
    if (isCorrect !== null) {
      setSubmitted(false);
      setInput('');
    }
  }, [isCorrect]);

  return (
    <div className="space-y-4">
      <p className="text-gray-600 dark:text-gray-300">{question.hint}</p>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          className="input flex-1"
          placeholder="Type your answer..."
          disabled={submitted}
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || submitted}
          className="btn btn-primary w-full sm:w-auto"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {submitted && (
        <div className={`p-3 md:p-4 rounded-lg text-sm md:text-base ${isCorrect ? 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>
          {isCorrect ? 'Correct!' : `Incorrect. The correct spelling is: ${question.correct}`}
        </div>
      )}
    </div>
  );
};

export default Play;
