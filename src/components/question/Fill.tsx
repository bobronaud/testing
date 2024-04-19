import { useState, ChangeEvent, KeyboardEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { writeAnswer, finishStep } from '../../slices/testSlice';

const Fill = () => {
  const dispatch = useAppDispatch();
  const { currentQuestion } = useAppSelector((state) => state.test);

  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHelperText('');
    setError(false);
    setValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!event.shiftKey && event.key === 'Enter') {
      if (!value.trim()) {
        setHelperText('Необходимо ввести ответ');
        setError(true);
      } else {
        dispatch(writeAnswer(value));
        dispatch(finishStep());
      }
    }
  };

  const handleClick = () => {
    if (!value.trim()) {
      setHelperText('Необходимо ввести ответ');
      setError(true);
    } else {
      dispatch(writeAnswer(value.toLowerCase()));
      dispatch(finishStep());
    }
  };

  return (
    <Box>
      <Typography variant="h6" component="h3" sx={{ my: 1 }}>
        {currentQuestion?.question}
      </Typography>
      <FormControl error={error}>
        <TextField
          autoFocus
          value={value}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1 }} variant="contained" onClick={handleClick}>
          Ответить
        </Button>
      </FormControl>
    </Box>
  );
};

export default Fill;
