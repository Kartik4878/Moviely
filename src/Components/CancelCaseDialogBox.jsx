import React, { useEffect } from "react";
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import APIHandler from "../ApiConnections/APIHandler";
import configs from "../configs.json"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function CancelCaseDialogBox({ assignID, actionID, onOrderReload, onCancelSubmission }) {
    const [open, setOpen] = React.useState(false);
    const [cancelReason, SetCancelReason] = React.useState("");

    const navigate = useNavigate();
    useEffect(() => {
        async function getCancelData() {
            try {
                await APIHandler.get(configs.Assignment + assignID + "/actions/" + actionID);
            } catch (error) {
                toast.error("Some unexpected error occured")
            }
        }
        getCancelData();

    }, [assignID, actionID])
    async function onCancelSubmit() {
        const submissionData = {
            content: {
                CancelReason: cancelReason
            },
            pageInstructions: []
        }
        try {
            onCancelSubmission();
            setOpen(false);
            await APIHandler.post(configs.Assignment + assignID + "?actionID=" + actionID, submissionData);
            await onOrderReload();
            navigate("/MyOrders");
            toast.error("Order cancelled");
        } catch (error) {
            toast.error("Some unexpected error occured");

        }

    }
    function handleCancelReason(event) {
        const cancelReason = event.target.value;
        SetCancelReason(cancelReason);
    }
    return (

        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            trigger={<Button color='red'>Cancel order</Button>}
        >
            <Header icon>
                <Icon name='archive' />
                Cancel this order
            </Header>

            <Modal.Content>
                <p>
                    Are you sure to cancel this order?
                    <h5>Please provide a reason to cancel.</h5>
                    <form>
                        <label htmlFor="cancelReason"></label>
                        <input onChange={(e) => handleCancelReason(e)} type="text" name="cancelReason" />
                    </form>

                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No
                </Button>
                <Button color='green' inverted onClick={onCancelSubmit}>
                    <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>

        </Modal>

    )
}
export default CancelCaseDialogBox;