import React from 'react';
import { motion } from 'framer-motion';
import { Post } from '../../types/post';
import { regenerateImageForPost } from '../../lib/ideogram';
import toast from 'react-hot-toast';

interface EditorTabProps {
  selectedDate: Date;
  editedContent: string;
  isEditing: boolean;
  isPublishing: boolean;
  getPostForDate: (date: Date) => Post | undefined;
  onEditContent: (content: string) => void;
  onStartEditing: () => void;
  onCancelEditing: () => void;
  onSaveEdit: () => void;
  onPublishPost: () => void;
  metadata: any;
}

export default function EditorTab({
  selectedDate,
  editedContent,
  isEditing,
  isPublishing,
  getPostForDate,
  onEditContent,
  onStartEditing,
  onCancelEditing,
  onSaveEdit,
  onPublishPost,
  metadata
}: EditorTabProps) {
  const post = getPostForDate(selectedDate);

  const handleRegenerateImage = async () => {
    if (!post) return;

    toast.promise(
      regenerateImageForPost(post.id, post.content, metadata),
      {
        loading: 'Generowanie nowego obrazu...',
        success: 'Obraz został wygenerowany',
        error: 'Nie udało się wygenerować obrazu'
      }
    );
  };

  const handleDownloadImage = async () => {
    if (!post?.image_url) return;

    try {
      const response = await fetch(post.image_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `post-image-${post.date}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error('Nie udało się pobrać obrazu');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-effect rounded-xl p-8"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Edytor posta</h2>
      {post ? (
        <div className="space-y-4">
          {isEditing ? (
            <>
              <textarea
                value={editedContent}
                onChange={(e) => onEditContent(e.target.value)}
                className="w-full h-40 rounded-lg bg-white/10 text-white p-4 focus:ring-2 focus:ring-accent"
              />
              {post.image_url && (
                <div className="mt-4">
                  <img
                    src={post.image_url}
                    alt="Post image"
                    className="w-full h-auto rounded-lg object-cover"
                    style={{ maxHeight: '400px' }}
                    onError={(e) => {
                      console.error('Error loading image:', e);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSaveEdit}
                  className="bg-accent text-dark px-4 py-2 rounded-full font-semibold hover:bg-white transition-colors duration-300"
                >
                  Zapisz
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onCancelEditing}
                  className="bg-white/10 text-white px-4 py-2 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300"
                >
                  Anuluj
                </motion.button>
              </div>
            </>
          ) : (
            <>
              <div className="glass-effect rounded-lg p-4">
                <p className="text-white whitespace-pre-wrap mb-4">
                  {post.content}
                </p>
                {post.image_url && (
                  <div className="mt-4">
                    <img
                      src={post.image_url}
                      alt="Post image"
                      className="w-full h-auto rounded-lg object-cover"
                      style={{ maxHeight: '400px' }}
                      onError={(e) => {
                        console.error('Error loading image:', e);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="flex space-x-4 mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownloadImage}
                        className="bg-white/10 text-white px-4 py-2 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300"
                      >
                        Pobierz obraz
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRegenerateImage}
                        className="bg-white/10 text-white px-4 py-2 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300"
                      >
                        Wygeneruj nowy obraz
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onStartEditing}
                  className="bg-white/10 text-white px-4 py-2 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300"
                >
                  Edytuj
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onPublishPost}
                  disabled={isPublishing || post.published}
                  className="bg-accent text-dark px-4 py-2 rounded-full font-semibold hover:bg-white transition-colors duration-300 disabled:opacity-50"
                >
                  {isPublishing ? 'Publikowanie...' : 'Opublikuj teraz'}
                </motion.button>
              </div>
            </>
          )}
        </div>
      ) : (
        <p className="text-gray-300">Wybierz dzień z kalendarza</p>
      )}
    </motion.div>
  );
}