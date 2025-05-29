import React from "react";
import Nav from "../components/Nav";
import Copyright from "../components/Copyright";

const NoMatch = () => {
  return (
    <>
      <Nav></Nav>
      <div className="home" id="nomatch">
        <h1>
          404 ERROR <br />
          您所輸入之網址錯誤，請確認網址是否輸入正確!
        </h1>
      </div>
      <Copyright></Copyright>
    </>
  );
};

export default NoMatch;
