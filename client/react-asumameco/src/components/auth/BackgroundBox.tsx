import styled, { keyframes } from "styled-components";

const move = keyframes`
0%{
    opacity:0;

}
95%{
    opacity:1;

}
`;

const BackgroundBox = styled.div<{ $clicked: boolean }>`
  background-color: #eaa159;
  height: 50vh;
  width: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 15rem auto;

  position: relative;
  border-radius: 23px;
  border: 1px solid #053271;

  .text1 {
    z-index: ${(props) => (props.$clicked ? "-700" : "700")};
    transform: ${(props) =>
      props.$clicked ? "translateX(0)" : "translateX(100%)"};
    transition: transform 1s ease-in-out;
    animation: ${(props) => (props.$clicked ? move : "none")} 1.5s;
  }

  .text2 {
    z-index: ${(props) => (props.$clicked ? "700" : "-700")};
    animation: ${(props) => (props.$clicked ? "none" : move)} 1.5s;

    transform: ${(props) =>
      props.$clicked ? "translateX(-100%)" : "translateX(0%)"};
    transition: transform 1s ease-in-out;
  }

  .signin {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.$clicked ? "-600" : "500")};
    transform: ${(props) => (props.$clicked ? "none" : "translateX(-50%)")};
    transition: all 1s;
  }
  .signup {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.$clicked ? "500" : "-500")};
    transform: ${(props) => (props.$clicked ? "translateX(50%)" : "none")};
    transition: all 1s;
  }
`;

function BackgroundBoxComponent({
  children,
  clicked,
}: {
  children: React.ReactNode;
  clicked: boolean;
}) {
  return <BackgroundBox $clicked={clicked}>{children}</BackgroundBox>;
}

export default BackgroundBoxComponent;
