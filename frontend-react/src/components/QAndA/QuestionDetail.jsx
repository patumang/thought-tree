import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import AnswerEvaluation from './AnswerEvaluation';

function QuestionDetail({
  question,
  userAnswer,
  onAnswerChange,
  setCurrentQuestionId,
  totalQuestions,
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleCloseAnswer = () => {
    setShowAnswer(false);
  };

  const handlePrevious = () => {
    if (question.id > 1) {
      setCurrentQuestionId(question.id - 1);
    }
  };

  const handleNext = () => {
    if (question.id < totalQuestions) {
      setCurrentQuestionId(question.id + 1);
    }
  };

  return (
    <Box p={2}>
      <Typography variant='h6' component='h2'>
        {question.title}
      </Typography>
      <TextField
        fullWidth
        multiline
        minRows={4}
        value={userAnswer}
        onChange={(e) => onAnswerChange(question.id, e.target.value)}
        variant='outlined'
        margin='normal'
      />
      <Box mt={2}>
        <Button
          variant='contained'
          onClick={handleShowAnswer}
          color='secondary'
        >
          Show Correct Answer
        </Button>
      </Box>
      <AnswerEvaluation
        userAnswer={userAnswer}
        correctAnswer={question.short_description}
      />
      <Box mt={2}>
        <Button
          variant='contained'
          onClick={handlePrevious}
          disabled={question.id === 1}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleNext}
          disabled={question.id === totalQuestions}
          sx={{ ml: 2 }}
        >
          Next
        </Button>
      </Box>

      {/* Modal for showing correct answer */}
      <Modal
        open={showAnswer}
        onClose={handleCloseAnswer}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showAnswer}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant='h6' id='modal-modal-title'>
              Correct Answer
            </Typography>
            <Typography variant='body1' id='modal-modal-description'>
              {question.short_description}
            </Typography>
            <Button
              onClick={handleCloseAnswer}
              variant='contained'
              color='primary'
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default QuestionDetail;
