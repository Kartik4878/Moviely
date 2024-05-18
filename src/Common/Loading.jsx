import React from "react";
import loading from '../Media/loading.gif';

function Loading() {
    const loadingImage = {
        height: "300px",
        width: "300px"
    }
    return (
        <div className="m-4"><img style={loadingImage} src={loading} alt="Loading" /></div>
    )
}
export default Loading;