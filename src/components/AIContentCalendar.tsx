import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { generatePrompt } from '../lib/openai';
import { generateImage } from '../lib/ideogram';
import toast from 'react-hot-toast';

// ... (previous imports and interfaces remain the same)

export default function AIContentCalendar() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<CalendarData>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTestingImage, setIsTestingImage] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [userMetadata, setUserMetadata] = useState<UserMetadata | null>(null);
  const [testImage, setTestImage] = useState<string | null>(null);

  // ... (previous useEffect and other functions remain the same)

  const handleTestImageGeneration = async () => {
    if (!userMetadata) {
      toast.error('Please set up your profile preferences first');
      return;
    }

    setIsTestingImage(true);
    try {
      const testContent = "A professional social media post about digital marketing and business growth";
      const imageUrl = await generateImage(testContent, userMetadata);
      
      if (imageUrl) {
        setTestImage(imageUrl);
        toast.success('Test image generated successfully!');
      } else {
        throw new Error('Failed to generate test image');
      }
    } catch (error) {
      console.error('Error generating test image:', error);
      toast.error('Failed to generate test image');
    } finally {
      setIsTestingImage(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ... (previous calendar navigation code remains the same) */}

      <div className="flex gap-8">
        <div className="w-1/4 space-y-4">
          <div className="glass-effect p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">Generate Content</h3>
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={generateContent}
                disabled={isGenerating}
                className="w-full bg-accent text-dark py-2 rounded-full font-semibold hover:bg-white transition-colors duration-300 disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'Generate 30 Days'}
              </motion.button>

              {/* Test Image Generation Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTestImageGeneration}
                disabled={isTestingImage}
                className="w-full bg-white/10 text-white py-2 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300 disabled:opacity-50"
              >
                {isTestingImage ? 'Generating Test Image...' : 'Generate Test Image'}
              </motion.button>

              {/* Test Image Preview */}
              {testImage && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Test Image Preview:</h4>
                  <img 
                    src={testImage} 
                    alt="Test generated image" 
                    className="w-full h-auto rounded-lg"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTestImage(null)}
                    className="mt-2 w-full bg-red-500/20 text-red-400 py-1 rounded-full text-sm hover:bg-red-500/30 transition-colors duration-300"
                  >
                    Clear Test Image
                  </motion.button>
                </div>
              )}
            </div>
            {currentPrompt && (
              <div className="mt-4 text-sm text-gray-300">{currentPrompt}</div>
            )}
          </div>

          <div className="glass-effect p-6 rounded-xl">
            <h3 className="text-lg font-bold text-white mb-2">Current Prompt</h3>
            <textarea
              value={currentPrompt}
              readOnly
              className="w-full h-40 bg-white/10 rounded-lg p-4 text-gray-300 text-sm"
            />
          </div>
        </div>

        {/* ... (rest of the calendar code remains the same) */}
      </div>
    </div>
  );
}