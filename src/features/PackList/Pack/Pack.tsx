import React, {FC} from "react";
import s from './Pack.module.css'
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import SchoolIcon from "@mui/icons-material/School";
import {editDate} from "../../../common/utils/edit-date";
import {useNavigate} from "react-router-dom";
import {EditModal} from "../../../common/components/Modals/PacksModals/EditModal/EditModal";
import DeleteModal from "../../../common/components/Modals/PacksModals/DeleteModal/DeleteModal";
import {AppDispatchType, useAppSelector} from '../../../app/store';
import {setCardsAC} from '../Cards/cardsPeducer';
import {useDispatch} from 'react-redux';
import baseCover from '../../../assets/img/1647366034_12-gamerwall-pro-p-geim-arti-krasivie-oboi-22 (1) (1).jpg'

type PackPropsType = {
  packId: string
  userId: string;
  createdUserName: string;
  packName: string;
  cardsCount: number;
  lastUpdated: string;
  mainUserId: string;
  emptyRows: number;
  deckCover: string
};

export const Pack: FC<PackPropsType> = ({
                                          packId,
                                          userId,
                                          createdUserName,
                                          packName,
                                          cardsCount,
                                          lastUpdated,
                                          mainUserId,
                                          emptyRows,
                                          deckCover
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
      <TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}} className={s.pack}>
        <TableCell align="center"><img className={s.packName} src={deckCover ? deckCover : baseCover} alt="Pack photo"/></TableCell>
        <TableCell component="th" scope="row" align="center" onClick={navigateHandler} sx={{cursor: 'pointer'}}>
          {packName}
        </TableCell>
        <TableCell align="center">{cardsCount}</TableCell>
        <TableCell align="center">{editDate(lastUpdated)}</TableCell>
        <TableCell align="center">{createdUserName}</TableCell>
        {userId === mainUserId ? (
          <TableCell align="center">
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <SchoolIcon onClick={learnPackHandler} sx={{marginRight: "20px"}}/>
              <EditModal id={packId} packName={packName} deckCover={deckCover}/>
              <DeleteModal id={packId} name={packName}/>
            </div>
          </TableCell>
        ) : (
          <TableCell align="center">
            <SchoolIcon onClick={learnPackHandler}/>
          </TableCell>
        )}
      </TableRow>

      {emptyRows > 0 && (
        <TableRow style={{height: 62 * emptyRows}}>
          <TableCell colSpan={6}/>
        </TableRow>
      )}
    </>
  );
};
