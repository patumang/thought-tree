// src/components/TreeViewComponent.js

import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, List, ListItem, ListItemText } from '@mui/material';

const SortableItem = ({ id, title, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      button
      onClick={() => onClick()}
    >
      <ListItemText primary={title} />
    </ListItem>
  );
};

const TreeView = ({ data, onSelect }) => {
  const [items, setItems] = useState(data);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    //onSelect(active.id);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <List>
          {items.map((item) => (
            <ListItem
              key={item.id}
              id={item.id}
              title={item.title}
              button
              onClick={() => onSelect(item)}
            >
              {item.title}
            </ListItem>
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
};

export default TreeView;
