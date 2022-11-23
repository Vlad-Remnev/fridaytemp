import React, { FC } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import SchoolIcon from "@mui/icons-material/School";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";

type PackPropsType = {
  userId: string;
  createdUserName: string;
  packName: string;
  cardsCount: number;
  lastUpdated: string;
  mainUserId: string;
  emptyRows: number;
};

export const Pack: FC<PackPropsType> = ({
  userId,
  createdUserName,
  packName,
  cardsCount,
  lastUpdated,
  mainUserId,
  emptyRows,
}) => {
  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" align="center">
          {packName}
        </TableCell>
        <TableCell align="center">{cardsCount}</TableCell>
        <TableCell align="center">{lastUpdated}</TableCell>
        <TableCell align="center">{createdUserName}</TableCell>
        {userId === mainUserId ? (
          <TableCell align="center">
            <SchoolIcon sx={{ marginRight: "20px" }} />
            <BorderColorIcon sx={{ marginRight: "20px" }} />
            <DeleteIcon />
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
