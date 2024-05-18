import React from "react";
import { Link } from "react-router-dom";
function GetDeliveryDetails({ ID }) {
    return (
        <>
            <Link to={"/Delivery/" + ID} ><button className="btn btn-secondary">{"Out for delivery"}</button></Link>
        </>
    )
}
export default GetDeliveryDetails;