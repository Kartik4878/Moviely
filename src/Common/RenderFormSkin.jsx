import React from "react";
import Loading from "./Loading";

function RenderFormSkin({ formData, formTitle, isLoaded }) {
    const backgroundStyle = {
        backgroundImage: "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
        height: "300px"

    }
    const backgroundStyle2 = {
        marginTop: "-100px",
        background: "hsla(0, 0 %, 100 %, 0.8)",
        backdropFilter: "blur(30px)"

    }
    return (
        <React.Fragment>
            <section className="text-center">
                <div className="p-5 bg-image" style={backgroundStyle}></div>
                <div className="card mx-4 mx-md-5 shadow-5-strong" style={backgroundStyle2}>
                    <div className="card-body py-5 px-md-5">
                        <div className="row d-flex justify-content-center">
                            {isLoaded && <div className="col-lg-8">
                                <h2 className="fw-bold mb-5">{formTitle}</h2>
                                <div className="form-outline mb-4">
                                    {formData}
                                </div>
                            </div>}
                            {(!isLoaded) && <Loading />}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )

}
export default RenderFormSkin;