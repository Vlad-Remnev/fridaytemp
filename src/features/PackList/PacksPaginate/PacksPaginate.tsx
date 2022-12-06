import React, {ChangeEvent, FC} from 'react';
import s from "./PacksPaginate.module.css";
import PaginateComponent from "../../../common/components/PaginateComponent/PaginateComponent";
import {fetchPacksTC} from "../packsListReducer";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../app/store";

export type PacksPaginateType = {
  value: number[]
  rowsPerPage: number
  setRowsPerPage: (rowsPerPage: number) => void
  page: number
  cardPacksTotalCount: number
  searchValue: string
}
const PacksPaginate: FC<PacksPaginateType> = ({rowsPerPage, setRowsPerPage, cardPacksTotalCount, page, value, searchValue}) => {

  const dispatch = useDispatch<AppDispatchType>();

  const itemsPerPageHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(+e.target.value)
    dispatch(fetchPacksTC({
      page: page,
      min: value[0],
      max: value[1],
      packName: searchValue,
      pageCount: +e.target.value
    }))
  }

  const pageChangeHandler = (pageNum: number) => {
    dispatch(fetchPacksTC({
      page: pageNum,
      min: value[0],
      max: value[1],
      packName: searchValue,
      pageCount: rowsPerPage
    }));
  };

  return (
    <div className={s.pagination}>
      <div className={s.itemsCount}>Items per page</div>
      <select value={rowsPerPage} className={s.itemsAmount} onChange={itemsPerPageHandler}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <PaginateComponent
        page={page}
        setPage={pageChangeHandler}
        count={Math.ceil(cardPacksTotalCount / rowsPerPage)}
      />
    </div>
  );
};

export default PacksPaginate;