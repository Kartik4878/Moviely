import React from 'react';
import Joi from "joi-browser";
import Form from '../Common/Form';
import AuthenticationServices from '../ApiConnections/AuthenticationServices';
import { toast } from 'react-toastify';
import RenderFormSkin from '../Common/RenderFormSkin';

class Register extends Form {
    state = {
        data: {
            firstname: "",
            lastname: "",
            username: "",
            password: ""
        },
        errors: {}
    }
    schema = {
        firstname: Joi.string().min(4).required().label("First name"),
        lastname: Joi.string().required().label("Last name"),
        username: Joi.string().min(4).required().label("Username"),
        password: Joi.string().required().label("Password")
    }
    onSubmit = async (e) => {
        e.preventDefault();
        this.validateForm();
        const { data } = this.state;
        const UserInfo = {

            pyFirstName: data.firstname,
            pyLastName: data.lastname,
            pyUserIdentifier: data.username,
            pyNote: data.password

        }

        try {
            await AuthenticationServices.createNewUser(UserInfo);
            toast.success("User account created successfully");
            await AuthenticationServices.login(data.username, data.password);
            window.location = "/";
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error("Something went wrong");
            }
        }
    }
    returnRegisterForm() {
        return (
            <form>
                <div class="row">
                    <div class="col-md-6 mb-4">
                        <div class="form-outline">
                            {this.renderInput("firstname", "First name", "text")}
                        </div>
                    </div>
                    <div class="col-md-6 mb-4">
                        <div class="form-outline">
                            {this.renderInput("lastname", "First name", "lastname")}

                        </div>
                    </div>
                </div>
                <div className="form-outline mb-4">
                    {this.renderInput("username", "Username", "email")}
                    {this.renderInput("password", "Password", "password")}
                </div>
                {this.renderSubmit("Sign up")}
            </form>

        )
    }
    render() {

        return (
            <RenderFormSkin formData={this.returnRegisterForm()} formTitle={"Register now!"} isLoaded={true} />
        );
    }
}

export default Register;