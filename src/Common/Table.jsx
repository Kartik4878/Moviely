import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
function Table(props) {
    const { Columns, tableData, sortOrder, sortedColumn, onSort } = props;
    return (
        <table className="table m-4">
            <TableHeader Columns={Columns} sortOrder={sortOrder} sortedColumn={sortedColumn} onSort={onSort} />
            <TableBody Columns={Columns} tableData={tableData} />
        </table>
    )
}
export default Table;