import React from "react";
function Search(props) {
    const { onSearch } = props;
    return (
        <div className="active-cyan-3 active-cyan-4 mb-4">
            <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={(e) => onSearch(e.currentTarget.value)} />
        </div>

    )
}
export default Search;