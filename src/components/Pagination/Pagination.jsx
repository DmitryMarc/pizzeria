import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'

const Pagination = ({setCurrentPage}) => {
        // // Invoke when user click to request another page.
    // const handlePageClick = (event) => {
    //     const newOffset = (event.selected * itemsPerPage) % items.length;
    //     console.log(
    //         `User requested page number ${event.selected}, which is offset ${newOffset}`
    //     );
    //     setItemOffset(newOffset);
    // };
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
