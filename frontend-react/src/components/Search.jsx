// src/components/SearchComponent.js

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Box display='flex' alignItems='center' mb={2}>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search...'
        variant='outlined'
        fullWidth
        margin='normal'
      />
      <Button
        onClick={handleSearch}
        variant='contained'
        color='primary'
        sx={{ ml: 2 }}
      >
        Search
      </Button>
    </Box>
  );
};

export default Search;
