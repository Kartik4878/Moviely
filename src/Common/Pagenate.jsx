import React from "react";
import _ from "lodash"
function Pagenate(props) {
    const { itemsPerPage, totalItems, onPageChange, currentPage } = props;
    const NumberOfPages = Math.ceil(totalItems / itemsPerPage);
    const arr = _.range(NumberOfPages);

    function getClassName(pageIndex) {
        if (pageIndex === currentPage) {
            return "page-item disabled"
        }
        return "page-item";
    }
    function getNextPrevBtnClass(isNext) {
        if (isNext && currentPage === NumberOfPages) return "page-item disabled"
        else if (!isNext && currentPage === 1) return "page-item disabled"
        return "page-item";
    }
    return (
        <>
            {NumberOfPages > 1 && <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className={getNextPrevBtnClass(false)}><button onClick={() => onPageChange(currentPage - 1)} className="page-link">Previous</button></li>
                    {arr.map((item) => (
                        <li key={item} className={getClassName(item + 1)}><button onClick={() => onPageChange(item + 1)} className="page-link">{item + 1}</button></li>
                    ))}
                    <li className={getNextPrevBtnClass(true)}><button onClick={() => onPageChange(currentPage + 1)} className="page-link">Next</button></li>
                </ul>
            </nav>}
        </>
    )
}
export default Pagenate;