import React, {FC} from 'react';
import {Pagination} from "@mui/material";

type PaginationType = {
    page: number
    count: number
    setPage: (page: number) => void
}

const PaginateComponent:FC<PaginationType> = ({page, setPage, count}) => {

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Pagination count={count} page={page} onChange={handleChange} />
    );
};

export default PaginateComponent;