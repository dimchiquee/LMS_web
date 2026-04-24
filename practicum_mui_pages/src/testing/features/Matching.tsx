import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
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

function Matching({ index, tasks, restartKey }: ComponentProps) {
  const dispatch = useDispatch();

  const shuffledAnswers = useMemo(() => {
    const answers = tasks.map(task => task.answer);
    const shuffled = [...answers];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }, [tasks, restartKey]);

  useEffect(() => {
  dispatch(setDraggedItems({ index, items: shuffledAnswers }));
}, [dispatch, index, shuffledAnswers]);

  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <List>
          {tasks.map((item, taskIndex) => (
            <ListItem key={taskIndex}>
              <ListItemButton
                sx={{
                  border: '1px solid gray',
                  borderRadius: '5px',
                  textAlign: 'right',
                }}
              >
                <ListItemText primary={item.question} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid size={6}>
        <SortableList index={index} answers={shuffledAnswers} />
      </Grid>
    </Grid>
  );
}

export default Matching;