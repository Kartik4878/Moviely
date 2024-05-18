import React, { useState } from "react";
import Joi from 'joi-browser';

import {
    Button,
    Icon,
    Form
} from "semantic-ui-react";
import Datepickers from "../Common/Datepickers";
function Test() {
    const [formData, manageFormData] = useState();
    const [errors, manageErrors] = useState();

    function handleChange(e, data) {
        const FormDataCopy = formData ? { ...formData } : {};
        FormDataCopy[data.id] = data.value;
        manageFormData(FormDataCopy);
    }

    const schema = {
        firstName: Joi.string().min(4).required().label("First Name"),
        lastName: Joi.string().required().label("Last name"),
    }

    function validateForm() {
        const result = Joi.validate(formData, schema, { abortEarly: false });
        const errors = {};
        if (result.error) {
            for (let error of result.error.details) {
                errors[error.path[0]] = error.message;
            }
        }
        manageErrors(errors);
    }

    return (
        <div className="m-4">
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        id='firstName'
                        label='First name'
                        onChange={(e, data) => handleChange(e, data)}
                        placeholder='First name'
                        error={errors ? errors.firstName : false}
                    />
                    <Form.Input
                        fluid
                        id='lastName'
                        label='Last name'
                        placeholder='Last name'
                        onChange={(e, data) => handleChange(e, data)}
                        error={errors ? errors.lastName : false}
                    />
                </Form.Group>
            </Form>
            <Button size='large' color='blue' onClick={validateForm}>
                <Icon name='download' />
                Download
            </Button>
            <Datepickers />
        </div>
    )
}
export default Test;