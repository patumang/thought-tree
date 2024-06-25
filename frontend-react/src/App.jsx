// src/App.js

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import TreeViewComponent from './components/TreeView';
import SearchComponent from './components/Search';
import ItemDetailsComponent from './components/ItemDetails';
import EditItemComponent from './components/EditItem';
import api from './services/api';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import Item from './components/Item';
import Tag from './components/Tag';
import QAndA from './components/QAndA/QAndA';

const Home = ({
  handleSearch,
  filteredItems,
  handleSelectItem,
  selectedItem,
  parentItems,
  childrenItems,
  pathsToRoot,
}) => {
  return (
    <Box mt={2}>
      <SearchComponent onSearch={handleSearch} />
      <TreeViewComponent data={filteredItems} onSelect={handleSelectItem} />
      {selectedItem && (
        <ItemDetailsComponent
          item={selectedItem}
          parents={parentItems}
          children={childrenItems}
          pathsToRoot={pathsToRoot}
        />
      )}
    </Box>
  );
};

function App() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [parentItems, setParentItems] = useState([]);
  const [childrenItems, setChildrenItems] = useState([]);
  const [pathsToRoot, setPathsToRoot] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/items');
      setItems(response.data);
      setFilteredItems(response.data);
    };
    fetchData();
  }, []);

  const handleSearch = (query) => {
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    //fetchParentAndChildData(item);
    navigate(`/edit-item/${item.id}`);
  };

  const fetchParentAndChildData = async (item) => {
    const parentsResponse = await api.get(`/items/${item.id}/parents`);
    const childrenResponse = await api.get(`/items/${item.id}/children`);
    const pathsResponse = await api.get(`/items/${item.id}/paths`);

    setParentItems(parentsResponse.data);
    setChildrenItems(childrenResponse.data);
    setPathsToRoot(pathsResponse.data);
  };

  return (
    <Container>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' style={{ flexGrow: 1 }}>
            <Button color='inherit' component={Link} to='/'>
              Thought Tree
            </Button>
          </Typography>

          <Button color='inherit' component={Link} to='/items'>
            Items
          </Button>
          <Button color='inherit' component={Link} to='/tags'>
            Tags
          </Button>
          <Button color='inherit' component={Link} to='/q-and-a'>
            Q&A
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route
          path='/'
          element={
            <Home
              handleSearch={handleSearch}
              filteredItems={filteredItems}
              handleSelectItem={handleSelectItem}
              selectedItem={selectedItem}
              parentItems={parentItems}
              childrenItems={childrenItems}
              pathsToRoot={pathsToRoot}
            />
          }
        />
        <Route path='/items' element={<Item />} />
        <Route path='/tags' element={<Tag />} />
        <Route
          path='/edit-item/:id'
          element={
            <EditItemComponent
              item={selectedItem}
              onUpdate={fetchParentAndChildData}
            />
          }
        />
        <Route path='/q-and-a' element={<QAndA />} />
      </Routes>
    </Container>
  );
}

export default App;
