import React from "react";
function PegaInput({ inputData }) {
    const { value, type, label, name, onChange } = inputData;
    return (
        <>
            <input onChange={(e) => onChange(e)} name={name} value={value} type={type} id={name} className="form-control" />
            <label className="form-label" htmlFor={name}>{label}</label>

        </>
    )
}
export default PegaInput;