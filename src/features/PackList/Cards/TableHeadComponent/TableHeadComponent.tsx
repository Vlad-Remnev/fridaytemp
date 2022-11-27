import React from 'react';
import TableRow from "@mui/material/TableRow";
import s from "../TableHeadComponent/TableHeadComponent.module.css";
import TableCell from "@mui/material/TableCell";
import {EnhancedTableHead} from "../../../../common/components/EnhancedTableHead/EnhancedTableHead";
import TableHead from "@mui/material/TableHead";
import {Order} from "../Cards";


type TableHeadComponentType = {
  onRequestSort: (id: string) => void;
  order: Order;
  orderBy: string;
  compareIdForDraw: boolean
}

const TableHeadComponent = ({onRequestSort, compareIdForDraw, orderBy, order}: TableHeadComponentType) => {
  return (
    <TableHead>
      <TableRow className={s.mainRow}>
        <TableCell className={s.cell} align="center">
          Question
        </TableCell>
        <TableCell className={s.cell} align="center">
          Answer
        </TableCell>
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
        />
        <TableCell className={s.cell} align="center">
          Grade
        </TableCell>
        {compareIdForDraw &&
            <TableCell
                className={s.cell} align="center">
                Action
            </TableCell>}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadComponent;