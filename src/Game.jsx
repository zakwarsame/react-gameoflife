import { useCallback, useRef, useState } from "react";
import "./Game.css";
import produce from 'immer';

const rowCount = 50;
const colCount = 50;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
]

const clearGrid = () => {
  const row = [];
  for (let i = 0; i < rowCount; i++) {
    row.push(Array.from(Array(colCount), () => 0));
  }
  return row;
}

const Game = () => {
  const [grid, setGrid] = useState(() => {
    return clearGrid()
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running

  const runSimulation = useCallback(() => {
    if(!runningRef.current) return

    setGrid(g=> {
      return produce(g, gridCopy => {
        for(let i=0; i<rowCount; i++){
          for(let j=0; j<colCount; j++){
            let neighbours = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j +y;
              if(newI >=0 && newI < rowCount && newJ>=0 && newJ< colCount){
                neighbours+=g[newI][newJ]
              }
            })

            if(neighbours<2 || neighbours > 3 ) {
              gridCopy[i][j]= 0
            } else if(g[i][j] === 0 && neighbours===3){
              gridCopy[i][j]= 1
            }


          }
        }
      })
    })


    setTimeout(runSimulation, 500)
  }, [])

  return (
    <>

    <div style={{display: 'grid', gridTemplateColumns:`repeat(${colCount}, 20px)`}}>
      {grid.map((row, i) =>
        row.map((col, j) => (
          <div
            key={`${i}-${j}`}
            onClick={()=> {
              const newGrid = produce (grid, gridCopy => {
                gridCopy[i][j]= gridCopy[i][j] ? 0 : 1;
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
    <button onClick={()=> {
      setRunning(!running)
      if(!running){
        runningRef.current = true;
        runSimulation();
      }
    }} >{running ? 'stop' : 'start'}</button>


<button onClick={ ()=> {
    const row = [];
    for (let i = 0; i < rowCount; i++) {
      row.push(Array.from(Array(colCount), () => Math.random() > 0.5?1 : 0));
    }
      setGrid(row)
    }}>random</button>

    <button onClick={ ()=> {
      setGrid(clearGrid())
    }}>clear</button>
    </>
  );
};

export default Game;
