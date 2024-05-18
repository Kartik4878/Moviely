import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIHandler from "../ApiConnections/APIHandler";
import { toast } from "react-toastify";
import Joi from 'joi-browser';
import configs from ".././configs.json"
import RenderFormSkin from "../Common/RenderFormSkin";
import FormElements from "../Utils/FormElements";
import {
    Button,
    Form
} from "semantic-ui-react";
import CancelCaseDialogBox from "./CancelCaseDialogBox";
import Datepickers from "../Common/Datepickers";


function Assignment({ onOrderReload, CaseID }) {
    const { assignID } = useParams();
    const [actionID, manageActionID] = useState();
    const [cancelActionID, manageCancelActionID] = useState();
    const [assignData, ManageAssignData] = useState();
    const [dataLoaded, ManageLoading] = useState();
    const [formData, manageFormData] = useState({});
    const [errors, manageErrors] = useState();
    const [assignSubmitted, ManageAssignSubmitted] = useState();


    const TotalCostScreenSchema = {
        CollectionMethod: Joi.string().required().min(1).label("Collection Method")
    }

    let navigate = useNavigate();

    useEffect(() => {
        ManageLoading(false);
        async function getAssignmentData() {
            try {
                manageFormData({});
                ManageAssignSubmitted(false);
                const assignActions = await APIHandler.get(configs.Assignment + assignID);
                const actions = assignActions.data.actions;
                let { data } = await APIHandler.get(configs.Assignment + assignID + "/actions/" + actions[0].ID);
                manageActionID(actions[0].ID);
                manageCancelActionID(actions[3].ID);
                ManageAssignData(data);
                ManageLoading(true);
            } catch (error) {
                if (error.response && error.response.status === 423) {
                    toast.error("The resource that is being accessed is locked");
                }
            }
        }
        getAssignmentData();
    }, [assignID, assignSubmitted]);

    function validateForm() {
        let schema = {};
        if (actionID === "TotalCost") schema = TotalCostScreenSchema;
        let result = Joi.validate(formData, schema, { abortEarly: false });
        result = {}; //removing validation check
        const errors = {};
        if (result?.error) {
            for (let error of result.error.details) {
                errors[error.path[0]] = error.message;
            }
        }
        manageErrors(errors);
    }
    function handleValueChange(e, data) {
        const formDataCopy = formData ? { ...formData } : {}
        formDataCopy[data.reference] = data.value;
        manageFormData(formDataCopy)
    }
    async function handleFormSubmission() {
        let submissionData = {};
        if (actionID === "TotalCost") {
            submissionData = {
                content: {
                    CollectionMethod: formData.CollectionMethod,
                    Address: formData.CollectionMethod === "Home Delivery" ? {
                        pyHomeStreet: formData["Address.pyHomeStreet"],
                        pyCity: formData["Address.pyCity"],
                        pyHomeCountry: formData["Address.pyHomeCountry"]
                    } : null
                },
                pageInstructions: []
            }
        } else if (actionID === "RetryPayment") {
            submissionData = {
                content: {
                    PaymentDetails: {
                        PaymentMethod: formData["PaymentDetails.PaymentMethod"],
                        UPIID: formData["PaymentDetails.PaymentMethod"] === "UPI" ? formData["PaymentDetails.UPIID"] : null,
                        CardDetails: formData["PaymentDetails.PaymentMethod"] === "Debit card" ? {
                            CardNumber: formData["PaymentDetails.CardDetails.CardNumber"],
                            Pin: formData["PaymentDetails.CardDetails.Pin"],
                            ExpireDate: formData["PaymentDetails.CardDetails.ExpireDate"]
                        } : null
                    }
                },
                pageInstructions: []
            }

        }
        else if (actionID === "ProvidePickupDate") {
            submissionData = {
                content: {
                    NoOfDays: formData["NoOfDays"]
                },
                pageInstructions: []
            }
        }
        try {
            validateForm();
            ManageLoading(false);
            const { data } = await APIHandler.post(configs.Assignment + assignID + "?actionID=" + actionID, submissionData);
            await onOrderReload();
            ManageAssignSubmitted(true);
            if (actionID === "RetryPayment") {
                await getPaymentStatus();
            }
            if (data?.nextAssignmentID) {
                navigate("/Assignment/" + data.nextAssignmentID);
            } else navigate("/MyOrders");
        } catch (error) {
            ManageLoading(true);
            if (error.response.status === 400 && error.response.data?.errors) {
                let errors = { ...error.response.data?.errors };
                toast.error(errors[0]?.ValidationMessages[0]?.Path + " : " + errors[0]?.ValidationMessages[0]?.ValidationMessage);
            }
        }
    }

    async function getPaymentStatus() {
        const caseID = CaseID;
        const { data } = await APIHandler.get(configs.CaseDetails + caseID);
        if (data?.PaymentStatus === "Successful") {
            toast.success("Payment successful");
        }
        else if (data?.PaymentStatus === "Failed") {
            toast.error("Payment failed");
        }
        else if (data?.PaymentStatus === "COD") {
            toast.warn("Payment will be collected on delivery");
        }
    }
    function handleCancelSubmisson() {
        ManageLoading(false);
    }

    function returnForm() {
        const formFields = FormElements.getAllFields(actionID, assignData);

        return (<>
            {
                actionID === "TotalCost" && <Form>
                    <div className="m-4">
                        {assignData && FormElements.renderTable(assignData.view.groups[0].layout.groups[0].view.groups[0])}
                    </div>
                    <div className="m-4">
                        {assignData && FormElements.renderField(formFields?.TotalCost, handleValueChange, errors)}
                        {assignData && FormElements.renderField(formFields?.CollectionMethod, handleValueChange, errors)}
                        {(assignData && formData?.CollectionMethod === "Home Delivery") && FormElements.renderFieldGroups(assignData.view.groups[0].layout.groups[3].view.groups[0].layout.groups, handleValueChange, errors)}
                        <CancelCaseDialogBox assignID={assignID} actionID={cancelActionID} onOrderReload={onOrderReload} onCancelSubmission={handleCancelSubmisson} />
                        <Button size='large' color='blue' onClick={handleFormSubmission}>
                            Proceed
                        </Button>
                    </div>
                </Form>
            }
            {(actionID === "RetryPayment") && <Form>
                {formFields && <div className="m-4">
                    {FormElements.renderField(formFields["PaymentDetails.PaymentMethod"], handleValueChange, errors)}
                    {(formData && formData["PaymentDetails.PaymentMethod"] && formData["PaymentDetails.PaymentMethod"] === "UPI") && FormElements.renderField(formFields["PaymentDetails.UPIID"], handleValueChange, errors)}
                    {(formData && formData["PaymentDetails.PaymentMethod"] && formData["PaymentDetails.PaymentMethod"] === "Debit card") && FormElements.renderFieldGroups(assignData.view.groups[0].layout.groups[0].view.groups[0].layout.groups[2].view.groups[0].layout.groups, handleValueChange, errors)}
                    {(formData && formData["PaymentDetails.PaymentMethod"] && formData["PaymentDetails.PaymentMethod"] === "Debit card") && <div className="m-2"><Datepickers onChange={handleValueChange} reference={"PaymentDetails.CardDetails.ExpireDate"} /></div>}



                    <CancelCaseDialogBox assignID={assignID} actionID={cancelActionID} onOrderReload={onOrderReload} onCancelSubmission={handleCancelSubmisson} />
                    <Button size='large' color='blue' onClick={handleFormSubmission}>
                        Proceed
                    </Button>
                </div>}
            </Form>}
            {(actionID === "ProvidePickupDate") && <Form>

                {FormElements.renderField(assignData?.view?.groups[0]?.layout?.groups[0], handleValueChange, errors)}
                <div>
                    <CancelCaseDialogBox assignID={assignID} actionID={cancelActionID} onOrderReload={onOrderReload} onCancelSubmission={handleCancelSubmisson} />
                    <Button size='large' color='blue' onClick={handleFormSubmission}>
                        Proceed
                    </Button>
                </div>
            </Form>}
        </>)
    }
    return (
        <>
            <RenderFormSkin formData={returnForm()} formTitle={assignData?.name} isLoaded={dataLoaded} />
        </>
    )

}
export default Assignment;
