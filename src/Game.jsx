import { useState } from "react";
import "./Game.css";

const rowCount = 50;
const colCount = 50;

const Game = () => {
  const [grid, setGrid] = useState(() => {
    const row = [];
    for (let i = 0; i < rowCount; i++) {
      row.push(Array.from(Array(colCount), () => 0));
    }
    return row;
  });

  console.log(grid);
  return <div></div>;
};

export default Game;
