import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CheckCircle, XCircle } from 'lucide-react';

const SortableItem = ({ id, children, isCorrect, isMatched }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-3 md:p-4 rounded-lg border-2 cursor-grab active:cursor-grabbing transition-all ${
        isMatched
          ? 'border-green-500 bg-green-50 dark:bg-green-900'
          : isCorrect === false
          ? 'border-red-500 bg-red-50 dark:bg-red-900'
          : 'border-gray-200 dark:border-gray-600 hover:border-primary-500'
      }`}
    >
      <div className="flex items-center justify-between">
        {children}
        <AnimatePresence>
          {isMatched && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <CheckCircle className="h-5 w-5 text-green-500" />
            </motion.div>
          )}
          {isCorrect === false && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <XCircle className="h-5 w-5 text-red-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const WordMatchGame = ({ question, onComplete }) => {
  const [words, setWords] = useState([]);
  const [meanings, setMeanings] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    // Shuffle words and meanings
    const shuffledWords = [...question.words].sort(() => Math.random() - 0.5);
    const shuffledMeanings = [...question.meanings].sort(() => Math.random() - 0.5);

    setWords(shuffledWords);
    setMeanings(shuffledMeanings);
  }, [question]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Check if dragging from words to meanings
    if (activeId.startsWith('word-') && overId.startsWith('meaning-')) {
      const wordIndex = parseInt(activeId.split('-')[1]);
      const meaningIndex = parseInt(overId.split('-')[1]);

      const word = words[wordIndex];
      const meaning = meanings[meaningIndex];

      // Check if this is a correct match
      const correctMeaningIndex = question.meanings.indexOf(
        question.meanings[question.words.indexOf(word)]
      );

      const isCorrect = meaningIndex === correctMeaningIndex;

      setMatchedPairs(prev => ({
        ...prev,
        [word]: {
          meaning,
          isCorrect,
          meaningIndex
        }
      }));

      // Remove matched items after a delay
      if (isCorrect) {
        setTimeout(() => {
          setWords(prev => prev.filter((_, i) => i !== wordIndex));
          setMeanings(prev => prev.filter((_, i) => i !== meaningIndex));
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (words.length === 0 && meanings.length === 0 && Object.keys(matchedPairs).length > 0) {
      const allCorrect = Object.values(matchedPairs).every(pair => pair.isCorrect);
      setIsComplete(true);
      setShowResult(true);

      setTimeout(() => {
        onComplete(allCorrect);
      }, 2000);
    }
  }, [words, meanings, matchedPairs, onComplete]);

  if (isComplete && showResult) {
    const allCorrect = Object.values(matchedPairs).every(pair => pair.isCorrect);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="text-6xl mb-4">{allCorrect ? '🎉' : '😅'}</div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {allCorrect ? 'Perfect Match!' : 'Good Try!'}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {allCorrect ? 'All words matched correctly!' : 'Some matches were incorrect.'}
        </p>
      </motion.div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-6">
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Drag words to match them with their meanings
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Words Column */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Words</h3>
            <SortableContext items={words.map((_, i) => `word-${i}`)} strategy={verticalListSortingStrategy}>
              {words.map((word, index) => (
                <SortableItem
                  key={`word-${index}`}
                  id={`word-${index}`}
                  isCorrect={matchedPairs[word]?.isCorrect}
                  isMatched={matchedPairs[word]?.isCorrect === true}
                >
                  <span className="text-gray-900 dark:text-white font-medium">{word}</span>
                </SortableItem>
              ))}
            </SortableContext>
          </div>

          {/* Meanings Column */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Meanings</h3>
            <SortableContext items={meanings.map((_, i) => `meaning-${i}`)} strategy={verticalListSortingStrategy}>
              {meanings.map((meaning, index) => (
                <SortableItem
                  key={`meaning-${index}`}
                  id={`meaning-${index}`}
                  isCorrect={false}
                  isMatched={false}
                >
                  <span className="text-gray-600 dark:text-gray-300">{meaning}</span>
                </SortableItem>
              ))}
            </SortableContext>
          </div>
        </div>

        {/* Matched Pairs Display */}
        {Object.keys(matchedPairs).length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Matched Pairs:</h4>
            <div className="space-y-2">
              {Object.entries(matchedPairs).map(([word, data]) => (
                <div key={word} className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-white">{word}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-gray-600 dark:text-gray-300">{data.meaning}</span>
                  {data.isCorrect ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DndContext>
  );
};

export default WordMatchGame;
