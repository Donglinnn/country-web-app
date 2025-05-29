import { Route, Routes } from "react-router";
import "./css/style.css";
import Home from "./pages/Home";
import About from "./pages/About";
import LittleGame from "./pages/LittleGame";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="littlegame" element={<LittleGame />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
