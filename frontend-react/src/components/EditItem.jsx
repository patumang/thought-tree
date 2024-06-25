// src/components/EditItemComponent.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const EditItem = ({ item, onUpdate }) => {
  const [title, setTitle] = useState(item.title);
  const [subtitle, setSubtitle] = useState(item.subtitle);
  const [shortDescription, setShortDescription] = useState(
    item.short_description
  );
  const [description, setDescription] = useState(item.description);
  const [longDescription, setLongDescription] = useState(item.long_description);
  const [remarkNotes, setRemarkNotes] = useState(item.remark_notes);
  const [availableParents, setAvailableParents] = useState([]);
  const [selectedParents, setSelectedParents] = useState([]);

  useEffect(() => {
    const fetchParents = async () => {
      const response = await api.get('/items');
      setAvailableParents(response.data);
    };
    fetchParents();
  }, []);

  const handleSave = async () => {
    await api.put(`/items/${item.id}`, {
      title,
      subtitle,
      short_description: shortDescription,
      description,
      long_description: longDescription,
      remark_notes: remarkNotes,
      parents: selectedParents.map((p) => p.id),
    });
    // onUpdate();
  };

  return (
    <Box>
      <TextField
        label='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant='outlined'
        fullWidth
        margin='normal'
      />
      <TextField
        label='Subtitle'
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        variant='outlined'
        fullWidth
        margin='normal'
      />
      <TextField
        label='Short Description'
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        variant='outlined'
        fullWidth
        multiline
        margin='normal'
      />
      <TextField
        label='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant='outlined'
        fullWidth
        multiline
        margin='normal'
      />
      <TextField
        label='Long Description'
        value={longDescription}
        onChange={(e) => setLongDescription(e.target.value)}
        variant='outlined'
        fullWidth
        multiline
        margin='normal'
      />
      <TextField
        label='Remark Notes'
        value={remarkNotes}
        onChange={(e) => setRemarkNotes(e.target.value)}
        variant='outlined'
        fullWidth
        multiline
        margin='normal'
      />
      <FormControl fullWidth margin='normal'>
        <InputLabel>Parents</InputLabel>
        <Select
          multiple
          value={selectedParents}
          onChange={(e) => setSelectedParents(e.target.value)}
          renderValue={(selected) => selected.map((p) => p.title).join(', ')}
        >
          {availableParents.map((parent) => (
            <MenuItem key={parent.id} value={parent}>
              {parent.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        onClick={handleSave}
        variant='contained'
        color='primary'
        fullWidth
      >
        Save
      </Button>
    </Box>
  );
};

export default EditItem;
