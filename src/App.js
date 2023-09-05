import "./App.css";
import Point from "./point.js";
import Snake from "./snake.js";
import { useState, useEffect } from "react";
function App() {
  const [snakePart, setSnakePart] = useState([
    [0, 0],
    [0, 2],
  ]);
  const [point, setPoint] = useState([0, 0]);
  const [direction, setDirection] = useState("RIGHT");
  const [isGameOver, setIsGameOver] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(snakeMovement, 100);
    document.onkeydown = onKeyChange;
    if (isGameOver) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  });
  useEffect(() => {
    setPoint(generateNewPoint());
  }, [isGameOver]);
  useEffect(() => {
    onWinPoint();
    onBoundaryTouch();
    onSnakeTouch();
  }, [snakePart, isGameOver]);

  const snakeMovement = () => {
    let parts = [...snakePart];
    let head = parts[parts.length - 1];
    switch (direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }
    parts.push(head);
    parts.shift();
    setSnakePart(parts);
  };

  const onKeyChange = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        setDirection("LEFT");
        break;
      case 38:
        setDirection("UP");
        break;
      case 39:
        setDirection("RIGHT");
        break;
      case 40:
        setDirection("DOWN");
        break;
    }
  };
  const generateNewPoint = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
  };
  const onWinPoint = () => {
    let head = snakePart[snakePart.length - 1];
    if (head[0] === point[0] && head[1] === point[1]) {
      setPoint(generateNewPoint());
      increaseSnake();
    }
  };
  const increaseSnake = () => {
    let newSnake = [...snakePart];
    newSnake.unshift([]);
    setSnakePart(newSnake);
  };
  const onBoundaryTouch = () => {
    let head = snakePart[snakePart.length - 1];
    if (!isGameOver) {
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
        setIsGameOver(true);
      }
    }
  };

  const onSnakeTouch = () => {
    let snake = [...snakePart];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((part) => {
      if (head[0] === part[0] && head[1] === part[1]) {
        setIsGameOver(true);
      }
    });
  };
  const onGameRestart = () => {
    window.location.reload();
  };
  return (
    <div className="App">
      {isGameOver ? (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Game over!! Final Score : {snakePart.length - 2}
          </h1>
          <center>
            <button
              style={{
                height: "30px",
                width: "200px",
                background: "lightgrey",
              }}
              onClick={onGameRestart}
            >
              Restart
            </button>
          </center>
        </div>
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>Snakes</h1>
          <p style={{ textAlign: "center" }}>
            Score Board: {snakePart.length - 2} Points
          </p>
          <div className="playground">
            <Snake value={{ snakePart: snakePart }} />
            <Point value={{ part: point }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
