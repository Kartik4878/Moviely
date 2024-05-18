import React from "react";
import { Link } from "react-router-dom";
function CheckOrderDetails({ orderID }) {
    return (
        <Link to={"/OrderDetails/" + orderID} ><button className="btn btn-primary">Order Details</button></Link >
    )
}
export default CheckOrderDetails;