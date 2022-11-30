import React, { useState } from 'react';
import s from './Learn.module.css'
import { useAppSelector } from '../../app/store';
import { FormLabel, Grid, RadioGroup, Skeleton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { setRandomCard } from '../../common/utils/setRandomCards';


const rate = [
  "Did not know",
  "Forgot",
  "A lot of thought",
  "Confused",
  "Knew the answer",
]

export const Learn = () => {

  const packName = useAppSelector(state => state.learn.packName)
  console.log(packName);

  const [value, setValue] = useState("Knew the answer");
  const [showAnswer, setShowAnswer] = useState(false)

  const cards = useAppSelector(state => state.cards.cards)
  const showAnswerHandler = () => {
    setShowAnswer(true)
  }
  const [randomQuestion, setRandomQuestion] = useState(setRandomCard(cards))


  const nextQuestion = () => {
    setShowAnswer(false)
    const grade = rate.findIndex(r => value === r) + 1

  }


  return (
    <div className={s.container}>
        <h2>Learn "{packName}"</h2>


      <Grid container justifyContent={'center'}>
        <Grid item justifyContent={"center"}>
          <Paper elevation={3} style={{width: "350px", padding: "30px"}}>
            <div><span
              className={s.text}>Question :
                              <span>{!cards.length
                                ?
                                <Skeleton variant="text" sx={{fontSize: '1.2rem', width: '250px'}}
                                          component='span'/>
                                :
                                randomQuestion?.questionImg
                                  ?
                                  <img src={randomQuestion?.questionImg} style={{width: "50px"}} alt={"questionImg"}/>
                                  :
                                  randomQuestion?.question}
                              </span>
                            </span>
            </div>
            <span
              className={s.trained}>Количество попыток ответов на вопрос :
                            <span> {cards.length ? randomQuestion?.shots :
                              <Skeleton variant="text" sx={{fontSize: '1rem', width: '20px'}}
                                        component='span'/>} </span>
                        </span>
            {showAnswer &&
              <div>
                <div><span className={s.text}>Answer : </span> {randomQuestion?.answer}</div>
                <FormControl>
                  <FormLabel>Rate yourself:</FormLabel>
                  <RadioGroup
                    value={value}
                    onChange={() => {}}
                  >
                    {rate.map((rate, index) =>
                      <FormControlLabel
                        key={index}
                        value={rate}
                        control={<Radio/>}
                        label={rate}/>
                    )}
                  </RadioGroup>
                </FormControl>
              </div>}
            <div>
              {!showAnswer
                ? <Button
                  id={s.btn}
                  variant='contained'
                  style={{width: "100%", borderRadius: "20px"}}
                  onClick={showAnswerHandler}>
                  Show answer
                </Button>
                : <Button
                  onClick={nextQuestion}
                  variant='contained'
                  style={{width: "100%", borderRadius: "20px"}}>
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
