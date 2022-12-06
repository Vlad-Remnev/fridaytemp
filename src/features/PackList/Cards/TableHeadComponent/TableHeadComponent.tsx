import React, {FC} from 'react';
import TableRow from "@mui/material/TableRow";
import s from "./TableHeadComponent.module.css";
import TableCell from "@mui/material/TableCell";
import {EnhancedTableHead} from "../../../../common/components/EnhancedTableHead/EnhancedTableHead";
import TableHead from "@mui/material/TableHead";
import {fetchCardsTC} from "../cardsPeducer";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../../app/store";
import {Order} from "../../PacksList";



type TableHeadComponentType = {
  compareIdForDraw: boolean
  packId: string | undefined
  rowsPerPage: number
}

export const TableHeadComponent: FC<TableHeadComponentType> = ({compareIdForDraw, packId, rowsPerPage} ) => {

  const dispatch = useDispatch<AppDispatchType>();
  const [order, setOrder] = React.useState<Order>('asc');
  const orderBy = 'name'
  const handleRequestSort = (id: string) => {

    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    if (isAsc) {
      packId && dispatch(fetchCardsTC({cardsPack_id: packId, sortCards: "1grade", pageCount: rowsPerPage}))
    } else {
      packId && dispatch(fetchCardsTC({cardsPack_id: packId, sortCards: "0grade", pageCount: rowsPerPage}))
    }
  };

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
          onRequestSort={handleRequestSort}
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
