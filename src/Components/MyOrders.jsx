import React from "react";
import Table from "../Common/Table";
import CheckOrderDetails from "./CheckOrderDetails";
import OrderStatus from "./OrderStatus";
import RenderFormSkin from "../Common/RenderFormSkin";

function MyOrders({ myOrders }) {
    const Columns = [
        { id: "pyID", label: "Order ID", type: "text" },
        { id: "pxCreateDateTime", label: "Order Date", type: "text" },
        { id: "orderStatus", label: "Order Status", type: "component", component: (item) => <OrderStatus status={item.pyStatusWork} /> },
        { id: "orderDetails", label: "", type: "component", component: (item) => <CheckOrderDetails orderID={item.pzInsKey} /> }

    ]
    function returnMyOrders() {
        return <>{myOrders?.length > 0 && <Table tableData={myOrders} Columns={Columns} />}
            {myOrders?.length === 0 && <h2>It feels so empty here :-(</h2>}
        </>
    }
    return (
        <div>
            <RenderFormSkin formData={returnMyOrders()} formTitle={"My Orders"} isLoaded={true} />
        </div>
    )
}
export default MyOrders;