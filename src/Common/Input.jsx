import React from "react";
function Input(props) {
    const { value, error, type, label, name, onChange } = props;
    return (
        <>
            <input onChange={(e) => onChange(e)} name={name} value={value} type={type} id={name} className="form-control" />
            <label className="form-label" htmlFor={name}>{label}</label>
            {error && <div> <p className="alert alert-danger">{error}</p></div>}
        </>
    )
}
export default Input;