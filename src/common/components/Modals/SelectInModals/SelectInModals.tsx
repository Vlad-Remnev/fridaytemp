import React, {FC} from 'react';
import s from "../CardsModals/AddCardModal/AddCardModal.module.css";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type SelectInModalsType ={
  questionType: string
  setQuestionType: (questionType: string) => void
}
const SelectInModals: FC<SelectInModalsType> = ({setQuestionType, questionType}) => {

  const handleChange = (event: SelectChangeEvent) => {
    setQuestionType(event.target.value as string);
  };
  return (
    <div className={s.textField}>
      <InputLabel id="demo-simple-select-label">Choose a question format</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={questionType}
        label="Question type"
        sx={{width: '100%', margin: '10px 0'}}
        onChange={handleChange}
      >
        <MenuItem value={'text'}>Text</MenuItem>
        <MenuItem value={'picture'}>Picture</MenuItem>
      </Select>
    </div>
  );
};

export default SelectInModals;