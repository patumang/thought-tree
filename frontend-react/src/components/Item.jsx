import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Item = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get('/items');
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      await api.post('/items/add', { title: newItem });
      fetchItems();
      setNewItem('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await api.delete(`/items/${itemId}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title}{' '}
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type='text'
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default Item;
