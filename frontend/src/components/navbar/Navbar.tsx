import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Hamburger from "hamburger-react";

export const Navbar: React.FunctionComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="mobile-menu">
        <Hamburger toggled={isExpanded} toggle={setIsExpanded} />
      </div>
      {/* <Link to="/"> */}
        {/* <img
          className="navbar__logo"
          src="/logo.png"
          alt="Whale Spotting logo"
        /> */}
      {/* </Link> */}
      <ul className={`menu-items ${isExpanded ? "expanded" : ""}`}>
        <Link to="/" onClick={() => setIsExpanded(false)}>
          Home
        </Link>
        <Link to="/quartets/contestlist" onClick={() => setIsExpanded(false)}>
          Quartet Contests
        </Link>
        <Link to="/choruses/contestlist" onClick={() => setIsExpanded(false)}>
          Chorus Contests
        </Link>
        <Link to="/search" onClick={() => setIsExpanded(false)}>
          Search
        </Link>
        <Link to="/contact" onClick={() => setIsExpanded(false)}>
          Contact Us
        </Link>
      </ul>
    </nav>
  );
};
