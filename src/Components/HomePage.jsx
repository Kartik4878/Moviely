import React from "react";
import ListGroup from "../Common/ListGroup";
import Table from "../Common/Table";
import Pagenate from "../Common/Pagenate";
import Search from "../Common/Search";
import AuthenticationServices from "../ApiConnections/AuthenticationServices";


function HomePage(props) {
    const { MovieList: tableData, Columns, Genre, sortedColumn, sortOrder, onSort, itemsPerPage, totalItems, currentPage, onCategoryChange, onSearch, activeCategory, onPageChange } = props;
    return (
        <React.Fragment>
            {AuthenticationServices.getLoginStatus() && <div className="m-4">
                <div className="row">
                    <div className="col-2">
                        <ListGroup CategoryList={Genre} activeCategory={activeCategory} onCategoryChange={onCategoryChange} />
                    </div>
                    <div className="col-10">
                        <Search onSearch={onSearch} />
                        {tableData.length === 0 && <div className="m-4"><h2>No Movies were found.. :-(</h2></div>}
                        {tableData.length > 0 && <Table tableData={tableData} Columns={Columns} sortedColumn={sortedColumn} sortOrder={sortOrder} onSort={onSort} />}
                    </div>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <Pagenate itemsPerPage={itemsPerPage} totalItems={totalItems} onPageChange={onPageChange} currentPage={currentPage} />
                        </div>
                    </div>
                </div>
            </div>}
            {
                !AuthenticationServices.getLoginStatus() && <h1>Please log-in to see the movies.</h1>
            }

        </React.Fragment>
    )

}
export default HomePage;