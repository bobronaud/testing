import { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { writeAnswer, finishStep } from '../../store/slices/testSlice';

type AnswersState = {
  [key: string]: boolean;
};
const ChooseMany = () => {
  const dispatch = useAppDispatch();
  const { currentQuestion } = useAppSelector((state) => state.test);

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const initialState = currentQuestion?.answers?.reduce((acc, item) => {
    acc[item] = false;
    return acc;
  }, {} as AnswersState);
  const [answers, setAnswers] = useState(initialState as AnswersState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHelperText('');
    setError(false);
    setAnswers({
      ...answers,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClick = () => {
    const resultAnswers = Object.entries(answers)
      .filter(([_, value]) => value)
      .map(([key, _]) => key);
    if (resultAnswers.length === 0) {
      setHelperText('Необходимо выбрать ответ');
      setError(true);
    } else {
      dispatch(writeAnswer(resultAnswers));
      dispatch(finishStep());
    }
  };

  return (
    <Box>
      <Typography variant="h6" component="h3" sx={{ my: 1 }}>
        {currentQuestion?.question}
      </Typography>
      <FormControl error={error}>
        <FormGroup>
          {currentQuestion?.answers?.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox checked={answers[item]} onChange={handleChange} name={item} />
              }
              label={item}
            />
          ))}
        </FormGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1 }} variant="contained" onClick={handleClick}>
          Ответить
        </Button>
      </FormControl>
    </Box>
  );
};

export default ChooseMany;
