import React from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

const Datepickers = ({ onChange, reference }) => {
    function onValueChange(e, data) {
        data.reference = reference;
        onChange(e, data)

    }
    return <SemanticDatepicker onChange={(e, data) => onValueChange(e, data)} />;
};

export default Datepickers;