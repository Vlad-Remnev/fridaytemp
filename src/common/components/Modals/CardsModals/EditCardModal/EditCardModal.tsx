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
import {minFileSize} from "../../../../../features/Profile/Profile";
import {convertFileToBase64} from "../../../../utils/convertFileToBase64";
import {setAppErrorAC} from "../../../../../app/appReducer";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import baseQuestion
  from "../../../../../assets/img/question-mark-icon-on-white-puzzle-royalty-free-image-917901148-1558452934 (1).jpg";
import baseAnswer from "../../../../../assets/img/The-Answer-698x428-e1445614683535 (1).jpg";

type EditCardModalType = {
  cardId: string
  cardAnswer: string
  cardQuestion: string
  questionImgCard: string | undefined
  answerImgCard: string | undefined
}

const EditCardModal: FC<EditCardModalType> = ({cardId, cardQuestion, cardAnswer, questionImgCard, answerImgCard}) => {
  const status = useAppSelector(state => state.app.status)
  console.log(status)
  const dispatch = useDispatch<AppDispatchType>();

  const [questionImg, setQuestionImg] = useState<string | undefined>(questionImgCard)
  const [answerImg, setAnswerImg] = useState<string | undefined>(answerImgCard)
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
    cardId && dispatch(updateCardTC({_id: cardId, question, answer, answerImg, questionImg}))
    setQuestion('')
    setAnswer('')
    handleClose()
  }

  const editHandlerQuestionImg = (e: ChangeEvent<HTMLInputElement>): void => {
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

  const editHandlerAnswerImg = (e: ChangeEvent<HTMLInputElement>): void => {
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
                    onChange={editHandlerQuestionImg}
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
                    onChange={editHandlerAnswerImg}
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
            <SuperButton className={s.saveBtn} onClick={() => editCardHandler(handleClose)}>Save</SuperButton>
          </div>
        </div>
      </>
      }
    </BasicModal>
  );
};

export default EditCardModal;