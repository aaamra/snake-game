/* eslint-disable react-hooks/exhaustive-deps */
import Snake from "./components/Snake";
import Food from "./components/Food";
import LinkedList from "./utils/LinkedList";
import { useEffect, useState } from "react";
import "./App.css";

let intervalId = "";

const randomPoint = (max, min) =>
  Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

const randomCoordinates = () => {
  const min = 1;
  const max = 98;
  let x = randomPoint(max, min);
  let y = randomPoint(max, min);
  return [x, y];
};

const init = {
  points: new LinkedList()
    .push([0, 0])
    .push([2, 0])
    .push([4, 0])
    .push([6, 0])
    .push([8, 0]),

  direction: "RIGHT",
};

const App = () => {
  const [speed, setSpeed] = useState(150);
  const [food, setFood] = useState(randomCoordinates());
  const [snake, setSnake] = useState(init);
  const [status, setStatus] = useState("stop");

  useEffect(() => {
    hitTheBorders();
    eatFood();
  }, [snake]);

  useEffect(() => {

    if (status === "running") {
      intervalId = setInterval(() => moveSnake(), speed);
    }

    if(status === "reset"){
      setSnake((prev) => {
        return { ...prev, 
          direction: init.direction,
          points: new LinkedList()
          .push([0, 0])
          .push([2, 0])
          .push([4, 0])
          .push([6, 0])
          .push([8, 0])
        };
      });
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [status, speed]);

  const hitTheBorders = () => {
    let snakeHead = snake.points.tail.val;

    if (
      snakeHead[0] >= 100 ||
      snakeHead[1] >= 100 ||
      snakeHead[0] < 0 ||
      snakeHead[1] < 0
    ) {
      gameOver();
    }
  };

  const eatFood = () => {
    let snakeHead = snake.points.tail.val;

    if (snakeHead[0] === food[1] && snakeHead[1] === food[0]) {
      setFood(() => randomCoordinates());
      enlargeSnake();
      increaseSpeed();
    }
  };

  const enlargeSnake = () =>
    setSnake((prev) => ({ ...prev, points: prev.points.unshift([]) }));

  const increaseSpeed = () =>
    setSpeed((prevSpeed) => (prevSpeed > 70 ? prevSpeed - 5 : prevSpeed - 1));

  const gameOver = () => {
    setStatus(() => "reset");
  };

  const moveSnake = () => {
    setSnake((prev) => {
      let snakeHead = prev.points.tail.val;

      switch (prev.direction) {
        case "RIGHT":
          snakeHead = [snakeHead[0] + 2, snakeHead[1]];
          break;
        case "LEFT":
          snakeHead = [snakeHead[0] - 2, snakeHead[1]];
          break;
        case "DOWN":
          snakeHead = [snakeHead[0], snakeHead[1] + 2];
          break;
        case "UP":
          snakeHead = [snakeHead[0], snakeHead[1] - 2];
          break;
        default:
          break;
      }

      prev.points.push(snakeHead);

      prev.points.shift();

      return { ...prev, points: prev.points };
    });
  };

  const keyDown = (e) => {
    switch (e.keyCode) {
      case 80:
        setStatus(() => ("stop"));
        break;
      case 82:
        setStatus(() => ("reset"));
        break;
      case 13:
        setStatus(() => ("running"));
        break;
      case 38:
      case 87:
        setSnake((prev) => ({ ...prev, direction: "UP" }));
        break;
      case 40:
      case 83:
        setSnake((prev) => ({ ...prev, direction: "DOWN" }));
        break;
      case 37:
      case 65:
        setSnake((prev) => ({ ...prev, direction: "LEFT" }));
        break;
      case 39:
      case 68:
        setSnake((prev) => ({ ...prev, direction: "RIGHT" }));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="header">
        <h3>Snake Length {snake.points.length}</h3>
        <p>{`{enter : start, p : pause, r : reset}`}</p>
      </div>
      <div tabIndex="0" className="playing-area" onKeyDown={keyDown}>
        <Food point={food} />
        <Snake points={snake.points} />
      </div>
    </>
  );
};

export default App;
