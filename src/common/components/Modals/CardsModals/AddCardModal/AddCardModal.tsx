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
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import baseQuestion
  from "../../../../../assets/img/question-mark-icon-on-white-puzzle-royalty-free-image-917901148-1558452934 (1).jpg";
import baseAnswer from "../../../../../assets/img/The-Answer-698x428-e1445614683535 (1).jpg";
import {minFileSize} from "../../../../../features/Profile/Profile";
import {convertFileToBase64} from "../../../../utils/convertFileToBase64";
import {setAppErrorAC} from "../../../../../app/appReducer";

type AddCardModalType = {
  packId?: string
  rowsPerPage?: number
}

const AddCardModal: FC<AddCardModalType> = ({packId, rowsPerPage}) => {

  const status = useAppSelector(state => state.app.status)
  const dispatch = useDispatch<AppDispatchType>();
  const disabledButton = status === 'loading'

  const [questionImg, setQuestionImg] = useState<string>('')
  const [answerImg, setAnswerImg] = useState<string>('')
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
    packId && dispatch(addCardTC({card: {cardsPack_id: packId, question, answer, answerImg, questionImg}}, {
      cardsPack_id: packId,
      pageCount: rowsPerPage
    }))
    setQuestion('')
    setAnswer('')
    setQuestion('')
    setAnswerImg('')
    handleClose()
  }

  const uploadHandlerQuestionImg = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file.size < minFileSize) {
        convertFileToBase64(file, (file64: string) => {
          setQuestionImg(file64)
        });
      } else {
        dispatch(setAppErrorAC('File is too BIG'));
      }
    }
  };

  const uploadHandlerAnswerImg = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file.size < minFileSize) {
        convertFileToBase64(file, (file64: string) => {
          setAnswerImg(file64)
        });
      } else {
        dispatch(setAppErrorAC('File is too BIG'));
      }
    }
  };
  return (
    <BasicModal children2={<SuperButton disabled={disabledButton}
                                        className={disabledButton ? s.wrapper__btnDisabled : s.wrapper__btn}
    >Add new card
    </SuperButton>}>
      {(handleClose) => <>
        <div className={s.header}>
          <div>Add new card</div>
          <div onClick={handleClose}>X</div>
        </div>
        <div className={s.container}>
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
          {questionType === 'picture'
            ?
            <div>
              <div className={s.packTitle}>
                <div>Question</div>
                <div>
                  <input
                    id={'question'}
                    type={'file'}
                    style={{display: 'none'}}
                    accept={'image/**'}
                    onChange={uploadHandlerQuestionImg}
                  />
                  <label htmlFor="question">
                    <AddAPhotoIcon/>
                  </label>
                </div>
              </div>
              <div className={s.packImg}>
                <img src={questionImg ? questionImg : baseQuestion} alt="Question img"/>
              </div>
              <div className={s.packTitle}>
                <div>Answer</div>
                <div>
                  <input
                    id={'answer'}
                    type={'file'}
                    style={{display: 'none'}}
                    accept={'image/**'}
                    onChange={uploadHandlerAnswerImg}
                  />
                  <label htmlFor="answer">
                    <AddAPhotoIcon/>
                  </label>
                </div>
              </div>
              <div className={s.packImg}>
                <img src={answerImg ? answerImg : baseAnswer} alt="Answer img"/>
              </div>
            </div>
            :
            <div className={s.textField}>
              <TextField value={question} variant="standard" label="Question" placeholder="Write a name"
                         sx={{width: '100%', margin: '10px 0'}} helperText='Write a Question'
                         onChange={changeQuestionNameHandler}/>
              <TextField value={answer} variant="standard" label="Answer" placeholder="Write a name"
                         sx={{width: '100%', margin: '10px 0'}} helperText='Write an Answer'
                         onChange={changeAnswerNameHandler}/>
            </div>}
          <div className={s.btnGroup}>
            <SuperButton className={s.cancelBtn} onClick={handleClose}>Cancel</SuperButton>
            <SuperButton className={s.saveBtn} onClick={() => addNewCardHandler(handleClose)}>Save</SuperButton>
          </div>
        </div>
      </>
      }
    </BasicModal>
  );
};

export default AddCardModal;