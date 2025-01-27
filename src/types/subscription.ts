export interface Plan {
  id: string;
  name: string;
  price: number;
  tokens: number;
  initialImages: number;
  initialDescriptions: number;
  dailyImages: number;
  dailyDescriptions: number;
  features: string[];
  popular?: boolean;
}

export interface TokenPackage {
  id: string;
  name: string;
  tokens: number;
  price: number;
  description: string;
  popular?: boolean;
}

export interface TokenUsage {
  imageTokens: number;
  descriptionTokens: number;
  totalTokens: number;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  tokenBalance: number;
  lastTokenRefresh: Date;
}