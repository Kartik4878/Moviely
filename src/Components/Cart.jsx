import Table from "../Common/Table";
import APIHandler from "../ApiConnections/APIHandler"
import AuthenticationServices from "../ApiConnections/AuthenticationServices"
import { useNavigate } from "react-router-dom";
import configs from ".././configs.json"
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RenderFormSkin from "../Common/RenderFormSkin";
function Cart(props) {
    const { CartItems, Columns, onOrderPlaced } = props;
    const [dataLoaded, ManageLoading] = useState();
    useEffect(() => {
        ManageLoading(true);
    }, [])
    const navigate = useNavigate();
    async function handleCheckOut() {
        const caseData = {
            "caseTypeID": "OEBKFO-MovieLy-Work-RentalProcess",
            "content": {
                UserID: AuthenticationServices.getUserID
            }
        }
        ManageLoading(false);
        toast.success("Order in Progress");
        await APIHandler.post(configs.Checkout, caseData);
        await onOrderPlaced();
        navigate("/MyOrders");
    }
    function returnCartItems() {
        return <>{CartItems.length > 0 && <><Table tableData={CartItems} Columns={Columns} />
            <button className="btn btn-primary" onClick={handleCheckOut}>Check-out</button></>}
            {CartItems.length === 0 && <div className="m-4">
                <h2>It feels so empty here :-( </h2>
            </div>}
        </>
    }

    return (
        <RenderFormSkin formData={returnCartItems()} formTitle={"Cart"} isLoaded={dataLoaded} />
    )
}
export default Cart;