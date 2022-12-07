import React, {FC} from 'react';
import TableRow from "@mui/material/TableRow";
import s from "./TablePackHeadComponent.module.css";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import {EnhancedTableHead} from "../../../common/components/EnhancedTableHead/EnhancedTableHead";
import {Order} from "../PacksList";
import {fetchPacksTC} from "../packsListReducer";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../app/store";


type TablePackHeadComponentType = {
  page: number
  value: number[]
  rowsPerPage: number
}
export const TablePackHeadComponent: FC<TablePackHeadComponentType> = ({ rowsPerPage, value, page}) => {

  const [order, setOrder] = React.useState<Order>('asc');
  const orderBy = 'name'

  const dispatch = useDispatch<AppDispatchType>();

  const handleRequestSort = (
    id: string,
  ) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    if (isAsc) {
      dispatch(fetchPacksTC( {page: page, min: value[0], max: value[1], pageCount: rowsPerPage, sortPacks: "1updated" }))
    } else {
      dispatch(fetchPacksTC( {page: page, min: value[0], max: value[1], pageCount: rowsPerPage, sortPacks: "0updated" }))
    }
  };
  return (
    <TableHead>
      <TableRow className={s.mainRow}>
        <TableCell className={s.cell} align="center">
          Cover
        </TableCell>
        <TableCell className={s.cell} align="center">
          Name
        </TableCell>
        <TableCell className={s.cell} align="center">
          Cards
        </TableCell>
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
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
