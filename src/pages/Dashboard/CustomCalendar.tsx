import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { CustomPost } from '../../types/dashboard';
import toast from 'react-hot-toast';

interface VideoPost extends CustomPost {
  video_url?: string;
  duration?: number;
  hashtags?: string[];
  platforms: {
    tiktok: boolean;
    instagram_reels: boolean;
    facebook_reels: boolean;
  };
  video_type: 'tutorial' | 'entertainment' | 'challenge' | 'trend' | 'product';
}

export default function CustomCalendarTab() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [customPosts, setCustomPosts] = useState<VideoPost[]>([]);
  const [content, setContent] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState('');
  const [platforms, setPlatforms] = useState({
    tiktok: true,
    instagram_reels: false,
    facebook_reels: false
  });
  const [videoType, setVideoType] = useState<'tutorial' | 'entertainment' | 'challenge' | 'trend' | 'product'>('entertainment');
  const [duration, setDuration] = useState<number>(0);

  const videoTypes = {
    tutorial: 'Tutorial/How-to',
    entertainment: 'Rozrywka',
    challenge: 'Challenge',
    trend: 'Trend',
    product: 'Produkt/Usługa'
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_posts')
        .select('*')
        .eq('profile_id', user?.id)
        .order('date', { ascending: true });

      if (error) throw error;
      setCustomPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Nie udało się pobrać postów');
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 200 * 1024 * 1024) { // 200MB limit
        toast.error('Plik jest za duży. Maksymalny rozmiar to 200MB');
        return;
      }

      setVideoFile(file);
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);

      // Get video duration
      const video = document.createElement('video');
      video.src = videoUrl;
      video.onloadedmetadata = () => {
        setDuration(Math.round(video.duration));
      };
    }
  };

  const handleAddHashtag = () => {
    if (newHashtag && !hashtags.includes(newHashtag)) {
      setHashtags([...hashtags, newHashtag]);
      setNewHashtag('');
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };

  const handlePlatformChange = (platform: keyof typeof platforms) => {
    setPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  const handlePublish = async () => {
    if (!videoFile) {
      toast.error('Dodaj plik wideo');
      return;
    }

    if (!content) {
      toast.error('Dodaj opis');
      return;
    }

    if (!Object.values(platforms).some(v => v)) {
      toast.error('Wybierz przynajmniej jedną platformę');
      return;
    }

    setIsPublishing(true);
    try {
      // Upload video
      const videoFileName = `${Date.now()}-${videoFile.name}`;
      const videoPath = `${user?.id}/${videoFileName}`;

      const { error: uploadError } = await supabase.storage
        .from('post-videos')
        .upload(videoPath, videoFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl: videoUrl } } = supabase.storage
        .from('post-videos')
        .getPublicUrl(videoPath);

      const newPost: VideoPost = {
        profile_id: user?.id,
        date: selectedDate.toISOString().split('T')[0],
        content,
        video_url: videoUrl,
        duration,
        hashtags,
        platforms,
        video_type: videoType
      };

      const { error } = await supabase
        .from('custom_posts')
        .insert([newPost])
        .select()
        .single();

      if (error) throw error;

      toast.success('Post został zapisany');
      setContent('');
      setVideoFile(null);
      setVideoPreview(null);
      setHashtags([]);
      setPlatforms({
        tiktok: true,
        instagram_reels: false,
        facebook_reels: false
      });
      setDuration(0);
      await fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Nie udało się zapisać posta');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-effect rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Własny kalendarz - TikTok & Reels</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Calendar
              onChange={setSelectedDate}
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
                const post = customPosts.find(p => p.date === date.toISOString().split('T')[0]);
                return post ? 'has-post' : '';
              }}
            />
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Platformy
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={platforms.tiktok}
                    onChange={() => handlePlatformChange('tiktok')}
                    className="rounded border-gray-600 bg-white/10 text-accent focus:ring-accent"
                  />
                  <span className="text-white">TikTok</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={platforms.instagram_reels}
                    onChange={() => handlePlatformChange('instagram_reels')}
                    className="rounded border-gray-600 bg-white/10 text-accent focus:ring-accent"
                  />
                  <span className="text-white">Instagram Reels</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={platforms.facebook_reels}
                    onChange={() => handlePlatformChange('facebook_reels')}
                    className="rounded border-gray-600 bg-white/10 text-accent focus:ring-accent"
                  />
                  <span className="text-white">Facebook Reels</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Typ wideo
              </label>
              <div className="relative">
                <select
                  value={videoType}
                  onChange={(e) => setVideoType(e.target.value as any)}
                  className="w-full rounded-lg bg-white/10 text-white p-3 appearance-none cursor-pointer focus:ring-2 focus:ring-accent focus:outline-none"
                >
                  {Object.entries(videoTypes).map(([value, label]) => (
                    <option key={value} value={value} className="bg-gray-900">{label}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Wideo (max 200MB)
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="w-full rounded-lg bg-white/10 text-white p-3"
              />
            </div>

            {videoPreview && (
              <div>
                <video
                  src={videoPreview}
                  controls
                  className="w-full rounded-lg"
                  style={{ maxHeight: '400px' }}
                />
                {duration > 0 && (
                  <p className="text-sm text-gray-300 mt-2">
                    Długość: {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Opis
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-32 rounded-lg bg-white/10 text-white p-3"
                placeholder="Dodaj opis..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Hashtagi
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newHashtag}
                  onChange={(e) => setNewHashtag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddHashtag()}
                  placeholder="Dodaj hashtag"
                  className="flex-1 rounded-lg bg-white/10 text-white p-3"
                />
                <button
                  onClick={handleAddHashtag}
                  className="px-4 py-2 bg-accent text-dark rounded-lg font-semibold hover:bg-white transition-colors duration-300"
                >
                  Dodaj
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 rounded-full text-white flex items-center gap-2"
                  >
                    #{tag}
                    <button
                      onClick={() => handleRemoveHashtag(tag)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePublish}
              disabled={isPublishing || !videoFile}
              className="w-full bg-accent text-dark py-3 rounded-full font-semibold hover:bg-white transition-colors duration-300 disabled:opacity-50"
            >
              {isPublishing ? 'Publikowanie...' : 'Opublikuj post'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}