import React, { useEffect, useState } from "react";
import RenderFormSkin from "../Common/RenderFormSkin";
import APIHandler from "../ApiConnections/APIHandler";
import { useNavigate, useParams } from "react-router-dom";
import configs from "../configs.json";
import OrderStatus from "./OrderStatus";
import { toast } from "react-toastify";


function DeliveryDetails({ orderID }) {
    const navigate = useNavigate();
    const [DeliveryData, ManageDeliveryData] = useState();
    const [dataLoaded, ManageLoading] = useState();
    const { deliveryID } = useParams();
    useEffect(() => {
        async function getDeliveryData() {
            try {
                ManageLoading(false)
                const { data } = await APIHandler.get(configs.Checkout + "/" + deliveryID)
                ManageDeliveryData(data);
                ManageLoading(true);
            } catch (error) {
                toast.error("Some unexpected error occured")
                ManageLoading(true);
            }
        }
        getDeliveryData();
    }, [deliveryID]);

    function returnDeliveryDetails() {
        return (
            <>
                <div className="card">
                    <div className="card-header">
                        <h2>{DeliveryData?.content?.pyID}</h2>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title"><OrderStatus status={DeliveryData?.status} /></h5>
                        <p className="card-text">Total cost : {DeliveryData?.content?.TotalCost}</p>
                        {DeliveryData?.content?.isPaymentNeeded === "true" && <p className="card-text">Payment mode : Cash on delivery</p>}
                        <p className="card-text">Delivery Address : <em >{DeliveryData?.content?.Address?.pyHomeStreet}, {DeliveryData?.content?.Address?.pyCity}, {DeliveryData?.content?.Address?.pyHomeCountry}</em></p>
                        {DeliveryData?.content?.ExpectedDeliveryDate && <p className="card-text">Expected delivery date : {DeliveryData?.content?.ExpectedDeliveryDate}</p>}
                        {DeliveryData?.content?.PickupDate && <p className="card-text">Expected pick-up date : {DeliveryData?.content?.PickupDate}</p>}
                        <button onClick={() => navigate("/OrderDetails/" + orderID)} className="btn btn-primary">Go somewhere</button>

                    </div>
                </div >
            </>
        )
    }

    return (
        <>
            <div>
                <RenderFormSkin formData={returnDeliveryDetails()} formTitle={"Delivery details"} isLoaded={dataLoaded} />
            </div>
        </>
    )
}
export default DeliveryDetails;