import { Box, Typography } from '@mui/material';
import { tTasks } from "../quizData";
import SortableList from './SortableList';
import { useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDraggedItems } from './quizSlice';

interface ComponentProps {
  index: number;
  tasks: tTasks;
  restartKey: number;
}

function Sorting({ index, tasks, restartKey }: ComponentProps) {
  const dispatch = useDispatch();

  const shuffledQuestions = useMemo(() => {
    const questions = tasks.map(task => task.question);
    const shuffled = [...questions];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }, [tasks, restartKey]);

  useEffect(() => {
    dispatch(setDraggedItems({ index, items: shuffledQuestions }));
  }, [dispatch, index, shuffledQuestions]);

  return (
    <Box>
      <Typography sx={{ mb: 1 }}>
        Перетащите элементы в правильном порядке:
      </Typography>

      <SortableList index={index} answers={shuffledQuestions} />
    </Box>
  );
}

export default Sorting;