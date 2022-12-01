import React, {ChangeEvent, FC, useState} from 'react';
import {BasicModal} from "../../BasicModal";
import s from "./AddCardModal.module.css";
import MenuItem from '@mui/material/MenuItem';
import SuperButton from "../../../SuperButton/SuperButton";
import {AppDispatchType, useAppSelector} from "../../../../../app/store";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import InputLabel from '@mui/material/InputLabel';
import TextField from "@mui/material/TextField";
import {addCardTC} from "../../../../../features/PackList/Cards/cardsPeducer";
import {useDispatch} from "react-redux";

type AddCardModalType = {
  packId?: string
  rowsPerPage?: number
}

const AddCardModal: FC<AddCardModalType> = ({packId, rowsPerPage}) => {
  const status = useAppSelector(state => state.app.status)
  const dispatch = useDispatch<AppDispatchType>();
  const [questionType, setQuestionType] = useState('text');
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const changeQuestionNameHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuestion(e.currentTarget.value)
  }

  const changeAnswerNameHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAnswer(e.currentTarget.value)
  }

  const handleChange = (event: SelectChangeEvent) => {
    setQuestionType(event.target.value as string);
  };

  const addNewCardHandler = (handleClose: () => void) => {
    packId && dispatch(addCardTC({card: {cardsPack_id: packId, question, answer}}, {
      cardsPack_id: packId,
      pageCount: rowsPerPage
    }))
    setQuestion('')
    setAnswer('')
    handleClose()
  }

  return (
    <BasicModal children2={<SuperButton disabled={status === 'loading'} className={status === 'loading' ? s.wrapper__btnDisabled : s.wrapper__btn}
    >Add new card
    </SuperButton>}>
      {(handleClose) => <>
        <div className={s.header}>
          <div>Add new card</div>
          <div onClick={handleClose}>X</div>
        </div>
        <div>
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
          <div className={s.textField}>
            <TextField value={question} variant="standard" label="Question" placeholder="Write a name"
                       sx={{width: '100%', margin: '10px 0'}} helperText='Write a Question'
                       onChange={changeQuestionNameHandler}/>
            <TextField value={answer} variant="standard" label="Answer" placeholder="Write a name"
                       sx={{width: '100%', margin: '10px 0'}} helperText='Write an Answer'
                       onChange={changeAnswerNameHandler}/>
          </div>
          <div className={s.btnGroup}>
            <button className={s.cancelBtn} onClick={handleClose}>Cancel</button>
            <button className={s.saveBtn} onClick={() => addNewCardHandler(handleClose)}>Save</button>
          </div>
        </div>
      </>
      }
    </BasicModal>
  );
};

export default AddCardModal;