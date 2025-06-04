import React from "react";

const FlagGame = ({
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
      <h1>你認得這面國旗嗎？</h1>
      {answer && (
        <img src={answer.flags.svg} alt={answer.flags.alt || "國旗"} />
      )}
      <div className="options">
        {options.map((country) => (
          <button
            key={country.name.common}
            onClick={() => handleSelect(country)}
            disabled={selected}
          >
            {getLocalizedName(country.name.common)}
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

export default FlagGame;
