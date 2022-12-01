import React, {ChangeEvent, FC} from 'react';
import {Slider} from "@mui/material";
import TextField from "@mui/material/TextField";
import s from './DoubleRange.module.css'
import {PackStateType} from "../packsListReducer";
type DoubleRangeType = {
  packs: PackStateType
  value: number[]
  setRangeOne: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  setRangeTwo: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleChange: (event: Event, newValue: number | number[]) => void
}
const DoubleRange: FC<DoubleRangeType> = ({packs, value, setRangeTwo, setRangeOne, handleChange}) => {
  return (
    <div className={s.range}>
      <TextField
        sx={{maxWidth: "70px"}}
        type="number"
        value={value[0]}
        onChange={setRangeOne}
        InputProps={{
          inputProps: {
            max: packs.maxCardsCount,
            min: packs.minCardsCount,
          },
        }}
      />
      <div className={s.slider}>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          color="primary"
          disableSwap
        />
      </div>
      <TextField
        sx={{maxWidth: "70px"}}
        type="number"
        value={value[1]}
        onChange={setRangeTwo}
        InputProps={{
          inputProps: {
            max: packs.maxCardsCount,
            min: packs.minCardsCount,
          },
        }}
      />
    </div>
  );
};

export default DoubleRange;