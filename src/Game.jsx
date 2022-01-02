import { useState } from "react";
import "./Game.css";
import produce from 'immer';

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
  return (
    <div style={{display: 'grid', gridTemplateColumns:`repeat(${colCount}, 20px)`}}>
      {grid.map((row, i) =>
        row.map((col, j) => (
          <div
            key={`${i}-${j}`}
            onClick={()=> {
              const newGrid = produce (grid, gridCopy => {
                gridCopy[i][j]=1;
              })
              setGrid(newGrid)
            }}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[i][j] ? "black" : undefined,
              border: "solid 1px black"
            }}
          ></div>
        ))
      )}
    </div>
  );
};

export default Game;
