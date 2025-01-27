import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { generatePrompt } from '../lib/openai';
import { generateImage } from '../lib/ideogram';
import toast from 'react-hot-toast';
import SocialMediaConnector from '../components/SocialMediaConnector';
import { Post } from '../types/post';
import { DashboardStats, TabType } from '../types/dashboard';
import CalendarTab from './Dashboard/Calendar';
import EditorTab from './Dashboard/Editor';
import AnalyticsTab from './Dashboard/Analytics';
import ProfileTab from './Dashboard/Profile';
import CustomCalendarTab from './Dashboard/CustomCalendar';

export default function Dashboard() {
  const { user } = useAuth();
  const [ref, inView] = useInView({ triggerOnce: true });
  const [activeTab, setActiveTab] = useState<TabType>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [posts, setPosts] = useState<Post[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    scheduledPosts: 0,
    engagement: 0
  });
  const [metadata, setMetadata] = useState<any>(null);

  const tabs: { id: TabType; name: string; icon: string }[] = [
    { id: 'calendar', name: 'Kalendarz AI', icon: '🤖' },
    { id: 'custom-calendar', name: 'Własny kalendarz', icon: '📅' },
    { id: 'analytics', name: 'Analityka', icon: '📊' },
    { id: 'social', name: 'Social Media', icon: '🌐' },
    { id: 'profile', name: 'Profil', icon: '👤' }
  ];

  useEffect(() => {
    if (user) {
      fetchPosts();
      updateStats();
      fetchMetadata();
    }
  }, [user]);

  const fetchMetadata = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('metadata')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setMetadata(data.metadata);
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('profile_id', user?.id)
        .order('date', { ascending: true });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Nie udało się pobrać postów');
    }
  };

  const updateStats = async () => {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .eq('profile_id', user?.id);

      if (postsError) throw postsError;

      const totalPosts = postsData?.length || 0;
      const publishedPosts = postsData?.filter(post => post.published)?.length || 0;
      const scheduledPosts = totalPosts - publishedPosts;

      setStats({
        totalPosts,
        publishedPosts,
        scheduledPosts,
        engagement: Math.round(Math.random() * 100)
      });
    } catch (error) {
      console.error('Error updating stats:', error);
    }
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const post = getPostForDate(date);
    if (post) {
      setEditedContent(post.content);
    } else {
      setEditedContent('');
    }
    setIsEditing(false);
  };

  const getPostForDate = (date: Date) => {
    return posts.find(post => {
      const postDate = new Date(post.date);
      return postDate.toDateString() === date.toDateString();
    });
  };

  const generatePosts = async (days: number = 30) => {
    setIsGenerating(true);
    setGenerationProgress(0);
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('metadata')
        .eq('id', user?.id)
        .single();

      if (profileError) throw profileError;

      const startDate = selectedDate;
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + (days - 1));

      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        
        // Check if post exists using maybeSingle() instead of single()
        const { data: existingPost } = await supabase
          .from('posts')
          .select('id')
          .eq('profile_id', user?.id)
          .eq('date', dateStr)
          .maybeSingle();

        const content = await generatePrompt(profileData.metadata, currentDate);
        const imageUrl = await generateImage(content, profileData.metadata);

        if (existingPost) {
          // Update existing post
          const { error: updateError } = await supabase
            .from('posts')
            .update({
              content: content,
              image_url: imageUrl
            })
            .eq('id', existingPost.id);

          if (updateError) throw updateError;
        } else {
          // Insert new post
          const { error: insertError } = await supabase
            .from('posts')
            .insert([{
              profile_id: user?.id,
              date: dateStr,
              content: content,
              image_url: imageUrl
            }]);

          if (insertError) throw insertError;
        }

        currentDate.setDate(currentDate.getDate() + 1);
        setGenerationProgress((currentDate.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime()) * 100);
      }

      await fetchPosts();
      toast.success(days === 1 ? 'Post został wygenerowany' : 'Posty zostały wygenerowane');
    } catch (error: any) {
      console.error('Error generating posts:', error);
      toast.error(error.message || 'Nie udało się wygenerować postów');
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const post = getPostForDate(selectedDate);
      if (!post) {
        throw new Error('Brak posta do edycji');
      }

      const { error } = await supabase
        .from('posts')
        .update({ content: editedContent })
        .eq('id', post.id);

      if (error) throw error;

      await fetchPosts();
      setIsEditing(false);
      toast.success('Post został zaktualizowany');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Nie udało się zaktualizować posta');
    }
  };

  const handlePublishPost = async () => {
    setIsPublishing(true);
    try {
      const post = getPostForDate(selectedDate);
      if (!post) {
        throw new Error('Brak posta do publikacji');
      }

      const { data: accounts } = await supabase
        .from('social_media_accounts')
        .select('*')
        .eq('profile_id', user?.id)
        .eq('is_connected', true);

      if (!accounts || accounts.length === 0) {
        throw new Error('Brak podłączonych kont social media');
      }

      for (const account of accounts) {
        if (account.platform === 'facebook') {
          await window.FB.api(
            `/${account.account_id}/feed`,
            'POST',
            {
              message: post.content,
              access_token: account.access_token,
              url: post.image_url
            }
          );
        } else if (account.platform === 'instagram') {
          const containerResponse = await window.FB.api(
            `/${account.account_id}/media`,
            'POST',
            {
              image_url: post.image_url,
              caption: post.content,
              access_token: account.access_token
            }
          );

          if (containerResponse.id) {
            await window.FB.api(
              `/${account.account_id}/media_publish`,
              'POST',
              {
                creation_id: containerResponse.id,
                access_token: account.access_token
              }
            );
          }
        }
      }

      const { error: updateError } = await supabase
        .from('posts')
        .update({ published: true, published_at: new Date().toISOString() })
        .eq('id', post.id);

      if (updateError) throw updateError;

      await fetchPosts();
      toast.success('Post został opublikowany');
    } catch (error: any) {
      console.error('Error publishing post:', error);
      toast.error(error.message || 'Nie udało się opublikować posta');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-center">
          <div className="glass-effect rounded-full p-2">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
                    activeTab === tab.id
                      ? 'bg-accent text-dark'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {activeTab === 'calendar' && (
          <div className="space-y-8">
            <CalendarTab
              selectedDate={selectedDate}
              posts={posts}
              isGenerating={isGenerating}
              onDateChange={handleDateChange}
              onGeneratePosts={generatePosts}
              getPostForDate={getPostForDate}
              generationProgress={generationProgress}
            />
            <EditorTab
              selectedDate={selectedDate}
              editedContent={editedContent}
              isEditing={isEditing}
              isPublishing={isPublishing}
              getPostForDate={getPostForDate}
              onEditContent={setEditedContent}
              onStartEditing={() => {
                setEditedContent(getPostForDate(selectedDate)?.content || '');
                setIsEditing(true);
              }}
              onCancelEditing={() => {
                setIsEditing(false);
                setEditedContent(getPostForDate(selectedDate)?.content || '');
              }}
              onSaveEdit={handleSaveEdit}
              onPublishPost={handlePublishPost}
              metadata={metadata}
            />
          </div>
        )}

        {activeTab === 'analytics' && <AnalyticsTab stats={stats} />}
        {activeTab === 'social' && <SocialMediaConnector />}
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'custom-calendar' && <CustomCalendarTab />}
      </div>
    </div>
  );
}