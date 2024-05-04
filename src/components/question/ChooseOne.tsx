import { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { writeAnswer, finishStep } from '../../store/slices/testSlice';

const ChooseOne = () => {
  const dispatch = useAppDispatch();
  const { currentQuestion } = useAppSelector((state) => state.test);

  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setHelperText('');
    setError(false);
  };

  const handleClick = () => {
    if (!value) {
      setHelperText('Необходимо выбрать ответ');
      setError(true);
    } else {
      dispatch(writeAnswer(value));
      dispatch(finishStep());
    }
  };

  return (
    <Box>
      <Typography variant="h6" component="h3" sx={{ my: 1 }}>
        {currentQuestion?.question}
      </Typography>
      <FormControl error={error}>
        <RadioGroup value={value} onChange={handleRadioChange}>
          {currentQuestion?.answers?.map((item) => (
            <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
          ))}
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1 }} variant="contained" onClick={handleClick}>
          Ответить
        </Button>
      </FormControl>
    </Box>
  );
};

export default ChooseOne;
