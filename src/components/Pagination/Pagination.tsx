import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/filter/filterSlice';

import styles from './Pagination.module.scss'

type PaginationPropsType = {
    currentPage: number,
    arrayLength: number
}

const Pagination: FC<PaginationPropsType> = ({ currentPage }) => {
    const dispatch = useDispatch();
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(evt) => dispatch(setCurrentPage(evt.selected + 1))}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            forcePage={currentPage - 1}
        />
    )
}

export default Pagination
