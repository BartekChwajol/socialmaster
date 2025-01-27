import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { UserProfile, PostingPreferences } from '../../types/dashboard';
import toast from 'react-hot-toast';

const industries = [
  "E-commerce", "Edukacja", "Finanse", "Gastronomia", "IT", "Moda", 
  "Nieruchomości", "Rozrywka", "Sport", "Turystyka", "Uroda", "Zdrowie"
];

const contentTypes = [
  "Posty edukacyjne", "Promocje", "Behind the scenes", "Porady eksperckie",
  "Newsy branżowe", "Case studies", "Wywiady", "Relacje z wydarzeń"
];

const toneOptions = [
  "Profesjonalny", "Przyjazny", "Zabawny", "Inspirujący", 
  "Formalny", "Casualowy", "Ekspercki", "Emocjonalny"
];

const languages = [
  { code: 'pl', name: 'Polski' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' }
];

const colorPalettes = [
  {
    name: "Ocean Blue",
    colors: {
      primary: '#004E96',
      secondary: '#2F9395',
      accent: '#56FFFC'
    }
  },
  {
    name: "Forest Green",
    colors: {
      primary: '#2D5A27',
      secondary: '#4A7856',
      accent: '#98FF98'
    }
  },
  {
    name: "Royal Purple",
    colors: {
      primary: '#4B0082',
      secondary: '#8B008B',
      accent: '#E6E6FA'
    }
  },
  {
    name: "Sunset Orange",
    colors: {
      primary: '#FF4500',
      secondary: '#FF8C00',
      accent: '#FFD700'
    }
  },
  {
    name: "Rose Gold",
    colors: {
      primary: '#B76E79',
      secondary: '#E8C1C5',
      accent: '#FFE4E1'
    }
  }
];

export default function ProfileTab() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [preferences, setPreferences] = useState<PostingPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState(colorPalettes[0].name);
  const [formData, setFormData] = useState({
    industry: '',
    companySize: '',
    targetAudience: '',
    contentTypes: [] as string[],
    postFrequency: '',
    postGoals: '',
    brandValues: '',
    tone: [] as string[],
    competitors: '',
    keywords: '',
    colorPalette: colorPalettes[0].name,
    socialPlatforms: [] as string[],
    languages: [] as string[],
    budget: '',
    marketingGoals: '',
    uniqueSellingPoints: '',
    preferredImageStyle: '',
    hashtagStrategy: '',
    postLanguage: 'pl'
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchPreferences();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
      setFormData({
        ...formData,
        ...data.metadata
      });
      setSelectedPalette(data.metadata?.colorPalette || colorPalettes[0].name);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Nie udało się pobrać profilu');
    }
  };

  const fetchPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('user_posting_preferences')
        .select('*')
        .eq('profile_id', user?.id)
        .single();

      if (error) throw error;
      setPreferences(data);
    } catch (error) {
      console.error('Error fetching preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          metadata: formData
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast.success('Profil został zaktualizowany');
      setIsEditing(false);
      await fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Nie udało się zaktualizować profilu');
    }
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value]
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-effect rounded-xl p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Profil użytkownika</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-accent text-dark rounded-full font-semibold hover:bg-white transition-colors duration-300"
          >
            {isEditing ? 'Anuluj' : 'Edytuj profil'}
          </motion.button>
        </div>

        {isEditing ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Branża
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full rounded-lg bg-white/10 text-white p-3"
                >
                  <option value="">Wybierz branżę</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Wielkość firmy
                </label>
                <select
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full rounded-lg bg-white/10 text-white p-3"
                >
                  <option value="">Wybierz wielkość</option>
                  <option value="1-10">1-10 pracowników</option>
                  <option value="11-50">11-50 pracowników</option>
                  <option value="51-200">51-200 pracowników</option>
                  <option value="201+">201+ pracowników</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Grupa docelowa
              </label>
              <textarea
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="w-full rounded-lg bg-white/10 text-white p-3"
                rows={3}
                placeholder="Opisz swoją grupę docelową..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Język postów
              </label>
              <select
                value={formData.postLanguage}
                onChange={(e) => setFormData({ ...formData, postLanguage: e.target.value })}
                className="w-full rounded-lg bg-white/10 text-white p-3"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rodzaje treści
              </label>
              <div className="grid grid-cols-2 gap-2">
                {contentTypes.map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.contentTypes.includes(type)}
                      onChange={() => handleCheckboxChange('contentTypes', type)}
                      className="rounded border-gray-600 bg-white/10 text-accent"
                    />
                    <span className="text-sm text-gray-300">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ton komunikacji
              </label>
              <div className="grid grid-cols-2 gap-2">
                {toneOptions.map((tone) => (
                  <label key={tone} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.tone.includes(tone)}
                      onChange={() => handleCheckboxChange('tone', tone)}
                      className="rounded border-gray-600 bg-white/10 text-accent"
                    />
                    <span className="text-sm text-gray-300">{tone}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Słowa kluczowe
                </label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  className="w-full rounded-lg bg-white/10 text-white p-3"
                  placeholder="Słowa kluczowe oddzielone przecinkami"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Wartości marki
                </label>
                <input
                  type="text"
                  value={formData.brandValues}
                  onChange={(e) => setFormData({ ...formData, brandValues: e.target.value })}
                  className="w-full rounded-lg bg-white/10 text-white p-3"
                  placeholder="Wartości marki oddzielone przecinkami"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Konkurencja
                </label>
                <textarea
                  value={formData.competitors}
                  onChange={(e) => setFormData({ ...formData, competitors: e.target.value })}
                  className="w-full rounded-lg bg-white/10 text-white p-3"
                  rows={3}
                  placeholder="Opisz swoją konkurencję..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Unikalne cechy
                </label>
                <textarea
                  value={formData.uniqueSellingPoints}
                  onChange={(e) => setFormData({ ...formData, uniqueSellingPoints: e.target.value })}
                  className="w-full rounded-lg bg-white/10 text-white p-3"
                  rows={3}
                  placeholder="Co wyróżnia Twoją markę?"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Paleta kolorów
              </label>
              <div className="grid grid-cols-1 gap-4">
                {colorPalettes.map((palette) => (
                  <label
                    key={palette.name}
                    className={`relative flex items-center p-4 cursor-pointer rounded-lg ${
                      selectedPalette === palette.name
                        ? 'ring-2 ring-accent'
                        : 'ring-1 ring-white/10'
                    }`}
                  >
                    <input
                      type="radio"
                      name="colorPalette"
                      value={palette.name}
                      checked={selectedPalette === palette.name}
                      onChange={(e) => {
                        setSelectedPalette(e.target.value);
                        setFormData({ ...formData, colorPalette: e.target.value });
                      }}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className="font-medium text-white">{palette.name}</p>
                          <div className="flex space-x-2 mt-2">
                            {Object.values(palette.colors).map((color, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      {selectedPalette === palette.name && (
                        <div className="text-accent">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Strategia hashtagów
              </label>
              <textarea
                value={formData.hashtagStrategy}
                onChange={(e) => setFormData({ ...formData, hashtagStrategy: e.target.value })}
                className="w-full rounded-lg bg-white/10 text-white p-3"
                rows={3}
                placeholder="Opisz swoją strategię hashtagów..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors duration-300"
              >
                Anuluj
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="px-4 py-2 bg-accent text-dark rounded-full font-semibold hover:bg-white transition-colors duration-300"
              >
                Zapisz zmiany
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Podstawowe informacje</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm text-gray-400">Email</label>
                      <p className="text-white">{profile?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Branża</label>
                      <p className="text-white">{profile?.metadata?.industry || 'Nie określono'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Wielkość firmy</label>
                      <p className="text-white">{profile?.metadata?.companySize || 'Nie określono'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Grupa docelowa</h3>
                  <p className="text-white">{profile?.metadata?.targetAudience || 'Nie określono'}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Język postów</h3>
                  <p className="text-white">
                    {(() => {
                      const selectedLanguage = languages.find(lang => lang.code === profile?.metadata?.postLanguage);
                      return selectedLanguage?.name || 'Polski';
                    })()}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Rodzaje treści</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile?.metadata?.contentTypes?.map((type: string) => (
                      <span key={type} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                        {type}
                      </span>
                    )) || 'Nie określono'}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Ton komunikacji</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile?.metadata?.tone?.map((tone: string) => (
                      <span key={tone} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                        {tone}
                      </span>
                    )) || 'Nie określono'}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Słowa kluczowe</h3>
                  <p className="text-white">{profile?.metadata?.keywords || 'Nie określono'}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Wartości marki</h3>
                  <p className="text-white">{profile?.metadata?.brandValues || 'Nie określono'}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Strategia hashtagów</h3>
                  <p className="text-white">{profile?.metadata?.hashtagStrategy || 'Nie określono'}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Paleta kolorów</h3>
              <div className="glass-effect p-4 rounded-lg">
                <p className="text-white mb-2">{profile?.metadata?.colorPalette || colorPalettes[0].name}</p>
                <div className="flex space-x-2">
                  {Object.values(colorPalettes.find(p => p.name === (profile?.metadata?.colorPalette || colorPalettes[0].name))?.colors || {}).map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}