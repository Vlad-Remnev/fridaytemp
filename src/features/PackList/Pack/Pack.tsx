import React, { FC } from "react";
import s from './Pack.module.css'
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import SchoolIcon from "@mui/icons-material/School";
import { UpdateCardsPackType } from '../../../app/appApi';
import {editDate} from "../../../common/utils/edit-date";
import {useNavigate} from "react-router-dom";
import {EditModal} from "../../../common/components/Modals/EditModal/EditModal";
import DeleteModal from "../../../common/components/Modals/DeleteModal/DeleteModal";
import { useDispatch } from 'react-redux';
import { AppDispatchType, useAppSelector } from '../../../app/store';
import { setCardsAC } from '../Cards/cardsPeducer';


type PackPropsType = {
  packId: string
  userId: string;
  createdUserName: string;
  packName: string;
  cardsCount: number;
  lastUpdated: string;
  mainUserId: string;
  emptyRows: number;
  removePack: (packId: string) => void
  updatePack: (updateData:UpdateCardsPackType) => void

};

export const Pack: FC<PackPropsType> = ({
  packId,
  userId,
  createdUserName,
  packName,
  cardsCount,
  lastUpdated,
  mainUserId,
  emptyRows

}) => {
  const navigate = useNavigate()
  const navigateHandler = () => {
  navigate(`/cards/${packId}/${userId}/${packName}`)
  }

  const dispatch = useDispatch<AppDispatchType>();
  const cards = useAppSelector(state => state.cards)

  const learnPackHandler = () => {
    dispatch(setCardsAC({...cards, cards: []}))
    navigate(`/learn/${packId}/${userId}/${packName}`)
  }

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }}} className={s.pack}>
        <TableCell component="th" scope="row" align="center" onClick={navigateHandler} sx={{cursor: 'pointer'}}>
          {packName}
        </TableCell>
        <TableCell align="center">{cardsCount}</TableCell>
        <TableCell align="center">{editDate(lastUpdated)}</TableCell>
        <TableCell align="center">{createdUserName}</TableCell>
        {userId === mainUserId ? (
          <TableCell align="center" sx={{display: 'flex', justifyContent: 'center'}}>
            <SchoolIcon onClick={learnPackHandler} sx={{ marginRight: "20px" }} />
            <EditModal id={packId}/>
            <DeleteModal id={packId} name={packName}/>
          </TableCell>
        ) : (
          <TableCell align="center">
            <SchoolIcon onClick={learnPackHandler}/>
          </TableCell>
        )}
      </TableRow>

      {emptyRows > 0 && (
        <TableRow style={{ height: 62 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </>
  );
};
