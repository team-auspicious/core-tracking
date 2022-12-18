import "./App.css";
import { useState } from "react";
import COLORS from "./foundation/index.json";
import Button from "./components/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <p>{count}</p>
        <div className="Btn-group">
          <button
            style={{ backgroundColor: COLORS.danger_color }}
            onClick={() => setCount((pre) => pre - 1)}
          >
            decrease
          </button>
          <button
            style={{ backgroundColor: COLORS.success_color }}
            onClick={() => setCount((pre) => pre + 1)}
          >
            increases
          </button>
          <Button />
        </div>
      </header>
    </div>
  );
}

export default App;
