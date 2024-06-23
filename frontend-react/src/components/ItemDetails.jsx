// src/components/ItemDetailsComponent.js

import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const ItemDetails = ({ item, parents, children, pathsToRoot }) => {
  return (
    <div>
      <Typography variant='h5'>Item Details</Typography>
      <Typography variant='body1'>Title: {item.title}</Typography>
      <Typography variant='body1'>Subtitle: {item.subtitle}</Typography>
      <Typography variant='body1'>Description: {item.description}</Typography>

      <Typography variant='h6'>Parents</Typography>
      <List>
        {parents.map((parent) => (
          <ListItem key={parent.id}>
            <ListItemText primary={parent.title} />
          </ListItem>
        ))}
      </List>

      <Typography variant='h6'>Children</Typography>
      <List>
        {children.map((child) => (
          <ListItem key={child.id}>
            <ListItemText primary={child.title} />
          </ListItem>
        ))}
      </List>

      <Typography variant='h6'>Paths to Root</Typography>
      <List>
        {pathsToRoot.map((path, index) => (
          <ListItem key={index}>
            <ListItemText primary={path.join(' > ')} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ItemDetails;
