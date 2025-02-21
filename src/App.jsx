import Die from "./components/Die";
import React from "react";
import Confetti from "./components/Confetti";
import Header from "./components/Header";

export default function App() {
  function generateAllNewDice() {
    return Array.from({ length: 10 }, (v, index) => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: index,
    }));
  }
  const [rollCount, setRollCount] = React.useState(0);

  const [diceObjects, setDiceObjects] = React.useState(() =>
    generateAllNewDice()
  );
  const buttonRef = React.useRef(null);

  function hold(id) {
    setDiceObjects((prevDiceObjects) =>
      prevDiceObjects.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  function newGame() {
    setDiceObjects(generateAllNewDice());
    setRollCount(0);
  }

  let gameWon = diceObjects.every(
    (dieObject) => dieObject.isHeld && dieObject.value === diceObjects[0].value
  );
  React.useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function rollDice() {
    setDiceObjects((prevDiceObjects) =>
      prevDiceObjects.map((dice) => {
        return dice.isHeld
          ? dice
          : { ...dice, value: Math.floor(Math.random() * 6) + 1 };
      })
    );
    setRollCount((prevCount) => prevCount + 1);
  }

  const dieArray = diceObjects.map((dieObject, i) => (
    <Die
      key={dieObject.id}
      value={dieObject.value}
      isHeld={dieObject.isHeld}
      id={dieObject.id}
      holdFunction={hold}
    />
  ));

  return (
    <>
      <Header rollCount={rollCount} gameWon={gameWon} />
      <main>
        {gameWon ? <Confetti /> : null}
        <div aria-live="polite" className="sr-only"></div>

        <h1 className="title">Tenzies Game</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>

        <div className="die-container">{dieArray}</div>
        <button
          ref={buttonRef}
          onClick={gameWon || rollCount == 15 ? newGame : rollDice}
        >
          {gameWon || rollCount == 15 ? "New Game" : "Roll Dice"}
        </button>
      </main>
    </>
  );
}
