import React from "react";
import RenderFormSkin from "../Common/RenderFormSkin";

function MyProfile() {
    const { data } = JSON.parse(localStorage.getItem("UserData"));
    function renderCard() {
        return <section >
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col col-lg-6 mb-4 mb-lg-0">
                    <div className="card mb-3" style={{ "borderRadius": ".5rem" }}>
                        <div className="row g-0">
                            <div className="col-md-4 gradient-custom text-center text-white"
                                style={{ "borderTopLeftRadius": ".5rem", "borderBottomLeftRadius": ".5rem" }}>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                    alt="Avatar" className="img-fluid my-5" style={{ "width": "80px" }} />
                                <h5>Marie Horwitz</h5>
                                <p>Web Designer</p>
                                <i className="far fa-edit mb-5"></i>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body p-4">
                                    <h6>{data.pyUserName}</h6>
                                    <hr className="mt-0 mb-4" />
                                    <div className="row pt-1">
                                        <div className="col-6 mb-3">
                                            <h6>Email</h6>
                                            <p className="text-muted">{data.pyAddresses.Email.pyEmailAddress}</p>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <h6>Phone</h6>
                                            <p className="text-muted">{data.pyTelephone}</p>
                                        </div>
                                    </div>
                                    <h6>Info</h6>
                                    <hr className="mt-0 mb-4" />
                                    <div className="row pt-1">
                                        <div className="col-6 mb-3">
                                            <h6>Membership</h6>
                                            <p className="text-muted">{data.pyPosition}</p>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <h6>Joined since</h6>
                                            <p className="text-muted">{data.pxCreateDateTime}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    }
    return (
        <>
            <RenderFormSkin formData={renderCard()} formTitle={"My Profile"} isLoaded={true} />
        </>
    )
}
export default MyProfile;