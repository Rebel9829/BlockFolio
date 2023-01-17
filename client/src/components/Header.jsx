import React from "react";
import "./header.css";

function Header(props) {
    return (
        <div className="header">
            <div className="head-blue">
                <div className="nav-container">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        {/* <Link className="nav-link " to="/">Home</Link> */}
                                        <a href="/" className="nav-link" aria-current="page">DASHBOARD</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/comp">MY COMPANIES</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/form">RAISE FUNDS</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="logo">
                                <h1>BlockFolio</h1>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Header;