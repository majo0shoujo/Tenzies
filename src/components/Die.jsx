export default function Die(props) {
  function handleClick() {
    props.holdFunction(props.id);
  }
  return (
    <button
      onClick={handleClick}
      className={props.isHeld ? "button-on" : ""}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, 
    ${props.isHeld ? "held" : "not held"}`}
    >
      {props.value}
    </button>
  );
}
