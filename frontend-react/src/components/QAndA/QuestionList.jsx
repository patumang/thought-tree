import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
} from '@mui/material';

function QuestionList({ questions, currentQuestionId, setCurrentQuestionId }) {
  return (
    <div className='question-list'>
      <Typography variant='h6' component='h2'>
        Questions
      </Typography>
      <List
        sx={{
          bgcolor: 'background.paper',
          overflow: 'auto',
          maxHeight: 450,
        }}
      >
        {questions.map((question) => (
          <ListItem key={question.id} disablePadding>
            <ListItemButton
              selected={question.id === currentQuestionId}
              onClick={() => setCurrentQuestionId(question.id)}
            >
              <ListItemText primary={question.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default QuestionList;
