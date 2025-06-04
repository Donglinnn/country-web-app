import React, { useState, useEffect } from "react";
import * as nameMap from "../data/countryNaming.json";
import CountryCard from "./CountryCard";

const HomeContent = () => {
  const [resData, setResData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null); // 用來記錄目前點擊的洲
  const [selectedCountry, setSelectedCountry] = useState(null); // 用來紀錄目前點擊的國家
  const [loading, setLoading] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  // 根據匯入的json檔對應顯示中文名稱，若沒對應名稱則顯示原文
  const getLocalizedName = (name) => {
    return nameMap[name] || name;
  };

  const onSearch = async (region) => {
    if (selectedRegion === region) {
      // 同一洲點第二次 → 關閉
      setSelectedRegion(null);
      setResData([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      const data = await res.json();
      // console.log(data);
      setResData(data);
      setSelectedRegion(region);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevCountry = () => {
    const currentIndex = resData.findIndex(
      (c) => c.name.common === selectedCountry.name.common
    );
    if (currentIndex > 0) {
      setAnimationClass("slide-in-left");
      setSelectedCountry(resData[currentIndex - 1]);
    }
  };

  const handleNextCountry = () => {
    const currentIndex = resData.findIndex(
      (c) => c.name.common === selectedCountry.name.common
    );
    if (currentIndex < resData.length - 1) {
      setAnimationClass("slide-in-right");
      setSelectedCountry(resData[currentIndex + 1]);
    }
  };

  useEffect(() => {
    if (animationClass) {
      const timer = setTimeout(() => setAnimationClass(""), 400);
      return () => clearTimeout(timer);
    }
  }, [animationClass]);

  const isFirst = () =>
    resData.findIndex(
      (c) => c.name.common === selectedCountry?.name?.common
    ) === 0;

  const isLast = () =>
    resData.findIndex(
      (c) => c.name.common === selectedCountry?.name?.common
    ) ===
    resData.length - 1;

  return (
    <>
      <div className="undernav"></div>
      <div className="mainArea">
        <div className="selectButton">
          <button onClick={() => onSearch("asia")}>亞洲 Asia</button>
          <button onClick={() => onSearch("europe")}>歐洲 Europe</button>
          <button onClick={() => onSearch("america")}>美洲 American</button>
          <button onClick={() => onSearch("africa")}>非洲 Africa</button>
          <button onClick={() => onSearch("oceania")}>大洋洲 Oceania</button>
        </div>

        <div className="countryButton">
          {loading && <p>讀取中...</p>}
          {selectedRegion &&
            resData.map((country) => {
              // console.log(country.name.common);
              return (
                <button
                  key={country.name.common}
                  onClick={() => setSelectedCountry(country)}
                >
                  {getLocalizedName(country.name.common)}
                </button>
              );
            })}
        </div>

        {selectedCountry && (
          <CountryCard
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            handlePrevCountry={handlePrevCountry}
            handleNextCountry={handleNextCountry}
            getLocalizedName={getLocalizedName}
            isFirst={isFirst()}
            isLast={isLast()}
            animationClass={animationClass}
          ></CountryCard>
        )}
      </div>
    </>
  );
};

export default HomeContent;
