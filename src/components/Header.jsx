import React from "react";

export default function Header(props) {
  const [time, setTime] = React.useState(0);
  let lost = props.rollCount >= 15;

  React.useEffect(() => {
    let interval;
    if (!props.gameWon && !lost) {
      setTime(0);
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [props.gameWon, lost]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <header>
      <div className="stat-group">
        <p>Roll count</p>
        <li>{props.rollCount}</li>
      </div>
      <div className="stat-group">
        <p>Time</p>
        <li>{formatTime(time)}</li>
      </div>
    </header>
  );
}
