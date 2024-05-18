import React from "react";
function ListGroup(props) {
    const { CategoryList, activeCategory, onCategoryChange } = props;
    function getClassName(category) {
        if (category === activeCategory) {
            return "list-group-item list-group-item-action active"
        }
        return "list-group-item list-group-item-action"
    }
    return (
        <div className="list-group">
            {CategoryList.map((item) => (
                <button key={item.Genre} className={getClassName(item.Genre)} onClick={() => onCategoryChange(item.Genre)}>{item.Genre}</button>
            ))}
        </div>
    )
}
export default ListGroup;