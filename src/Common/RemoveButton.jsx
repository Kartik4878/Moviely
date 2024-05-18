import React from "react";
function RemoveButton(props) {
    const { onRemove } = props;
    return (
        <button className="btn btn-danger" onClick={() => onRemove()}>Remove</button>
    )
}
export default RemoveButton;