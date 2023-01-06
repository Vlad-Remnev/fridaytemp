import React, {FC, useState} from 'react';
import {BasicModal} from "../../BasicModal";
import s from "./EditCardModal.module.css";
import {AppDispatchType, useAppSelector} from "../../../../../app/store";
import {useDispatch} from "react-redux";
import {updateCardTC} from "../../../../../features/PackList/Cards/cardsPeducer";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SuperButton from "../../../SuperButton/SuperButton";
import baseQuestion
  from "../../../../../assets/img/question-mark-icon-on-white-puzzle-royalty-free-image-917901148-1558452934 (1).jpg";
import baseAnswer from "../../../../../assets/img/The-Answer-698x428-e1445614683535 (1).jpg";
import AggFileJpg from "../../AddFileJPG/AggFileJpg";
import TextFieldInModals from "../../TextFieldInModals/TextFieldInModals";
import HeaderInModals from "../../HeaderInModals/HeaderInModals";
import {IconButton} from "@mui/material";

type EditCardModalType = {
  cardId: string
  cardAnswer: string
  cardQuestion: string
  questionImgCard: string | undefined
  answerImgCard: string | undefined
  packId: string
  rowsPerPage: number
}

const EditCardModal: FC<EditCardModalType> = ({cardId, cardQuestion, cardAnswer, questionImgCard, answerImgCard, rowsPerPage, packId}) => {

  const dispatch = useDispatch<AppDispatchType>();

  const [questionImg, setQuestionImg] = useState<string | undefined>(questionImgCard)
  const [answerImg, setAnswerImg] = useState<string | undefined>(answerImgCard)
  const [question, setQuestion] = useState(cardQuestion)
  const [answer, setAnswer] = useState(cardAnswer)
  const status = useAppSelector(state => state.app.status)
  const disabledButton = status === 'loading'

  const editCardHandler = (handleClose: () => void) => {
    cardId && dispatch(updateCardTC({_id: cardId, question, answer, answerImg, questionImg}, {cardsPack_id: packId, pageCount: rowsPerPage}))
    handleClose()
  }

  return (
    <BasicModal children2={<IconButton disabled={disabledButton} color={"inherit"}><BorderColorIcon/></IconButton>}>
      {(handleClose) => <>
        <HeaderInModals handleClose={handleClose}>
          Edit card
        </HeaderInModals>
        <div>
          {questionImgCard && answerImgCard
            ?
            <div>
              <AggFileJpg callback={setQuestionImg} id={'question'}>
                Question
              </AggFileJpg>
              <div className={s.packImg}>
                <img src={questionImg ? questionImg : baseQuestion} alt="Question img"/>
              </div>
              <AggFileJpg callback={setAnswerImg} id={'answer'}>
                Answer
              </AggFileJpg>
              <div className={s.packImg}>
                <img src={answerImg ? answerImg : baseAnswer} alt="Answer img"/>
              </div>
            </div>
            :
            <div className={s.textField}>
              <TextFieldInModals value={question} callBack={setQuestion} label={'Question'}/>
              <TextFieldInModals value={answer} callBack={setAnswer} label={'Answer'}/>
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