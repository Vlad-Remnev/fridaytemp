import React from 'react';
import {editDate} from "../../../../common/utils/edit-date";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Rating from "@mui/material/Rating";
import {CardType} from "../../../../app/appApi";
import s from './TableBodyComponent.module.css'
import EditCardModal from "../../../../common/components/Modals/CardsModals/EditCardModal/EditCardModal";
import DeleteCardModal from "../../../../common/components/Modals/CardsModals/DeleteCardModal/DeleteCardModal";
import {setCardTC} from "../cardsPeducer";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../../app/store";

type TableBodyComponentType = {
  cards: CardType[]
  packId: string
  compareIdForDraw: boolean
  emptyRows: number
  name: string
  packName: string | undefined
  rowsPerPage: number
}

export const TableBodyComponent = ({
                                     compareIdForDraw,
                                     emptyRows,
                                     cards,
                                     name,
                                     packName,
                                     packId,
                                     rowsPerPage
                                   }: TableBodyComponentType) => {

  const dispatch = useDispatch<AppDispatchType>();

  const setValueRatingHandler = (newValue: number | null, cardId: string) => {
    dispatch(setCardTC({card_id: cardId, grade: newValue}))
  }

  return (
    <TableBody className={name.trim() === packName?.trim() ? '' : s.visibilityHidden}>
      {cards.map((card) => {
        const questionImg = card.questionImg
        const answerImg = card.answerImg
        return (
          <TableRow
            key={card._id}
            sx={{"&:last-child td, &:last-child th": {border: 0}}}
            className={s.tableRow}
          >
            <TableCell component="th" scope="row" align="center">
              {questionImg ? <img src={questionImg} alt="Question photo"/> : card.question}
            </TableCell>
            <TableCell align="center">{answerImg ? <img src={answerImg} alt="Answer photo"/> : card.answer}</TableCell>
            <TableCell align="center">{editDate(card.updated)}</TableCell>
            <TableCell align="center">
              <Rating
                name="simple-controlled"
                value={card.grade}
                onChange={(event, newValue) => {
                  setValueRatingHandler(newValue, card._id);
                }}
              />
            </TableCell>
            {compareIdForDraw && (
              <TableCell align="center">
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <EditCardModal cardId={card._id} cardAnswer={card.answer} cardQuestion={card.question} questionImgCard={card.questionImg} answerImgCard={card.answerImg} packId={packId} rowsPerPage={rowsPerPage}/>
                  <DeleteCardModal id={card._id} name={card.question} packId={packId} rowsPerPage={rowsPerPage}/>
                </div>
              </TableCell>
            )}
          </TableRow>
        )
      })}
      {emptyRows > 0 && (
        <TableRow style={{height: 61 * emptyRows}}>
          <TableCell colSpan={6}/>
        </TableRow>
      )}
    </TableBody>
  );
};
