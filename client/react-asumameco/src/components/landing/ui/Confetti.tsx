import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function ConfettiComponent() {
  const { width, height } = useWindowSize();
  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={150}
      gravity={0.01}
    />
  );
}

export default ConfettiComponent;
