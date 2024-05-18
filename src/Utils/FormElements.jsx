import React from "react";
import {
    Form
} from "semantic-ui-react";
import Table from "../Common/Table";

function renderDropDown(dropdown, handleValueChange, errors) {
    if (dropdown?.field && dropdown?.field?.readOnly) {
        return renderReadOnly(dropdown);
    }
    for (let option of dropdown.field.control.modes[0].options) {
        option["text"] = option["value"];
    }

    return <Form.Dropdown
        required={dropdown.field.required}
        disabled={dropdown.field.disabled}
        label={dropdown.field.label}
        name={dropdown.field.reference}
        placeholder={dropdown.field.control.modes[0].placeholder}
        labeled
        selection
        search
        clearable
        options={dropdown.field.control.modes[0].options}
        reference={dropdown.field.reference}
        data-test-id={dropdown.field.testID}
        onChange={(e, data) => handleValueChange(e, data)}
        error={errors ? errors[dropdown.field.reference] : false}
    // value={actionID === "TotalCost" ? TotalCostScreen[dropdown.field.reference] ? TotalCostScreen[dropdown.field.reference] : "" : null}

    />
}
function renderInput(numField, handleValueChange, errors) {
    if (numField?.field && numField?.field?.readOnly) {
        return renderReadOnly(numField);
    }
    return <Form.Input
        required={numField.field.required}
        disabled={numField.field.disabled}
        label={numField.field.label}
        name={numField.field.reference}
        placeholder={numField.field.control.modes[0].placeholder}
        labeled={"true"}
        selection={"true"}
        search={"true"}
        clearable={"true"}
        reference={numField.field.reference}
        data-test-id={numField.field.testID}
        onChange={(e, data) => handleValueChange(e, data)}
        error={errors ? errors[numField.field.reference] : false}
    // value={actionID === "TotalCost" ? TotalCostScreen[numField.field.reference] ? TotalCostScreen[numField.field.reference] : "" : null}
    />
}

function renderField(item, handleValueChange, errors) {
    if (item.field.control.type === "pxDropdown") return renderDropDown(item, handleValueChange, errors);
    else if (item.field.control.type === "pxCurrency" || item.field.control.type === "pxInteger" || item.field.control.type === "pxTextInput") return renderInput(item, handleValueChange, errors);

}

function renderTable(table) {
    const Columns = [];
    const tableData = [];
    for (let group of table.layout.header.groups) {
        Columns.push({ id: (group.caption.captionFor).substring((group.caption.captionFor).indexOf('.') + 1), label: group.caption.value, type: "text" });
    }
    for (let row of table.layout.rows) {
        let item = {};
        for (let group of row.groups) {
            item[(group.field.reference).substring((group.field.reference).indexOf('.') + 1).substring((group.field.reference).substring((group.field.reference).indexOf('.') + 1).indexOf('.') + 1)] = group.field.value;
        }
        item.pyGUID = item.Name;
        tableData.push(item);
    }
    return <Table tableData={tableData} Columns={Columns} />

}
function renderReadOnly(ReadOnlyfield) {
    return <span> <span>{ReadOnlyfield.field.label}</span> : <em>{ReadOnlyfield.field.value} </em></span>
}
function renderFieldGroups(group, handleValueChange, errors) {
    const fieldGroup = group.map((item) => <React.Fragment key={item.field.testID}>{renderField(item, handleValueChange, errors)}</React.Fragment>);
    return fieldGroup;
}
function getAllFields(actionID, assignData) {
    const formFields = {};
    if (actionID === "TotalCost") {
        const fields = assignData?.view?.groups[0]?.layout?.groups.filter((item) => (item.field));
        for (let item of fields) {
            formFields[item?.field?.reference] = item;
        }
    }
    else if (actionID === "RetryPayment") {
        const fields = assignData?.view?.groups[0]?.layout?.groups[0]?.view?.groups[0]?.layout?.groups.filter((item) => (item?.field));
        for (let item of fields) {
            formFields[item.field.reference] = item;
        }
    }
    return formFields;

}

const FormElements = {
    renderFieldGroups: renderFieldGroups,
    renderTable: renderTable,
    renderField: renderField,
    getAllFields: getAllFields
}
export default FormElements;