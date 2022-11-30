import React from 'react';
import {editDate} from "../../../../common/utils/edit-date";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from "@mui/material/Rating";
import {CardType} from "../../../../app/appApi";
import s from './TableBodyComponent.module.css'
import EditCardModal from "../../../../common/components/Modals/CardsModals/EditCardModal/EditCardModal";
import DeleteCardModal from "../../../../common/components/Modals/CardsModals/DeleteCardModal/DeleteCardModal";

type TableBodyComponentType = {
  cards: CardType[]
  packId?: string
  compareIdForDraw: boolean
  handleClose: (cardId: string) => void
  removeCardHandler: (cardId: string) => void
  emptyRows: number
  name: string
  packName: string | undefined
  setValueRating: (newValue: number | null, cardId: string) => void
}

export const TableBodyComponent = ({compareIdForDraw, emptyRows, handleClose, removeCardHandler, cards, name, packName, setValueRating, packId}: TableBodyComponentType) => {
  return (
    <TableBody className={name === packName ? '' : s.displayNone}>
      {cards.map((card) => {
        return (
          <TableRow
            key={card._id}
            sx={{"&:last-child td, &:last-child th": {border: 0}}}
          >
            <TableCell component="th" scope="row" align="center">
              {card.question}
            </TableCell>
            <TableCell align="center">{card.answer}</TableCell>
            <TableCell align="center">{editDate(card.updated)}</TableCell>
            <TableCell align="center">
              <Rating
                name="simple-controlled"
                value={card.grade}
                onChange={(event, newValue) => {
                  setValueRating(newValue, card._id);
                }}
              />
            </TableCell>
            {compareIdForDraw && (
              <TableCell align="center" sx={{display: 'flex', justifyContent: 'center'}}>
                {/*<BorderColorIcon*/}
                {/*  sx={{marginRight: "20px", cursor: 'pointer'}}*/}
                {/*  onClick={() => handleClose(card._id)}*/}
                {/*/>*/}
                <EditCardModal cardId={card._id}/>
                <DeleteCardModal id={card._id} name={card.question} packId={packId}/>
                {/*<DeleteIcon sx={{ cursor: 'pointer'}} onClick={() =>*/}
                {/*  removeCardHandler(card._id)}/>*/}
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
