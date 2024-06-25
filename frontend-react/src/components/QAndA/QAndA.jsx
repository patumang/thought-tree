import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Paper, CssBaseline } from '@mui/material';
import QuestionList from './QuestionList';
import QuestionDetail from './QuestionDetail';
import api from '../../services/api';
//import questions from './questions.json';

const QAndA = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [mistakes, setMistakes] = useState(
    JSON.parse(localStorage.getItem('mistakes')) || {}
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/items');
      console.log('response:', response);
      setQuestions(response.data);
      setCurrentQuestionId(questions[0].id);
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('mistakes', JSON.stringify(mistakes));
  }, [mistakes]);

  const handleAnswerChange = (id, answer, mistakesCount) => {
    setUserAnswers({
      ...userAnswers,
      [id]: answer,
    });
    setMistakes({
      ...mistakes,
      [id]: mistakesCount,
    });
  };

  return (
    <CssBaseline>
      <Container maxWidth='lg'>
        <Typography variant='h2' component='h1' gutterBottom>
          Q&A
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper>
              <QuestionList
                questions={questions}
                currentQuestionId={currentQuestionId}
                setCurrentQuestionId={setCurrentQuestionId}
              />
            </Paper>
          </Grid>
          {currentQuestionId && (
            <Grid item xs={8}>
              <Paper>
                <QuestionDetail
                  question={questions.find((q) => q.id === currentQuestionId)}
                  userAnswer={userAnswers[currentQuestionId] || ''}
                  onAnswerChange={handleAnswerChange}
                  mistakes={mistakes[currentQuestionId] || 0}
                  setCurrentQuestionId={setCurrentQuestionId}
                  totalQuestions={questions.length}
                />
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </CssBaseline>
  );
};

export default QAndA;
