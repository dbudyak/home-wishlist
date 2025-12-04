export interface User {
  id: number;
  name: string;
  created_at: string;
}

export interface WishlistItem {
  id: number;
  user_id: number;
  title: string;
  url: string;
  created_at: string;
}

export interface CreateItemRequest {
  user_id: number;
  title: string;
  url: string;
}
