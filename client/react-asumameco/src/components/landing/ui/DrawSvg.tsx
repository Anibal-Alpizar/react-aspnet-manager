import styled, { keyframes } from "styled-components";
import Vector from "../../../icons/landing/Vector";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const VectorContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  overflow: hidden;

  svg {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 48em) {
    left: 1rem;
  }
`;

const Bounce = keyframes`
from { transform: translateX(-50%) scale(0.5);}
to {transform: translateX(-50%) scale(1);}

`;

const Ball = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.text};
  animation: ${Bounce} 0.5s linear infinite alternate;

  @media (max-width: 48em) {
    left: 1rem;
  }
`;

function DrawSvg() {
  const ref = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    const element = ref.current;

    const svg = document.getElementsByClassName(
      "svg-path"
    )[0] as SVGPathElement;
    const length = svg.getTotalLength();

    svg.style.strokeDasharray = `${length}`;
    svg.style.strokeDashoffset = `${length}`;

    const t1: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top center",
        end: "bottom bottom",
        onUpdate: (self) => {
          const draw = length * self.progress;
          svg.style.strokeDashoffset = `${length - draw}`;
        },
        onToggle: (self) => {
          if (self.isActive) {
            if (ballRef.current) {
              ballRef.current.style.display = "none";
            }
          } else {
            if (ballRef.current) {
              ballRef.current.style.display = "inline-block";
            }
          }
        },
      },
    });

    return () => {
      if (t1) t1.kill();
    };
  }, []);

  return (
    <>
      <Ball ref={ballRef} />
      <VectorContainer ref={ref}>
        <Vector />
      </VectorContainer>
    </>
  );
}

export default DrawSvg;
