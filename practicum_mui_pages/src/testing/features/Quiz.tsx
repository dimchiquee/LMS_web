import { Box, Button, Container, Typography } from '@mui/material';
import { quiz } from "../quizData";
import Matching from "./Matching";
import Sorting from "./Sorting";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useState } from 'react';
import { clearLists } from './quizSlice';

function Quiz() {
  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.lists.lists);

  const [results, setResults] = useState<number[] | null>(null);
  const [restartKey, setRestartKey] = useState(0);

  const handleCheck = () => {
    const checkedResults = quiz.map((item, index) => {
      const userAnswers = lists[index] || [];

      if (item.type === "M") {
        return item.tasks.reduce((count, task, taskIndex) => {
          return userAnswers[taskIndex] === task.answer ? count + 1 : count;
        }, 0);
      }

      if (item.type === "S") {
        const correctOrder = [...item.tasks]
          .sort((a, b) => Number(a.answer) - Number(b.answer))
          .map(task => task.question);

        return correctOrder.reduce((count, question, taskIndex) => {
          return userAnswers[taskIndex] === question ? count + 1 : count;
        }, 0);
      }

      return 0;
    });

    setResults(checkedResults);
  };

  const handleRestart = () => {
    dispatch(clearLists());
    setResults(null);
    setRestartKey(prev => prev + 1);
  };

  return (
    <Container maxWidth="md">
      {quiz.map((item, index) => (
        <Box key={item.id} sx={{ m: 2 }}>
          <Typography variant="h6">
            {index + 1}. {item.title}
          </Typography>

          {item.type === "M" && (
            <Matching
              index={index}
              tasks={item.tasks}
              restartKey={restartKey}
            />
          )}

          {item.type === "S" && (
            <Sorting
              index={index}
              tasks={item.tasks}
              restartKey={restartKey}
            />
          )}
        </Box>
      ))}

      <Box sx={{ display: 'flex', justifyContent:'space-around' }}>
        <Button variant="contained" onClick={handleCheck}>
          Проверить
        </Button>

        <Button variant="contained" onClick={handleRestart}>
          Начать снова
        </Button>
      </Box>

      {results && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">
            Результаты тестирования
          </Typography>

          {results.map((correctCount, index) => {
            const total = quiz[index].tasks.length;

            return (
              <Typography key={index}>
                Задание {index + 1} —{" "}
                {correctCount === total
                  ? 'все ответы верные'
                  : `верных ответов: ${correctCount}`}
              </Typography>
            );
          })}
        </Box>
      )}
    </Container>
  );
}

export default Quiz;