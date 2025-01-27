import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
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

export default function Register() {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPalette, setSelectedPalette] = useState(colorPalettes[0].name);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    industry: '',
    companySize: '',
    targetAudience: '',
    contentTypes: [],
    postFrequency: '',
    postGoals: '',
    brandValues: '',
    tone: [],
    competitors: '',
    keywords: '',
    colorPalette: colorPalettes[0].name,
    socialPlatforms: [],
    languages: [],
    budget: '',
    marketingGoals: '',
    uniqueSellingPoints: '',
    preferredImageStyle: '',
    hashtagStrategy: '',
    postLanguage: 'pl'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Hasła nie są identyczne!');
          return;
        }
        await signUp(formData);
      }
      toast.success(isLogin ? 'Zalogowano pomyślnie!' : 'Konto zostało utworzone!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Wystąpił błąd. Spróbuj ponownie.');
      console.error('Auth error:', error);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white">
          {isLogin ? 'Zaloguj się do konta' : 'Utwórz konto'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-effect py-8 px-4 shadow sm:rounded-lg sm:px-10"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isLogin ? (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-600 bg-white/10 text-white"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Hasło
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    className="mt-1 block w-full rounded-md border-gray-600 bg-white/10 text-white"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-accent text-dark py-2 rounded-full font-semibold hover:bg-white transition-colors duration-300"
                >
                  Zaloguj się
                </motion.button>
              </>
            ) : (
              <>
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    {[1, 2, 3, 4].map((step) => (
                      <motion.div
                        key={step}
                        className={`w-1/4 h-2 rounded-full mx-1 ${
                          step <= currentStep ? 'bg-accent' : 'bg-gray-600'
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: step * 0.1 }}
                      />
                    ))}
                  </div>
                  <div className="text-center text-sm text-gray-300">
                    Krok {currentStep} z 4
                  </div>
                </div>

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className="mt-1 block w-full rounded-md border-gray-600 bg-white/10 text-white"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Hasło
                      </label>
                      <input
                        type="password"
                        required
                        className="mt-1 block w-full rounded-md border-gray-600 bg-white/10 text-white"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Potwierdź hasło
                      </label>
                      <input
                        type="password"
                        required
                        className="mt-1 block w-full rounded-md border-gray-600 bg-white/10 text-white"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Branża
                      </label>
                      <select
                        required
                        className="mt-1 block w-full rounded-md border-gray-600 bg-white/10 text-white"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      >
                        <option value="">Wybierz branżę</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Wielkość firmy
                      </label>
                      <select
                        required
                        className="mt-1 block w-full rounded-md border-gray-600 bg-white/10 text-white"
                        value={formData.companySize}
                        onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                      >
                        <option value="">Wybierz wielkość</option>
                        <option value="1-10">1-10 pracowników</option>
                        <option value="11-50">11-50 pracowników</option>
                        <option value="51-200">51-200 pracowników</option>
                        <option value="201+">201+ pracowników</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Grupa docelowa
                      </label>
                      <textarea
                        required
                        className="mt-1 block w-full rounded-md border-gray-600 bg-white/10 text-white"
                        value={formData.targetAudience}
                        onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                        placeholder="Opisz swoją grupę docelową..."
                      />
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
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
                      <label className="block text-sm font-medium text-gray-300">
                        Częstotliwość postów
                      </label>
                      <select
                        required
                        className="mt-1 block w-full rounded-md border-gray-600 bg-white/10 text-white"
                        value={formData.postFrequency}
                        onChange={(e) => setFormData({ ...formData, postFrequency: e.target.value })}
                      >
                        <option value="">Wybierz częstotliwość</option>
                        <option value="daily">Codziennie</option>
                        <option value="3-times-week">3 razy w tygodniu</option>
                        <option value="weekly">Raz w tygodniu</option>
                        <option value="bi-weekly">Dwa razy w miesiącu</option>
                        <option value="monthly">Raz w miesiącu</option>
                      </select>
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
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Język postów
                      </label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-600 bg-white/10 text-white p-3"
                        value={formData.postLanguage}
                        onChange={(e) => setFormData({ ...formData, postLanguage: e.target.value })}
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Słowa kluczowe
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-600 bg-white/10 text-white"
                        value={formData.keywords}
                        onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                        placeholder="Słowa kluczowe oddzielone przecinkami"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Preferowany styl grafik
                      </label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-600 bg-white/10 text-white"
                        value={formData.preferredImageStyle}
                        onChange={(e) => setFormData({ ...formData, preferredImageStyle: e.target.value })}
                      >
                        <option value="">Wybierz styl</option>
                        <option value="minimalistic">Minimalistyczny</option>
                        <option value="colorful">Kolorowy</option>
                        <option value="corporate">Korporacyjny</option>
                        <option value="artistic">Artystyczny</option>
                        <option value="modern">Nowoczesny</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Strategia hashtagów
                      </label>
                      <textarea
                        className="mt-1 block w-full rounded-md border-gray-600 bg-white/10 text-white"
                        value={formData.hashtagStrategy}
                        onChange={(e) => setFormData({ ...formData, hashtagStrategy: e.target.value })}
                        placeholder="Opisz preferowaną strategię hashtagów..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Paleta kolorów
                      </label>
                      <div className="mt-2 grid grid-cols-1 gap-4">
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
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                      Wstecz
                    </motion.button>
                  )}
                  
                  {currentStep < 4 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={nextStep}
                      className="px-4 py-2 bg-accent text-dark rounded-md hover:bg-white"
                    >
                      Dalej
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-4 py-2 bg-accent text-dark rounded-md hover:bg-white"
                    >
                      Utwórz konto
                    </motion.button>
                  )}
                </div>
              </>
            )}
          </form>

          <div className="mt-6">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-center text-sm text-gray-400 hover:text-white"
            >
              {isLogin ? 'Nie masz konta? Zarejestruj się' : 'Masz już konto? Zaloguj się'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}