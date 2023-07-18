import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        Football Manager
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav nav nav-underline">
                            {/*<NavLink className="nav-link" to="/teams" activeClassName="active">*/}
                            {/*    Teams*/}
                            {/*</NavLink>*/}
                            <NavLink className="nav-link" to="/players" activeClassName="active">
                                Players
                            </NavLink>
                            <NavLink className="nav-link" to="/games" activeClassName="active">
                                Games
                            </NavLink>
                            <NavLink className="nav-link" to="/stadiums" activeClassName="active">
                                Stadiums
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
