import React from "react";

import '../styles/Navbar.css'
import { Link, NavLink } from "react-router-dom"



function Navbar() {
    return (
        <nav>
            <Link to="/" className="title">Home</Link>
            <ul>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink to="/daily">Daily Expenses</NavLink>
                </li>
                <li>
                    <NavLink to="/monthly">Monthly Expenses</NavLink>
                </li>
                <li>
                    <NavLink to="/visualizations">Visualizations</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar