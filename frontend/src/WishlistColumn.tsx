import { useState } from 'react';
import { User, WishlistItem } from './types';

interface WishlistColumnProps {
  user: User;
  items: WishlistItem[];
  onAddItem: (userId: number, title: string, url: string) => Promise<void>;
  onDeleteItem: (userId: number, itemId: number) => Promise<void>;
}

function WishlistColumn({ user, items, onAddItem, onDeleteItem }: WishlistColumnProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddItem(user.id, title.trim(), url.trim());
      setTitle('');
      setUrl('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="column">
      <div className="column-header">
        <h2>{user.name}'s Wishlist</h2>
      </div>

      <form className="add-item-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          required
        />
        <input
          type="url"
          placeholder="URL (optional)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isSubmitting}
        />
        <button type="submit" disabled={isSubmitting || !title.trim()}>
          {isSubmitting ? 'Adding...' : 'Add Item'}
        </button>
      </form>

      {items.length === 0 ? (
        <div className="empty-state">No items yet. Add your first wish!</div>
      ) : (
        <ul className="items-list">
          {items.map((item) => (
            <li key={item.id} className="item">
              <div className="item-content">
                <span className="item-title">{item.title}</span>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="item-url"
                  >
                    {item.url}
                  </a>
                )}
              </div>
              <button
                className="delete-btn"
                onClick={() => onDeleteItem(user.id, item.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WishlistColumn;
