import styled from "styled-components";
import { Banner } from "../ui";
import logo from "../../../assets/landing/Logo.jpg";

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.body};
  position: relative;
  color: ${(props) => props.theme.text};
  display: flex;
  /* justify-content: center;
  align-items: center; */
  flex-direction: column;
`;

const Container = styled.div`
  padding-bottom: 20px;
  width: 75%;
  margin: 2rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.text};

  @media (max-width: 48em) {
    width: 90%;
  }

  h1 {
    font-size: ${(props) => props.theme.fontxxxl};
  }
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 48em) {
    width: 100%;
  }
`;

const MenuItems = styled.ul`
  list-style: none;
  width: 50%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1rem;

  @media (max-width: 48em) {
    display: none;
  }
`;
const Item = styled.li`
  width: fit-content;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: 0%;
    height: 2px;
    background-color: ${(props) => props.theme.text};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const Bottom = styled.div`
  width: 75%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
  }

  @media (max-width: 48em) {
    flex-direction: column;
    width: 100%;

    span {
      margin-bottom: 1rem;
    }
  }
`;

const ImageContainer = styled.img`
  width: 130px;
  height: 130px; /* Ajusta la altura para que sea igual al ancho */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  margin-top: 5.2rem;
  border-radius: 50%; /* Cambia el radio del borde a 50% para hacerlo redondo */
  background-color: #f0f0f0; /* Cambia el color de fondo */
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3); /* Ajusta la sombra */
  transition: all 0.3s ease; /* Agrega una transición suave */
  
  /* Efecto al pasar el ratón */
  &:hover {
    transform: scale(1.05); /* Hace que el logo se agrande un poco al pasar el ratón */
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2); /* Aumenta el tamaño de la sombra */
  }
`;


function Footer() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <Section>
      <Banner />
      <Container>
        <Left>
        <ImageContainer src={logo} alt="logo" />
        </Left>
        <MenuItems>
          <Item onClick={() => scrollTo("home")}>Inicio</Item>
          <Item onClick={() => scrollTo("about")}>Acerca de</Item>
          <Item onClick={() => scrollTo("guide")}>Guia</Item>
          <Item onClick={() => scrollTo("team")}>Equipo</Item>
          <Item onClick={() => scrollTo("faq")}>Preguntas Frecuentes</Item>
        </MenuItems>
      </Container>
      <Bottom>
        <span>
          &copy; {new Date().getFullYear()} Q-Easy. Todos los derechos Reservados.
        </span>
      </Bottom>
    </Section>
  );
}

export default Footer;
