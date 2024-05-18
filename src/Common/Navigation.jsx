import React from "react";
import { Link } from "react-router-dom";
import NotificationDot from "./NotificationDot";

function Navigation(props) {
    const { navItems, currentNavPage, onNavChange, cartItemCount } = props;
    function getClassName(NavID) {
        if (currentNavPage === NavID) {
            return "nav-item disabled"
        }
        return "nav-item active"
    }
    return (<>

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-2">

            <Link to={"/"} onClick={() => onNavChange("home")} className="navbar-brand">MovieLy</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    {navItems.map((item) => (
                        <React.Fragment key={item.id}>{item.isVisible && <li className={getClassName(item.id)} >
                            <Link onClick={() => onNavChange(item.id)} className="nav-link" to={item.to}>{item.label}<span className="sr-only">(current)</span> {item.showIcon && <NotificationDot countValue={cartItemCount} />}</Link>
                        </li>}</React.Fragment>
                    ))}
                </ul>
                <span className="navbar-text">
                </span>
            </div>
        </nav>


    </>


    )
}
export default Navigation;