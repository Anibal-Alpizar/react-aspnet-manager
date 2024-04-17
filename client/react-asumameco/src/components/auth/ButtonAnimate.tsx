import styled from "styled-components";

const ButtonAnimate = styled.button<{ $clicked: boolean }>`
  position: absolute;
  z-index: 1000;
  height: 5rem;
  width: 5rem;
  top: 70%;
  border: none;
  cursor: pointer;

  right: ${(props) => (props.$clicked ? "52%" : "42%")};

  transform: ${(props) => (props.$clicked ? "rotate(360deg)" : "rotate(0)")};

  transition: all 1.5s;
  background-color: transparent;

  &::before {
    content: "🔐";
    font-size: 4rem;
  }

  &:focus {
    outline: none;
  }
`;

function ButtonAnimateComponent({
  clicked,
  onClick,
}: {
  clicked: boolean;
  onClick: () => void;
}) {
  return <ButtonAnimate $clicked={clicked} onClick={onClick} />;
}

export default ButtonAnimateComponent;
