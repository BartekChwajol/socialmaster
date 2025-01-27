export interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  scheduledPosts: number;
  engagement: number;
}

export interface UserProfile {
  id: string;
  email: string;
  metadata: {
    industry: string;
    targetAudience: string;
    contentTypes: string[];
    tone: string[];
    keywords: string;
    brandValues: string;
    uniqueSellingPoints: string;
    hashtagStrategy: string;
    preferredImageStyle: string;
    postLanguage: string; // Dodane pole języka
  };
}

export interface PostingPreferences {
  id: string;
  profile_id: string;
  auto_publish: boolean;
  default_time: string;
  platforms: {
    facebook: boolean;
    instagram: boolean;
  };
}

export interface CustomPost {
  id?: string;
  profile_id?: string;
  date: string;
  content: string;
  image_url?: string;
  published?: boolean;
  published_at?: string;
}

export type TabType = 'calendar' | 'custom-calendar' | 'analytics' | 'social' | 'profile';

export interface Language {
  code: string;
  name: string;
}