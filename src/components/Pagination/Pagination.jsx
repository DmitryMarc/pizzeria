import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'

const Pagination = ({setCurrentPage}) => {
    return (
        <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(evt) => setCurrentPage(evt.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
    )
}

export default Pagination
