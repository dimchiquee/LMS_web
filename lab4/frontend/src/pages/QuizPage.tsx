import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SortableAnswerList from "../components/SortableAnswerList";
import { RootState } from "../app/store";
import { resetQuiz, setAnswer, setResult } from "../redux/quizSlice";
import { getQuiz } from "../api/api";
import { QuizQuestion } from "../api/types";

function shuffleArray(items: string[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function QuizPage() {
  const dispatch = useDispatch();
  const { answers, result } = useSelector((state: RootState) => state.quiz);
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    getQuiz().then(setQuizData);
  }, []);

  const initialDragAnswers = useMemo(() => {
    const initial: Record<number, string[]> = {};

    quizData.forEach((question) => {
      if (question.type === "matching") {
        initial[question.id] = shuffleArray(question.pairs?.map((pair) => pair.right) || []);
      }

      if (question.type === "sorting") {
        initial[question.id] = shuffleArray(question.sortingItems || []);
      }
    });

    return initial;
  }, [quizData]);

  useEffect(() => {
    Object.entries(initialDragAnswers).forEach(([questionId, items]) => {
      const id = Number(questionId);
      if (!answers[id]) {
        dispatch(setAnswer({ questionId: id, answer: items }));
      }
    });
  }, [dispatch, answers, initialDragAnswers]);

  const handleSingleAnswer = (questionId: number, value: string) => {
    dispatch(setAnswer({ questionId, answer: value }));
  };

  const handleMultipleAnswer = (questionId: number, value: string) => {
    const current = (answers[questionId] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    dispatch(setAnswer({ questionId, answer: updated }));
  };

  const handleDragAnswer = (questionId: number, items: string[]) => {
    dispatch(setAnswer({ questionId, answer: items }));
  };

  const arraysEqual = (a: string[], b: string[]) => {
    return a.length === b.length && a.every((value, index) => value === b[index]);
  };

  const checkQuiz = () => {
    let score = 0;

    quizData.forEach((question) => {
      const userAnswer = answers[question.id];

      if (question.type === "single" && userAnswer === question.correctAnswer) {
        score++;
      }

      if (question.type === "multiple") {
        const selected = (userAnswer as string[]) || [];
        const correct = question.correctAnswers || [];
        if (selected.length === correct.length && correct.every((item) => selected.includes(item))) {
          score++;
        }
      }

      if (question.type === "matching") {
        const selected = (userAnswer as string[]) || [];
        const correct = question.pairs?.map((pair) => pair.right) || [];
        if (arraysEqual(selected, correct)) {
          score++;
        }
      }

      if (question.type === "sorting") {
        const selected = (userAnswer as string[]) || [];
        const correct = question.correctOrder || [];
        if (arraysEqual(selected, correct)) {
          score++;
        }
      }
    });

    dispatch(setResult(score));
  };

  const handleReset = () => {
    dispatch(resetQuiz());
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Тест по CS2-скинам
      </Typography>

      {quizData.map((question) => (
        <Paper key={question.id} sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {question.id}. {question.question}
          </Typography>

          {question.type === "single" && (
            <RadioGroup
              value={(answers[question.id] as string) || ""}
              onChange={(event) => handleSingleAnswer(question.id, event.target.value)}
            >
              {question.options?.map((option) => (
                <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          )}

          {question.type === "multiple" && (
            <Box>
              {question.options?.map((option) => {
                const selected = ((answers[question.id] as string[]) || []).includes(option);
                return (
                  <FormControlLabel
                    key={option}
                    control={<Checkbox checked={selected} onChange={() => handleMultipleAnswer(question.id, option)} />}
                    label={option}
                  />
                );
              })}
            </Box>
          )}

          {question.type === "matching" && (
            <Box>
              <Typography sx={{ mb: 1 }}>
                Перетащите ответы справа так, чтобы они соответствовали скинам слева.
              </Typography>
              {question.pairs?.map((pair) => (
                <Typography key={pair.left}>{pair.left}</Typography>
              ))}
              <SortableAnswerList
                items={(answers[question.id] as string[]) || []}
                onChange={(items) => handleDragAnswer(question.id, items)}
              />
            </Box>
          )}

          {question.type === "sorting" && (
            <Box>
              <Typography sx={{ mb: 1 }}>Перетащите элементы в правильном порядке.</Typography>
              <SortableAnswerList
                items={(answers[question.id] as string[]) || []}
                onChange={(items) => handleDragAnswer(question.id, items)}
              />
            </Box>
          )}
        </Paper>
      ))}

      <Button variant="contained" onClick={checkQuiz} sx={{ mr: 2 }}>
        Проверить
      </Button>
      <Button variant="outlined" onClick={handleReset}>
        Сбросить
      </Button>

      {result !== null && (
        <Typography variant="h5" sx={{ mt: 3 }}>
          Результат: {result} из {quizData.length}
        </Typography>
      )}
    </Container>
  );
}

export default QuizPage;
