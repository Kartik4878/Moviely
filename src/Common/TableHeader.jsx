import React from "react";
function TableHeader(props) {
    const { Columns, sortedColumn, sortOrder, onSort } = props;
    function iconClass(Column) {
        if (sortOrder === "desc" && Column === sortedColumn) {
            return "fa-solid fa-sort-down"
        }
        return "fa-solid fa-sort-up"
    }
    return (
        <thead>
            <tr>
                {Columns.map((item) => <th scope="col" onClick={() => onSort(item.id)} key={item.id}>{item.label}{item.id === sortedColumn && <i className={iconClass(item.id)}></i>}</th>)}
            </tr>
        </thead>
    )
}
export default TableHeader;