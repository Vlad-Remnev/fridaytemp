import React, {FC} from 'react';
import TableRow from "@mui/material/TableRow";
import s from "../PacksList.module.css";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import {EnhancedTableHead} from "../../../common/components/EnhancedTableHead/EnhancedTableHead";
import {Order} from "../Cards/Cards";

type TablePackHeadComponentType = {
  onRequestSort: (id: string) => void;
  order: Order;
  orderBy: string;
}
export const TablePackHeadComponent: FC<TablePackHeadComponentType> = ({order, orderBy, onRequestSort}) => {
  return (
    <TableHead>
      <TableRow className={s.mainRow}>
        <TableCell className={s.cell} align="center">
          Name
        </TableCell>
        <TableCell className={s.cell} align="center">
          Cards
        </TableCell>
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
        />
        <TableCell className={s.cell} align="center">
          Created By
        </TableCell>
        <TableCell className={s.cell} align="center">
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
