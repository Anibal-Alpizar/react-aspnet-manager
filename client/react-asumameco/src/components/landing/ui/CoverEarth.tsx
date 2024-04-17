import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Earth from "../../../../public/landing-world/Earth";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import "./CoverEarth.css";
import styled from "styled-components";

const ConvertEarth = styled.div`
  width: 100%;

  canvas {
    width: 100%;
    height: auto;
  }

  @media (max-width: 48em) {
    display: none; // Oculta el componente cuando el ancho de la pantalla es menor o igual a 48em
  }

  @media (min-width: 48em) {
    min-width: 40vw;

    canvas {
      min-width: 40vw;
    }
  }
`;

function CoverEarth() {
  return (
    <>
      <ConvertEarth>
        <Canvas>
          <ambientLight />
          <OrbitControls />
          <Suspense fallback={null}>
            <Earth />
          </Suspense>
          <Environment preset="sunset" />
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.5}
            scale={50}
            blur={1}
            far={10}
            resolution={256}
            color="#000000"
          />
        </Canvas>
      </ConvertEarth>
    </>
  );
}

export default CoverEarth;
