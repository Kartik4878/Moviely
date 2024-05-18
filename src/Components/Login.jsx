import React from 'react';
import Form from '../Common/Form';
import Joi from 'joi-browser';
import AuthenticationServices from '../ApiConnections/AuthenticationServices';
import { toast } from 'react-toastify';
import RenderFormSkin from '../Common/RenderFormSkin';

class Login extends Form {
    state = {
        data: {
            username: "",
            password: ""
        },
        errors: {},
        loading: false
    }
    schema = {
        username: Joi.string().min(4).required().label("Username"),
        password: Joi.string().required().label("Password")
    }
    onSubmit = async (e) => {
        e.preventDefault();
        this.validateForm();
        this.setState({ loading: true });
        try {
            await AuthenticationServices.login(this.state.data.username, this.state.data.password);
            window.location = "/";
            toast.success("Logged in successfully");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error("Invalid user ID or password");
                this.setState({ loading: false });

            }
        }
    }
    returnLoginForm() {
        return (
            <>
                {!this.state.loading && <form>
                    <div className="form-outline mb-4">
                        {this.renderInput("username", "Username", "email")}
                        {this.renderInput("password", "Password", "password")}
                    </div>
                    {this.renderSubmit("Sign in")}
                </form>}
            </>
        )
    }
    render() {
        return (
            <RenderFormSkin formData={this.returnLoginForm()} formTitle={"Log in"} isLoaded={!this.state.loading} />
        );
    }
}

export default Login;