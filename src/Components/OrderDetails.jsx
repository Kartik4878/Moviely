import React, { useEffect } from "react";
import APIHandler from "../ApiConnections/APIHandler";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import configs from ".././configs.json";
import Table from "../Common/Table";
import RenderFormSkin from "../Common/RenderFormSkin";
import { toast } from "react-toastify";
import { Accordion, Icon } from "semantic-ui-react";
import OrderStatus from "./OrderStatus";

function OrderDetails({ onOrderOpen }) {
    const { orderID } = useParams();
    const [caseData, ManageCaseData] = useState();
    const [dataLoaded, ManageLoading] = useState();

    const Columns = [
        { id: "Img_link", label: "", type: "image" },
        { id: "Name", label: "Movie Name", type: "text" },
        { id: "Rank", label: "Rank", type: "text" },
        { id: "Year", label: "Release Year", type: "text" },
        { id: "Imdb_rating", label: "Ratings", type: "text" }
    ]
    const [activeIndex, ManageActiveIndex] = useState();
    const [deliveryIndex, ManageDeliveryIndex] = useState();

    useEffect(() => {
        async function GetOrderData() {
            ManageLoading(false);
            try {
                const { data } = await APIHandler.get(configs.Checkout + "/" + orderID);
                ManageCaseData(data);
                onOrderOpen(data);
                ManageLoading(true);
            } catch (error) {
                ManageLoading(true);
                toast.error("An error occured while getting order details");
            }
        }
        GetOrderData();
    }, [orderID, onOrderOpen])

    function handleClick(e, titleProps) {
        const { index } = titleProps
        const newIndex = activeIndex === index ? -1 : index
        ManageActiveIndex(newIndex)
    }
    function handleDeliveryClick(e, titleProps) {
        const { index } = titleProps
        const newIndex = deliveryIndex === index ? -1 : index
        ManageDeliveryIndex(newIndex)
    }

    function renderDeliveryDetails() {

        return <Accordion>
            <Accordion.Title
                active={deliveryIndex === 0}
                index={0}
                onClick={handleDeliveryClick}
            >
                <Icon name='dropdown' />
                Delivery Data
            </Accordion.Title><Accordion.Content active={deliveryIndex === 0}>
                <table className="table m-4">
                    <thead>
                        <tr>
                            <td>Delivery ID</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tbody>
                        {caseData?.childCases.map((item) => <tr>
                            <td>{item?.ID}</td>
                            <td><Link to={"/Delivery/" + item?.ID} ><button className="btn btn-secondary">Delivery details</button></Link></td>
                        </tr>)}
                    </tbody>
                </table>
            </Accordion.Content>
        </Accordion>
    }

    function renderExtraDetils() {
        return <Accordion>
            <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={handleClick}
            >
                <Icon name='dropdown' />
                Order Data
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
                <p>
                    {(caseData?.content?.Address) && <div>
                        <h4>Delivery Address</h4>
                        <p>Street : <em>{caseData.content.Address.pyHomeStreet}</em></p>
                        <p>City : <em>{caseData.content.Address.pyCity}</em></p>
                        <p>Country : <em>{caseData.content.Address.pyHomeCountry}</em></p>
                    </div>}
                </p>
                <p>
                    {(caseData?.content?.PaymentDetails) && <div>
                        <h4>Payment details</h4>
                        <p>Payment Method : <em>{caseData.content.PaymentDetails.PaymentMethod}</em></p>
                        <p>Payment Status : <em>{caseData.content?.PaymentStatus}</em></p>
                    </div>}
                </p>
                <p>
                    {(caseData?.content?.pyStatusWork === "Resolved-Cancelled") && <div>
                        <h4>Cancellation Reason</h4>
                        <p><em>{caseData.content?.CancelReason}</em></p>
                    </div>}
                </p>
            </Accordion.Content>
        </Accordion>
    }
    function returnOrderDetails() {
        let MovieArray = [];
        if (caseData) { MovieArray = caseData?.content?.MovieList.map((Movie) => Movie.MovieInformation) }
        return <>{dataLoaded && <div>
            <h2>Order ID :{caseData?.content?.pyID}</h2>
            {caseData?.content?.pyStatusWork !== "out-for-delivery" && <OrderStatus status={caseData?.content?.pyStatusWork} />}
            {caseData?.childCases && renderDeliveryDetails()}
            <Table tableData={MovieArray} Columns={Columns} />
            <div><h4>Total cost : {caseData?.content?.TotalCost}</h4>
                {renderExtraDetils()}
                {caseData?.assignments && <Link to={"/Assignment/" + caseData?.assignments[0]?.ID}  ><button className="btn btn-primary">Process Order</button></Link>}
            </div>
        </div>}

        </>
    }
    return (
        <div>
            <RenderFormSkin formData={returnOrderDetails()} formTitle={"Order details"} isLoaded={dataLoaded} />
        </div>
    )
}
export default OrderDetails;