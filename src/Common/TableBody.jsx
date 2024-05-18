import React from "react";
import { Link } from "react-router-dom";
function TableBody(props) {
    const style = {
        height: "150px", width: "100px"

    }
    const { tableData, Columns } = props;
    return (
        <tbody>
            {
                tableData.map((item) => (
                    <tr key={item.pyGUID}>
                        {Columns.map((col) => (
                            < td key={item.pyGUID + col.id}>
                                {col.type === "text" && item[col.id]}
                                {col.type === "image" && <Link to={"/Movie/" + item.pyGUID}> <img style={style} src={item[col.id]} alt={item.Name} /></Link>}
                                {col.type === "component" && col.component(item)}

                            </td>
                        ))}
                    </tr>

                ))
            }
        </tbody >
    )
}
export default TableBody;