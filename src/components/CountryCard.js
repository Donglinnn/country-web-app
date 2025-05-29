import React from "react";

const CountryCard = ({
  selectedCountry,
  setSelectedCountry,
  handlePrevCountry,
  handleNextCountry,
  getLocalizedName,
  isFirst,
  isLast,
  animationClass, // 新增動畫 class
}) => {
  return (
    <div className="modal-bg" onClick={() => setSelectedCountry(null)}>
      <button
        className="arrowBtn left"
        onClick={(e) => {
          handlePrevCountry();
          e.stopPropagation();
        }}
        disabled={isFirst}
      >
        ←
      </button>
      <div
        className={`countryInfo ${animationClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="countryContent">
          <h2>
            {getLocalizedName(selectedCountry.name.common)} -{" "}
            {selectedCountry.name.common}
          </h2>
          <div className="cardDivisor">
            <div className="cardLeft">
              <img
                src={selectedCountry.flags.svg}
                alt={
                  selectedCountry.flags.alt ||
                  `${getLocalizedName(selectedCountry.name.common)}的國旗`
                }
              />
            </div>
            <div className="cardRight">
              <p>
                <strong>首都（首府）：</strong>
                {getLocalizedName(selectedCountry.capital?.[0]) || "無"}
              </p>
              <p>
                <strong>人口：</strong>
                {selectedCountry.population.toLocaleString()} 人
              </p>
              <p>
                <strong>面積：</strong>
                {selectedCountry.area.toLocaleString()} 平方公里
              </p>
              <p>
                <strong>區域：</strong>
                {getLocalizedName(selectedCountry.subregion)}
              </p>
              <p>
                <strong>座標：</strong>
                {selectedCountry.latlng[1] > 0 ? "東經" : "西經"}{" "}
                {Math.abs(Math.round(selectedCountry.latlng[1]))} 度，
                {selectedCountry.latlng[0] > 0 ? "北緯" : "南緯"}{" "}
                {Math.abs(Math.round(selectedCountry.latlng[0]))} 度
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="arrowBtn right"
        onClick={(e) => {
          handleNextCountry();
          e.stopPropagation();
        }}
        disabled={isLast}
      >
        →
      </button>
    </div>
  );
};

export default CountryCard;
