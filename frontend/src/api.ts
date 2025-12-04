import { User, WishlistItem, CreateItemRequest } from './types';

// Dynamically determine API URL based on current location
const getApiBaseUrl = () => {
  // If VITE_API_URL is set at build time, use it (for development)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Otherwise, use the same hostname as the frontend with backend port
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  return `${protocol}//${hostname}:5200`;
};

const API_BASE_URL = getApiBaseUrl();

export const api = {
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/api/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async getItemsByUser(userId: number): Promise<WishlistItem[]> {
    const response = await fetch(`${API_BASE_URL}/api/items/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch items');
    return response.json();
  },

  async createItem(data: CreateItemRequest): Promise<WishlistItem> {
    const response = await fetch(`${API_BASE_URL}/api/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create item');
    return response.json();
  },

  async deleteItem(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete item');
  },
};
