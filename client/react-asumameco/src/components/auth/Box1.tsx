import styled from "styled-components";

const Box1 = styled.div<{ $clicked: boolean }>`
  background-color: #f1fdcd;
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  transform: ${(props) =>
    props.$clicked ? "translateX(90%)" : "translateX(10%)"};

  transition: transform 1s;

  &::after,
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;

    z-index: -200;
  }

  &::before {
    top: 3rem;
    border-radius: 23px;
    border: 4px solid #202020;
  }

  &::after {
    bottom: 3rem;
    border-radius: 23px 23px 0 0;
    border-top: 4px solid #202020;
    border-right: 4px solid #202020;
    border-left: 4px solid #202020;
  }
`;

const Box2 = styled.div<{ $clicked: boolean }>`
  background-color: #202020;
  width: 45%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;

  z-index: 600;
  transform: ${(props) =>
    props.$clicked ? "translateX(-122%)" : "translateX(0%)"};
  transition: transform 1s;

  border-radius: ${(props) =>
    props.$clicked ? "23px 0 0 23px" : "0 23px 23px 0"};
`;

export const Box1Component1 = ({ clicked }: { clicked: boolean }) => {
  return <Box1 $clicked={clicked} />;
};

export const Box1Component2 = ({ clicked }: { clicked: boolean }) => {
  return <Box2 $clicked={clicked} />;
};
