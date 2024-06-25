import React from 'react';
import { Box, Typography } from '@mui/material';

function AnswerEvaluation({ userAnswer, correctAnswer }) {
  // Function to compare user answer with correct answer and generate evaluation result
  const evaluateAnswer = (userAnswer, correctAnswer) => {
    const evaluationResult = [];
    let userIndex = 0;
    let correctIndex = 0;

    // Regular expression to check for special characters
    const isSpecialCharacter = (char) => /[^a-zA-Z0-9]/.test(char);

    while (
      userIndex < userAnswer.length &&
      correctIndex < correctAnswer.length
    ) {
      let userChar = userAnswer[userIndex].toLowerCase(); // Convert to lowercase
      let correctChar = correctAnswer[correctIndex].toLowerCase(); // Convert to lowercase

      // Skip special characters in the correct answer
      while (
        isSpecialCharacter(correctChar) &&
        correctIndex < correctAnswer.length
      ) {
        correctIndex++;
        correctChar = correctAnswer[correctIndex]?.toLowerCase();
      }

      // Skip special characters in the user answer
      while (isSpecialCharacter(userChar) && userIndex < userAnswer.length) {
        evaluationResult.push({ char: userAnswer[userIndex], correct: true });
        userIndex++;
        userChar = userAnswer[userIndex]?.toLowerCase();
      }

      if (userChar === correctChar) {
        evaluationResult.push({ char: userAnswer[userIndex], correct: true });
        correctIndex++;
      } else {
        evaluationResult.push({ char: userAnswer[userIndex], correct: false });
      }

      userIndex++;
    }

    // Add remaining characters from userAnswer in case it's longer than correctAnswer
    while (userIndex < userAnswer.length) {
      evaluationResult.push({ char: userAnswer[userIndex], correct: false });
      userIndex++;
    }

    return evaluationResult;
  };

  // Get the evaluation result
  const evaluation = evaluateAnswer(userAnswer, correctAnswer);

  return (
    <Box mt={2}>
      <Typography variant='body1' component='div'>
        {evaluation.map((item, index) => (
          <span key={index} style={{ color: item.correct ? 'green' : 'red' }}>
            {item.char}
          </span>
        ))}
      </Typography>
    </Box>
  );
}

export default AnswerEvaluation;
