import React, {ChangeEvent, FC} from 'react';
import s from "./CardsPaginate.module.css";
import PaginateComponent from "../../../../common/components/PaginateComponent/PaginateComponent";
import {fetchCardsTC} from "../cardsPeducer";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../../app/store";

export type CardsPaginateType = {
  packId: string | undefined
  rowsPerPage: number
  setRowsPerPage: (rowsPerPage: number) => void
  page: number
  cardsTotalCount: number
}
export const CardsPaginate: FC<CardsPaginateType> = ({packId, rowsPerPage, setRowsPerPage, page , cardsTotalCount}) => {
  const dispatch = useDispatch<AppDispatchType>();
  const pageChangeHandler = (page: number) => {
    packId && dispatch(fetchCardsTC({cardsPack_id: packId, page, pageCount: rowsPerPage}));
  };

  const itemsPerPageHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(+e.target.value)
    packId && dispatch(fetchCardsTC({cardsPack_id: packId, pageCount: +e.target.value}))
  }
  return (
    <div className={s.pagination}>
      <div className={s.itemsCount}>Items per page</div>
      <select className={s.itemsAmount} onChange={itemsPerPageHandler}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <PaginateComponent
        page={page}
        setPage={pageChangeHandler}
        count={Math.ceil(cardsTotalCount / rowsPerPage)}
      />
    </div>
  );
};

export default CardsPaginate;