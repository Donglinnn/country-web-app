import React, { useEffect, useState } from "react";
import * as nameMap from "../data/countryNaming.json";
import FlagGame from "./FlagGame.js";
import CapitalGame from "./CapitalGame.js";

const LittleGameContent = () => {
  const [selectedGame, setSelectedGame] = useState(null); // 紀錄目前所選的遊戲
  const [countries, setCountries] = useState([]); // 紀錄API回傳的國家資料
  const [answer, setAnswer] = useState(null); // 紀錄正確答案
  const [options, setOptions] = useState([]); // 紀錄題目的選項
  const [selected, setSelected] = useState(null); // 紀錄使用者所選之選項
  const [feedback, setFeedback] = useState(""); //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          "https://restcountries.com/v3.1/region/asia",
          "https://restcountries.com/v3.1/region/europe",
          "https://restcountries.com/v3.1/region/america",
          "https://restcountries.com/v3.1/region/africa",
          "https://restcountries.com/v3.1/region/oceania",
        ];

        // 等待所有Promise fulfill
        const res = await Promise.all(urls.map((url) => fetch(url)));
        const resJson = await Promise.all(res.map((res) => res.json()));

        const data = resJson.flat(); // 把每個res.json回來的資料併成一個陣列
        setCountries(data); // 把所有收到的國家資訊存到countries陣列
        generateQuestion(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  // 根據匯入的json檔對應顯示中文名稱，若沒對應名稱則顯示原文
  const getLocalizedName = (name) => {
    return nameMap[name] || name;
  };

  // 根據傳入的國家鎮列，產生隨機挑選出正確答案及三個錯誤答案的題目
  const generateQuestion = (data) => {
    // 隨機指定一個國家作為答案
    let randomIndex = Math.floor(Math.random() * data.length);
    const correctCountry = data[randomIndex];

    // 把正確答案放到選項名單裡
    const options = [correctCountry];

    // 製作四個選項
    while (options.length < 4) {
      randomIndex = Math.floor(Math.random() * data.length); // 重選一個新的國家
      const candidate = data[randomIndex];

      // 若選中的候選選項不為正確答案則放入選項名單中，若相同則重新挑選
      if (!options.find((c) => c === candidate)) {
        options.push(candidate);
      }
    }

    // 洗牌選項，避免每題答案都是第一個
    options.sort(() => 0.5 - Math.random());

    setAnswer(correctCountry); // 把answer設為正確答案國家的資料
    setOptions(options);
    setSelected(null);
    setFeedback("");
  };

  const handleSelect = (country) => {
    // 將selected設為玩家選擇的國家
    setSelected(country);

    // 若所選答案為正確答案
    if (country === answer) {
      setFeedback("答對了！");
    } else {
      // 判斷現在啟動的遊戲
      if (selectedGame === "guessFlag") {
        setFeedback(
          `答錯了，正確答案是 ${getLocalizedName(answer.name.common)}`
        );
      } else if (selectedGame === "guessCapital") {
        setFeedback(
          `答錯了，正確答案是 ${getLocalizedName(answer.capital?.[0])}`
        );
      }
    }
  };

  return (
    <>
      <div className="undernav"></div>
      <div className="mainArea">
        <div className="selectButton">
          <button
            onClick={() => {
              if (selectedGame !== "guessFlag") setSelectedGame("guessFlag");
              else setSelectedGame(null);
            }}
          >
            猜國旗
          </button>
          <button
            onClick={() => {
              if (selectedGame !== "guessCapital")
                setSelectedGame("guessCapital");
              else setSelectedGame(null);
            }}
          >
            猜首都
          </button>
          <button>猜國家</button>
        </div>
        <div className="gameButton">
          {selectedGame === "guessFlag" && (
            <FlagGame
              answer={answer}
              options={options}
              handleSelect={handleSelect}
              selected={selected}
              getLocalizedName={getLocalizedName}
              feedback={feedback}
              generateQuestion={generateQuestion}
              countries={countries}
            ></FlagGame>
          )}

          {selectedGame === "guessCapital" && (
            <CapitalGame
              answer={answer}
              options={options}
              handleSelect={handleSelect}
              selected={selected}
              getLocalizedName={getLocalizedName}
              feedback={feedback}
              generateQuestion={generateQuestion}
              countries={countries}
            ></CapitalGame>
          )}
        </div>
      </div>
    </>
  );
};

export default LittleGameContent;
