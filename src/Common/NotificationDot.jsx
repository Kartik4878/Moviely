import React from "react";
function NotificationDot(props) {
    const { countValue } = props;
    if (countValue) return <span className="badge rounded-pill badge-notification bg-danger">{countValue}</span>
    return <></>

}
export default NotificationDot;