import React, { useEffect } from "react";
import AuthenticationServices from "../ApiConnections/AuthenticationServices";
import { toast } from "react-toastify";
function Logout() {
    useEffect(() => {
        AuthenticationServices.logOut();
        window.location = "/login";
        toast.error("Logged out successfully");
    })
    return (
        <h1>Logged out</h1>
    )
}
export default Logout;