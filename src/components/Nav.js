import React from "react";
import logo from "../images/logo192.png";
import { Link } from "react-router";

const Nav = () => {
  return (
    <nav>
      <div id="logoimg">
        <img src={logo} alt="LOGO" />
      </div>
      <ul>
        <li>
          <Link to="/">首頁</Link>
        </li>
        <li>
          <Link to="/about">關於</Link>
        </li>
        <li>
          <Link to="/littlegame">小遊戲</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
