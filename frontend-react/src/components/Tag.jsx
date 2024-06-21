import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Tag = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await api.get('/tags');
      setTags(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleAddTag = async () => {
    try {
      await api.post('/tags/add', { name: newTag });
      fetchTags();
      setNewTag('');
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      await api.delete(`/tags/${tagId}`);
      fetchTags();
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Tags</h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            {tag.name}{' '}
            <button onClick={() => handleDeleteTag(tag.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type='text'
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
      />
      <button onClick={handleAddTag}>Add Tag</button>
    </div>
  );
};

export default Tag;
