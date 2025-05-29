import React from "react";

const CapitalGame = ({
  answer,
  options,
  handleSelect,
  selected,
  getLocalizedName,
  feedback,
  generateQuestion,
  countries,
}) => {
  return (
    <div className="gameArea">
      <h1>你知道下面國家或地區的首都在哪裡嗎？</h1>
      {answer && (
        <h2>{`${getLocalizedName(answer.name.common)} - ${
          answer.name.common
        }`}</h2>
      )}
      <div className="options">
        {options.map((country) => (
          <button
            key={country.name.common}
            onClick={() => handleSelect(country)}
            disabled={selected}
          >
            {getLocalizedName(country.capital?.[0]) || "京都"}
          </button>
        ))}
      </div>
      {feedback && (
        <div>
          <p>{feedback}</p>
          <button onClick={() => generateQuestion(countries)}>下一題</button>
        </div>
      )}
    </div>
  );
};

export default CapitalGame;
