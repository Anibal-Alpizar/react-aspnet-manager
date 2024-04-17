import styled from "styled-components";

const Hamburger = styled.span<{ $click: string | boolean }>`
  width: ${(props) => (String(props.$click) === "true" ? "2rem" : "1.5rem")};
  height: 2px;
  background-color: ${(props) => props.theme.text};
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: ${(props) =>
    String(props.$click) === "true"
      ? "translateX(-50%) rotate(90deg)"
      : "translateX(-50%) rotate(0)"};
  display: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &::after,
  &::before {
    content: " ";
    width: ${(props) => (String(props.$click) === "true" ? "1rem" : "1.5rem")};
    height: 2px;
    right: ${(props) => (String(props.$click) === "true" ? "-2px" : "0")};
    background: ${(props) => props.theme.text};
    position: absolute;
    transition: all 0.3s ease;
  }

  @media (max-width: 64em) {
    /* 1024 px */
    display: flex;
  }

  &::after {
    top: ${(props) => (String(props.$click) === "true" ? "0.3rem" : "0.5rem")};
    transform: ${(props) =>
      String(props.$click) === "true" ? "rotate(-40deg)" : "translateX(0)"};
  }

  &::before {
    bottom: ${(props) =>
      String(props.$click) === "true" ? "0.3rem" : "0.5rem"};
    transform: ${(props) =>
      String(props.$click) === "true" ? "rotate(40deg)" : "translateX(0)"};
  }
`;

function HamburgerComponent({
  click,
  setClick,
  children,
}: {
  click: boolean;
  setClick: (click: boolean) => void;

  children: React.ReactNode;
}) {
  return (
    <Hamburger
      $click={click.toString()}
      onClick={() => {
        setClick(!click);
      }}
    >
      {children}
    </Hamburger>
  );
}

export default HamburgerComponent;
