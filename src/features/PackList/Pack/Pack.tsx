import React, { FC } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import SchoolIcon from "@mui/icons-material/School";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { UpdateCardsPackType } from '../../../app/appApi';
import {editDate} from "../../../common/utils/edit-date";
import {useNavigate} from "react-router-dom";


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
  emptyRows,
  removePack,
  updatePack

}) => {
  const navigate = useNavigate()
  const removePackHandler = () => {
    removePack(packId)
  }
  const updatePackHandler = () => {
    updatePack({_id: packId, name: 'New Update Name'})
  }
  console.log('packName', packName)
const navigateHandler = () => {
  navigate(`/cards/${packId}/${userId}/${packName}`)
}
  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" align="center" onClick={navigateHandler}>
          {packName}
        </TableCell>
        <TableCell align="center">{cardsCount}</TableCell>
        <TableCell align="center">{editDate(lastUpdated)}</TableCell>
        <TableCell align="center">{createdUserName}</TableCell>
        {userId === mainUserId ? (
          <TableCell align="center">
            <SchoolIcon sx={{ marginRight: "20px" }} />
            <BorderColorIcon onClick={updatePackHandler} sx={{ marginRight: "20px" }} />
            <DeleteIcon onClick={removePackHandler} />
          </TableCell>
        ) : (
          <TableCell align="center">
            <SchoolIcon />
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
