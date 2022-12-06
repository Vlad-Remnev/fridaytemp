import React, {ChangeEvent, FC, useCallback} from 'react';
import {Slider} from "@mui/material";
import TextField from "@mui/material/TextField";
import s from './DoubleRange.module.css'
import {fetchPacksTC, PackStateType} from "../packsListReducer";
import debounce from "lodash.debounce";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../app/store";
type DoubleRangeType = {
  packs: PackStateType
  value: number[]
  setValue: (value: number[]) => void
  page: number
  searchValue: string
  rowsPerPage: number
}
const DoubleRange: FC<DoubleRangeType> = ({packs, value, setValue, searchValue, page, rowsPerPage}) => {

  const dispatch = useDispatch<AppDispatchType>();

  const cardsFilterDebounce = useCallback(
    debounce((num: number[]) => {
      dispatch(fetchPacksTC({page: page, min: num[0], max: num[1], packName: searchValue, pageCount: rowsPerPage}))
    }, 750),
    [rowsPerPage]
  );

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    cardsFilterDebounce(newValue as number[]);
  };

  const setRangeOne = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (value[0] <= value[1]) {
      setValue([+e.currentTarget.value, value[1]]);
      cardsFilterDebounce([+e.currentTarget.value, value[1]]);
    } else if (value[0] > 100) {
      setValue([100, value[1]]);
    } else if (value[0] < 0) {
      setValue([0, value[1]]);
    } else {
      setValue([value[1], value[1]]);
    }
  };

  const setRangeTwo = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (value[1] >= value[0]) {
      setValue([value[0], +e.currentTarget.value]);
      cardsFilterDebounce([value[0], +e.currentTarget.value]);
    } else if (value[1] > 100) {
      setValue([value[0], 100]);
    } else if (value[0] < 0) {
      setValue([value[0], 0]);
    } else {
      setValue([value[0], value[0]]);
    }
  };
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