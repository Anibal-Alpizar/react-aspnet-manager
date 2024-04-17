import styled from "styled-components";

const Menu = styled.ul<{ $click: string | boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;

  @media (max-width: 64em) {
    /* 1024 px */
    position: fixed;
    top: ${(props) => props.theme.navHeight};
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: ${(props) => `calc(100vh - ${props.theme.navHeight})`};
    z-index: 50;
    background-color: ${(props) => `rgba(${props.theme.bodyRgba}, 0.85)`};
    backdrop-filter: blur(2px);
    transform: ${(props) =>
      props.$click ? "translateY(0)" : "translateY(1000%)"};

    transition: all 0.3s ease;
    flex-direction: column;
    justify-content: center;
    touch-action: none;
  }
`;

function MenuComponent({
  click,
  children,
}: {
  click: boolean;
  children: React.ReactNode;
}) {
  return <Menu $click={click}>{children}</Menu>;
}

export default MenuComponent;
