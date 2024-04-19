import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setPhase, resetProgress } from '../slices/testSlice';

const Finish = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isDesktopUsing = useMediaQuery(theme.breakpoints.up('md'));
  const { result } = useAppSelector((state) => state.test);

  const handleClick = () => {
    dispatch(resetProgress());
    dispatch(setPhase('starting'));
  };

  return (
    <Box
      overflow="auto"
      sx={{
        height: isDesktopUsing ? '80%' : null,
        width: isDesktopUsing ? '80%' : null,
        boxShadow: isDesktopUsing ? '0 0 3px 3px rgba(0, 0, 0, 0.2)' : null,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        padding: 5,
      }}
    >
      <Typography align="center" variant="h5" component="h1">
        Итоги теста
      </Typography>
      {result.map((item, index) => {
        switch (item.type) {
          case 'chooseOne': {
            return (
              <Box key={index}>
                <Typography sx={{ mb: 1 }} variant="body1" component="h3">
                  {`${index + 1}. ${item.question}`}
                </Typography>
                {item.answers?.map((answer, i) => {
                  let colorAnswer = 'black';
                  if (answer === item.rightAnswer) colorAnswer = 'green';
                  if (answer === item.userAnswer && answer !== item.rightAnswer)
                    colorAnswer = 'red';
                  const isUserAnswer = answer === item.userAnswer ? 'subtitle2' : 'body2';
                  return (
                    <Typography key={i} color={colorAnswer} variant={isUserAnswer}>
                      - {answer}
                    </Typography>
                  );
                })}
              </Box>
            );
          }
          case 'chooseMany': {
            return (
              <Box key={index}>
                <Typography sx={{ mb: 1 }} variant="body1" component="h3">
                  {`${index + 1}. ${item.question}`}
                </Typography>
                {item.answers?.map((answer, i) => {
                  let colorAnswer = 'black';
                  if (item.rightAnswer?.includes(answer)) colorAnswer = 'green';
                  if (
                    item.userAnswer.includes(answer) &&
                    !item.rightAnswer?.includes(answer)
                  )
                    colorAnswer = 'red';
                  const isUserAnswer = item.userAnswer.includes(answer)
                    ? 'subtitle2'
                    : 'body2';

                  return (
                    <Typography key={i} color={colorAnswer} variant={isUserAnswer}>
                      - {answer}
                    </Typography>
                  );
                })}
              </Box>
            );
          }
          case 'fill': {
            return (
              <Box key={index}>
                <Typography sx={{ mb: 1 }} variant="body1" component="h3">
                  {`${index + 1}. ${item.question}`}
                </Typography>
                <Typography variant="subtitle2">
                  - Ваш ответ: {item.userAnswer}
                </Typography>
                <Typography variant="body2">
                  - Верный ответ: {item.rightAnswer}
                </Typography>
              </Box>
            );
          }
          case 'detailed': {
            return (
              <Box key={index}>
                <Typography sx={{ mb: 1 }} variant="body1" component="h3">
                  {`${index + 1}. ${item.question}`}
                </Typography>
                <Typography variant="subtitle2">
                  - Ваш ответ: {item.userAnswer}
                </Typography>
                <Typography variant="body2">- Верный ответ: -</Typography>
                <Typography variant="body2">
                  *Требуется проверка преподователем
                </Typography>
              </Box>
            );
          }
          default:
            throw new Error('unrecognizable type');
        }
      })}
      <Button sx={{ width: 200 }} variant="contained" onClick={handleClick}>
        Пройти еще раз
      </Button>
    </Box>
  );
};

export default Finish;
