import React from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { Post } from '../../types/post';
import TokenDisplay from '../../components/TokenDisplay';
import { useTokens } from '../../hooks/useTokens';
import toast from 'react-hot-toast';

interface CalendarTabProps {
  selectedDate: Date;
  posts: Post[];
  isGenerating: boolean;
  onDateChange: (date: Date) => void;
  onGeneratePosts: (days?: number) => Promise<void>;
  getPostForDate: (date: Date) => Post | undefined;
  generationProgress?: number;
}

export default function CalendarTab({
  selectedDate,
  posts,
  isGenerating,
  onDateChange,
  onGeneratePosts,
  getPostForDate,
  generationProgress = 0
}: CalendarTabProps) {
  const { tokenBalance, deductTokens } = useTokens();

  const handleGeneratePosts = async (days: number = 30) => {
    // Sprawdzamy czy użytkownik ma wystarczającą liczbę tokenów
    const tokensNeededPerDay = 9; // 8 (obraz) + 1 (opis)
    const totalTokensNeeded = tokensNeededPerDay * days;

    if (tokenBalance < totalTokensNeeded) {
      toast.error(`Niewystarczająca liczba tokenów. Potrzebujesz ${totalTokensNeeded} tokenów.`);
      return;
    }

    try {
      await onGeneratePosts(days);
      // Odejmujemy tokeny po udanym wygenerowaniu
      for (let i = 0; i < days; i++) {
        await deductTokens('image');
        await deductTokens('description');
      }
    } catch (error) {
      console.error('Error generating posts:', error);
      toast.error('Nie udało się wygenerować postów');
    }
  };

  const handleGenerateSinglePost = async () => {
    const post = getPostForDate(selectedDate);
    if (post) {
      toast.error('Post dla tego dnia już istnieje');
      return;
    }
    await handleGeneratePosts(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-effect rounded-xl p-8"
    >
      <TokenDisplay tokenBalance={tokenBalance} />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Kalendarz postów</h2>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerateSinglePost}
            disabled={isGenerating}
            className="bg-white/10 text-white px-4 py-2 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300 disabled:opacity-50"
          >
            {isGenerating ? 'Generowanie...' : 'Generuj dla wybranego dnia'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGeneratePosts(30)}
            disabled={isGenerating}
            className="bg-accent text-dark px-4 py-2 rounded-full font-semibold hover:bg-white transition-colors duration-300 disabled:opacity-50"
          >
            {isGenerating ? 'Generowanie...' : 'Generuj posty na 30 dni'}
          </motion.button>
        </div>
      </div>

      {isGenerating && (
        <div className="mb-6">
          <div className="w-full bg-white/10 rounded-full h-4 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${generationProgress}%` }}
              transition={{ duration: 0.5 }}
              className="bg-accent h-full rounded-full"
            />
          </div>
          <p className="text-center text-sm text-gray-300">
            Generowanie postów: {Math.round(generationProgress)}%
          </p>
        </div>
      )}

      <Calendar
        onChange={onDateChange}
        value={selectedDate}
        formatShortWeekday={(locale, date) => ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'][date.getDay()]}
        formatMonthYear={(locale, date) => {
          const months = [
            'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
            'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
          ];
          return `${months[date.getMonth()]} ${date.getFullYear()}`;
        }}
        className="w-full"
        tileClassName={({ date }) => {
          const post = getPostForDate(date);
          if (!post) return '';
          return post.published ? 'has-post published' : 'has-post';
        }}
      />
    </motion.div>
  );
}