import React, {FC, useState} from 'react';
import {BasicModal} from "../../BasicModal";
import s from "./AddCardModal.module.css";
import SuperButton from "../../../SuperButton/SuperButton";
import {AppDispatchType, useAppSelector} from "../../../../../app/store";
import {addCardTC} from "../../../../../features/PackList/Cards/cardsPeducer";
import {useDispatch} from "react-redux";
import baseQuestion
  from "../../../../../assets/img/question-mark-icon-on-white-puzzle-royalty-free-image-917901148-1558452934 (1).jpg";
import baseAnswer from "../../../../../assets/img/The-Answer-698x428-e1445614683535 (1).jpg";
import AggFileJpg from "../../AddFileJPG/AggFileJpg";
import SelectInModals from "../../SelectInModals/SelectInModals";
import TextFieldInModals from "../../TextFieldInModals/TextFieldInModals";
import HeaderInModals from "../../HeaderInModals/HeaderInModals";

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

  const addNewCardHandler = (handleClose: () => void) => {
    packId && dispatch(addCardTC({card: {cardsPack_id: packId, question, answer, answerImg, questionImg}}, {
      cardsPack_id: packId,
      pageCount: rowsPerPage
    }))
    setQuestion('')
    setAnswer('')
    setQuestionImg('')
    setAnswerImg('')
    handleClose()
  }

  return (
    <BasicModal children2={<SuperButton disabled={disabledButton}
                                        className={disabledButton ? s.wrapper__btnDisabled : s.wrapper__btn}
    >Add new card
    </SuperButton>}>
      {(handleClose) => <>
        <HeaderInModals handleClose={handleClose}>
          Add new card
        </HeaderInModals>
        <div className={s.container}>
          <SelectInModals questionType={questionType} setQuestionType={setQuestionType}/>
          {questionType === 'picture'
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
            <SuperButton className={s.saveBtn} onClick={() => addNewCardHandler(handleClose)}>Save</SuperButton>
          </div>
        </div>
      </>
      }
    </BasicModal>
  );
};

export default AddCardModal;