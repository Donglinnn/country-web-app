import React, { useEffect } from "react";
import Nav from "../components/Nav";
import HomeContent from "../components/HomeContent";
import Copyright from "../components/Copyright";

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector("nav");
      if (window.scrollY > 0) {
        nav.classList.remove("transparent");
        nav.classList.add("solid");
      } else {
        nav.classList.remove("solid");
        nav.classList.add("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // 預設執行一次（避免沒滾也出現透明）
    handleScroll();

    // 清除監聽器 (避免重複出現相同監聽器)
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Nav></Nav>
      <div className="home">
        <HomeContent></HomeContent>
      </div>
      <Copyright></Copyright>
    </>
  );
};

export default Home;
