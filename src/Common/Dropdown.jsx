import React from "react";

function Dropdown({ dropdown }) {
    const { control, label } = dropdown.field;

    console.log(dropdown.field);
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor={dropdown.fieldID}>{label}</label>
            </div>
            <select className="custom-select" id={dropdown.fieldID}>
                <option key={"choose"}>Choose...</option>
                {control.modes[0].options.map((item) => <option key={item.key} value={item.key}>{item.value}</option>)}
            </select>
        </div>
    )
}
export default Dropdown;