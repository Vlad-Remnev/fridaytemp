import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './Learn.module.css';
import { AppDispatchType, useAppSelector } from '../../app/store';
import { FormLabel, Grid, RadioGroup } from '@mui/material';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { setRandomCard } from '../../common/utils/setRandomCards';
import { BackToLink } from '../../common/components/BackToLink/BackToLink';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRatingCardTC, setUserPackAC } from './LearnReducer';
import { fetchCardsTC } from '../PackList/Cards/cardsPeducer';


const rates = [
  {id: 1, title: 'Did not know'},
  {id: 2, title: 'Forgot'},
  {id: 3, title: 'A lot of thought'},
  {id: 4, title: 'Confused'},
  {id: 5, title: 'Knew the answer'},
];

export const Learn = () => {

  const {packId, packName } = useParams();
  const name = useAppSelector(state => state.learn.packName)
  const cards = useAppSelector(state => state.cards.cards);
  const dispatch = useDispatch<AppDispatchType>()
  const [randomQuestion, setRandomQuestion] = useState(setRandomCard(cards));

  const [valueRates, setValueRates] = useState('Knew the answer');
  const [showAnswer, setShowAnswer] = useState(false);

  const showAnswerHandler = () => {
    setShowAnswer(true);
  };

  useEffect(() => {
    if(packId && packName) {
      dispatch(setUserPackAC(packId, packName))
      dispatch(fetchCardsTC({cardsPack_id: packId}))
    }
  },[])

  useEffect(() => {
    setRandomQuestion(setRandomCard(cards))
  }, [cards])

  const setValueRatesHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueRates(e.currentTarget.value)
  }


  const nextCardHandler = () => {
    setShowAnswer(false);
    const grade = rates.findIndex(r => valueRates === r.title) + 1;
    dispatch(setRatingCardTC(randomQuestion?._id, grade))
  };


  return (
    <div className={s.container}>
      <BackToLink />
      <h2 className={s.title}>Learn "{name}"</h2>

      <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
          <Paper elevation={3} style={{ width: '350px', padding: '30px' }}>
            <div>
              <span className={s.text}>Question :</span>
              {randomQuestion?.question}
            </div>
            <div className={s.attempts}>
              Количество попыток ответов на вопрос :
              <span> { randomQuestion?.shots }</span>
            </div>

            {showAnswer &&
              <div>
                <div><span className={s.text}>Answer : </span> {randomQuestion?.answer}</div>
                <FormControl>
                  <FormLabel>Rate yourself:</FormLabel>
                  <RadioGroup
                    value={valueRates}
                    onChange={setValueRatesHandler}
                  >
                    {rates.map( r => <FormControlLabel key={r.id}
                                                       value={r.title}
                                                       control={<Radio />}
                                                       label={r.title} />
                    )}
                  </RadioGroup>
                </FormControl>
              </div>}

            <div>
              {!showAnswer
                ? <Button
                  variant='contained'
                  style={{ width: '100%', borderRadius: '20px', marginTop: '10px' }}
                  onClick={showAnswerHandler}>
                  Show answer
                </Button>
                : <Button
                  variant='contained'
                  style={{ width: '100%', borderRadius: '20px' }}
                  onClick={nextCardHandler}>
                  Next
                </Button>
              }
            </div>
          </Paper>
        </Grid>
      </Grid>


    </div>
  );
};
