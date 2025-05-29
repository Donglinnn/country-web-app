import React from "react";
import Nav from "../components/Nav";
import LittleGameContent from "../components/LittleGameContent";
import Copyright from "../components/Copyright";

const LittleGame = () => {
  return (
    <>
      <Nav></Nav>
      <div className="home">
        <LittleGameContent></LittleGameContent>
      </div>
      <Copyright></Copyright>
    </>
  );
};

export default LittleGame;
