import styled from "styled-components";
import { useLayoutEffect, useRef } from "react";
import { Accordion } from "../ui";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Section = styled.section`
  min-height: 100vh;
  width: auto;
  background-color: #07305d;
  position: relative;
  color: ${(props) => props.theme.body};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: uppercase;
  color: ${(props) => props.theme.body};
  margin: 1rem auto;
  border-bottom: 2px solid ${(props) => props.theme.body};
  width: fit-content;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Container = styled.div`
  width: 75%;
  margin: 2rem auto;
  display: flex;
  justify-content: space-between;
  align-content: center;

  @media (max-width: 64em) {
    width: 80%;
  }

  @media (max-width: 48em) {
    width: 90%;
    flex-direction: column;

    & > * last-child {
      & > * :first-child {
        margin-top: 0;
      }
    }
  }
`;

const Box = styled.div`
  width: 45%;
  @media (max-width: 64em) {
    width: 90%;
    align-items: center;
  }
`;

function Faq() {
  const ref = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    const element = ref.current;
    ScrollTrigger.create({
      trigger: element,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: true,
      markers: false,
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Section id="faq" ref={ref}>
      <Title>Preguntas Frecuentes</Title>
      <Container>
        <Box>
          <Accordion title="¿Hay algún costo asociado con el servicio?">
          No, nuestro servicio es completamente gratuito.
          Creemos en proporcionar información y asistencia valiosas sin ningún costo 
          financiero para nuestros usuarios.
          </Accordion>
          <Accordion title="¿Cómo puedo empezar con su plataforma?">
          Para empezar, simplemente crea una cuenta en nuestra plataforma 
          proporcionando la información requerida. 
          Una vez registrado, tendrás acceso a una variedad de funciones.
          </Accordion>
          <Accordion title="¿Existen tarifas de membresía o cargos ocultos?">
          Estamos comprometidos con la transparencia. No hay cargos ocultos 
          ni tarifas de membresía asociadas con nuestra plataforma. 
          Todos los costos relevantes, si los hubiera, se te comunicarán claramente.
          </Accordion>
        </Box>
        <Box>
          <Accordion title="¿Cómo puedo restablecer mi contraseña?">
          Si has olvidado tu contraseña, puedes restablecerla fácilmente haciendo clic en el enlace '¿Olvidaste tu contraseña?' en la página de inicio de sesión.
          </Accordion>
          <Accordion title="¿Qué tan segura está mi información personal en su plataforma?">
          Priorizamos la seguridad de tu información. Nuestra plataforma utiliza medidas de seguridad avanzadas para proteger tus datos personales, garantizando una experiencia de usuario segura y protegida.
          </Accordion>
          <Accordion title="¿Qué navegadores son compatibles con su plataforma?">
          Nuestra plataforma está optimizada para su uso con las últimas versiones de navegadores populares como Google Chrome, Mozilla Firefox, Safari y Microsoft Edge. Asegúrate de que tu navegador esté actualizado para obtener la mejor experiencia.
          </Accordion>
        </Box>
      </Container>
    </Section>
  );
}

export default Faq;
