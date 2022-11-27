import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {Order} from "../../../features/PackList/Cards/Cards";
import s from './EnhancedTableHead.module.css'

export type SortTableProps = {
  onRequestSort: (id: string) => void;
  order: Order;
  orderBy: string;
}

export function EnhancedTableHead(props: SortTableProps) {
  const {order, orderBy, onRequestSort} =
    props;

  const headCell = {
    id: 'name',
    label: 'Last Updated',
  }
  const createSortHandler =
    (id: string) => () => {
      onRequestSort( id);
    };

  return (
    <TableCell className={s.cell} align="center"
      key={headCell.id}
      sortDirection={orderBy === headCell.id ? order : false}
    >
      <TableSortLabel
        active={orderBy === headCell.id}
        direction={orderBy === headCell.id ? order : 'asc'}
        onClick={createSortHandler(headCell.id)}
      >
        {headCell.label}
        {orderBy === headCell.id ? (
          <Box component="span" sx={visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
}