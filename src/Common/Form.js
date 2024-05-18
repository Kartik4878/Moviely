import { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }
    schema = {}
    backgroundStyle = {
        backgroundImage: "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
        height: "300px"

    }
    backgroundStyle2 = {
        marginTop: "-100px",
        background: "hsla(0, 0 %, 100 %, 0.8)",
        backdropFilter: "blur(30px)"

    }

    handleChange = (e) => {
        const data = { ...this.state.data };
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ data });
    }
    validateForm() {
        const result = Joi.validate(this.state.data, this.schema, { abortEarly: false });
        const errors = {};
        if (result.error) {
            for (let error of result.error.details) {
                errors[error.path[0]] = error.message;
            }
        }
        this.setState({ errors });

    }
    renderInput(id, label, type) {
        return <Input
            type={type}
            value={this.state.data[id]}
            error={this.state.errors[id]}
            label={label}
            name={id}
            onChange={this.handleChange} />
    }
    renderSubmit(label) {
        return <button type="submit" onClick={(e) => this.onSubmit(e)} className="btn btn-primary btn-block mb-4"> {label} </button>

    }
}
export default Form;