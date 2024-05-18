import React from "react";
function OrderStatus({ status }) {
    let badge = null;


    switch (status) {
        case "new":
            badge = <span className="btn btn-primary">{"Order Created"}</span>
            break;
        case "out-for-delivery":
            badge = <span className="btn btn-secondary">{"Out for delivery"}</span>
            break;

        case "pending-payment":
            badge = <span className="btn btn-warning">{"Pending Payment"}</span>
            break;

        case "order-successful":
            badge = <span className="btn btn-success">{status}</span>
            break;
        case "Resolved-Cancelled":
            badge = <span className="btn btn-danger">{"Order cancelled"}</span>
            break;
        case "pending-payment-return":
            badge = <span className="btn btn-danger">{"Pending Payment Return"}</span>
            break;
        case "waiting-for-delivery":
            badge = <span className="btn btn-warning">{"Waiting for delivery"}</span>
            break;
        case "Pending-Self-Pickup":
            badge = <span className="btn btn-warning">{status}</span>
            break;
        default:
            badge = <span className="btn btn-light" >{status}</span>

    }



    return (

        badge

    )
}
export default OrderStatus;