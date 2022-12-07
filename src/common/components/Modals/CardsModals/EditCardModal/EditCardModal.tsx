import React, {ChangeEvent, FC, useState} from 'react';
import {BasicModal} from "../../BasicModal";
import s from "./EditCardModal.module.css";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {AppDispatchType, useAppSelector} from "../../../../../app/store";
import {useDispatch} from "react-redux";
import {updateCardTC} from "../../../../../features/PackList/Cards/cardsPeducer";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SuperButton from "../../../SuperButton/SuperButton";

type EditCardModalType = {
  cardId: string
  cardAnswer: string
  cardQuestion: string
}

const EditCardModal: FC<EditCardModalType> = ({cardId, cardQuestion, cardAnswer}) => {
  const status = useAppSelector(state => state.app.status)
  console.log(status)
  const dispatch = useDispatch<AppDispatchType>();
  const [questionType, setQuestionType] = useState('text');
  const [question, setQuestion] = useState(cardQuestion)
  const [answer, setAnswer] = useState(cardAnswer)

  const changeQuestionNameHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuestion(e.currentTarget.value)
  }

  const changeAnswerNameHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAnswer(e.currentTarget.value)
  }

  const handleChange = (event: SelectChangeEvent) => {
    setQuestionType(event.target.value as string);
  };

  const editCardHandler = (handleClose: () => void) => {
    cardId && dispatch(updateCardTC({_id: cardId, question, answer}))
    setQuestion('')
    setAnswer('')
    handleClose()
  }
  return (
    <BasicModal children2={<BorderColorIcon sx={{marginRight: "20px", cursor: 'pointer'}}/>}>
      {(handleClose) => <>
        <div className={s.header}>
          <div>Edit card</div>
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
            <SuperButton className={s.cancelBtn} onClick={handleClose}>Cancel</SuperButton>
            <SuperButton className={s.saveBtn} onClick={() => editCardHandler(handleClose)}>Save</SuperButton>
          </div>
        </div>
      </>
      }
    </BasicModal>
  );
};

export default EditCardModal;