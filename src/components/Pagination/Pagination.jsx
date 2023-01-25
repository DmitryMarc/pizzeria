import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';

import styles from './Pagination.module.scss'

const Pagination = ({currentPage}) => {
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
                renderOnZeroPageCount={null}
            />
    )
}

export default Pagination
