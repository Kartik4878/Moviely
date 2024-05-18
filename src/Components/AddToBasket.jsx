import React from "react";
import _ from "lodash";
function AddToBasket(props) {

    const { onCartAdd, item, cartItems } = props;
    function getClassName(item) {

        if (cartItems && _.findIndex(cartItems, function (i) { return i.pyGUID === item.pyGUID }) < 0) {
            return "btn btn-primary m-4";
        }
        return "btn btn-primary m-4 disabled"
    }
    return (
        <button className={getClassName(item)} onClick={() => onCartAdd(item)}>Add to cart</button>
    )
}
export default AddToBasket;