export interface Post {
  id: string;
  profile_id: string;
  date: string;
  content: string;
  image_url?: string;
  published?: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}