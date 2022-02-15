import React from "react";

const Header = ({title, logo}) => {
    return (
        <header className="header">
            <img src={logo} alt="Logo" style={{width: "140px"}} />
            <div className="headerText">{title}</div>
        </header>
    )
};

export default Header;