import { Plan, TokenPackage } from '../types/subscription';

export const PLANS: Plan[] = [
  {
    id: 'beginner',
    name: 'Beginner',
    price: 14.99,
    tokens: 486,
    initialImages: 30,
    initialDescriptions: 30,
    dailyImages: 1,
    dailyDescriptions: 1,
    features: [
      '30 initial images',
      '30 initial descriptions',
      '1 additional image per day',
      '1 additional description per day',
      'Basic analytics',
      'Email support'
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced',
    price: 24.99,
    tokens: 972,
    initialImages: 30,
    initialDescriptions: 30,
    dailyImages: 3,
    dailyDescriptions: 3,
    popular: true,
    features: [
      '30 initial images',
      '30 initial descriptions',
      '3 additional images per day',
      '3 additional descriptions per day',
      'Advanced analytics',
      'Priority support',
      'Custom branding'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 39.99,
    tokens: 1458,
    initialImages: 30,
    initialDescriptions: 30,
    dailyImages: 5,
    dailyDescriptions: 5,
    features: [
      '30 initial images',
      '30 initial descriptions',
      '5 additional images per day',
      '5 additional descriptions per day',
      'Premium analytics',
      '24/7 priority support',
      'Custom branding',
      'API access',
      'Team collaboration'
    ]
  }
];

export const TOKEN_PACKAGES: TokenPackage[] = [
  {
    id: 'tokens-100',
    name: '100 Tokenów',
    tokens: 100,
    price: 5,
    description: 'Idealne na start'
  },
  {
    id: 'tokens-500',
    name: '500 Tokenów',
    tokens: 500,
    price: 20, // $4 per 100 tokens - 20% discount
    description: 'Najpopularniejszy wybór',
    popular: true
  },
  {
    id: 'tokens-1000',
    name: '1000 Tokenów',
    tokens: 1000,
    price: 35, // $3.5 per 100 tokens - 30% discount
    description: 'Najlepsza wartość'
  }
];

export const TOKEN_COSTS = {
  image: 8, // $0.08 = 8 tokens
  description: 1 // $0.001 = 1 token
};

export const calculateTokensNeeded = (images: number, descriptions: number): number => {
  return (images * TOKEN_COSTS.image) + (descriptions * TOKEN_COSTS.description);
};