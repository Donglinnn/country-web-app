import React from "react";
import Nav from "../components/Nav";
import Copyright from "../components/Copyright";

const About = () => {
  return (
    <>
      <Nav></Nav>
      <div className="undernav"></div>
      <div className="home" id="about">
        <h1>關於這個網站 About This Website</h1>
        <p>
          哈囉，我是冬林。
          <br />
          這是一個可以看到各大洲國家及領地的基本資訊的網站，舉凡國旗、面積、人口、首都、以及位置等等，透過連接
          REST Countries API
          來獲取資料，另外也有做簡單的小遊戲互動，如猜國旗及猜首都。
        </p>
        <p>
          Hello, I am Donglinnn.
          <br />
          This is a website that can show the information of countries or
          territories around the world, ranging from flag, area, population,
          capital to location.
          <br />
          This website gets data through connecting to REST Countries API.
          <br />
          In addition, I also arrange some simple games such as guessing flags
          and guessing capitals that users can interact with.
        </p>
      </div>
      <Copyright></Copyright>
    </>
  );
};

export default About;
