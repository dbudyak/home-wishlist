import { useEffect, useState } from 'react';
import { api } from './api';
import { User, WishlistItem } from './types';
import WishlistColumn from './WishlistColumn';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [items, setItems] = useState<{ [userId: number]: WishlistItem[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const usersData = await api.getUsers();
      setUsers(usersData);

      const itemsData: { [userId: number]: WishlistItem[] } = {};
      for (const user of usersData) {
        const userItems = await api.getItemsByUser(user.id);
        itemsData[user.id] = userItems;
      }
      setItems(itemsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (userId: number, title: string, url: string) => {
    try {
      const newItem = await api.createItem({ user_id: userId, title, url });
      setItems((prev) => ({
        ...prev,
        [userId]: [newItem, ...(prev[userId] || [])],
      }));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add item');
    }
  };

  const handleDeleteItem = async (userId: number, itemId: number) => {
    try {
      await api.deleteItem(itemId);
      setItems((prev) => ({
        ...prev,
        [userId]: prev[userId].filter((item) => item.id !== itemId),
      }));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete item');
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Family Wishlist</h1>
      </header>

      <div className="columns-container">
        {users.map((user) => (
          <WishlistColumn
            key={user.id}
            user={user}
            items={items[user.id] || []}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
