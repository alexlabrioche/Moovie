import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return(
      <nav className="navbar">
        <Link  to="/">Hello</Link>

        <ul className="nav fixed-top justify-content-center">
          <li className="nav-item">
            <Link className="nav-link" to="/discover">This week</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Popular movies</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/my-list/">My list</Link>
          </li>
        </ul>
      </nav>
    );
  };
};

export default NavBar;


