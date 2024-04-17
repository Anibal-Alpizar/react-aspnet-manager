import styled from "styled-components";
import { useLayoutEffect, useRef } from "react";
import { DrawSvg } from "../ui";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.body};
  position: relative;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  color: ${(props) => props.theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  border-bottom: 2px solid ${(props) => props.theme.text};
  width: fit-content;

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Container = styled.div`
  width: 70%;
  height: 200vh;
  background-color: ${(props) => props.theme.body};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 64em) {
    width: 80%;
  }

  @media (max-width: 48em) {
    width: 90%;
  }
`;

const SvgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Items = styled.ul`
  list-style: none;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 48em) {
    width: 90%;
  }

  & > *:nth-of-type(2n + 1) {
    justify-content: start;

    @media (max-width: 48em) {
      justify-content: center;
    }

    div {
      border-radius: 50px 0 50px 0;
      text-align: right;

      @media (max-width: 48em) {
        border-radius: 0 50px 0 50px;
        text-align: left;

        p {
          border-radius: 0 40px 0 40px;
        }
      }
    }

    p {
      border-radius: 40px 0 40px 0;
    }
  }

  & > *:nth-of-type(2n) {
    justify-content: end;

    @media (max-width: 48em) {
      justify-content: center;
    }

    div {
      border-radius: 0 50px 0 50px;
      text-align: left;

      @media (max-width: 48em) {
        border-radius: 50px 0 50px 0;
        text-align: right;

        p {
          border-radius: 40px 0 40px 0;
        }
      }
    }

    p {
      border-radius: 0 40px 0 40px;
    }
  }
`;

const Item = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
 
  @media (max-width: 48em) {
    justify-content: flex-end !important;
  }
`;

const ItemContainer = styled.div`
  width: 40%;
  height: fit-content;
  padding: 1rem;
  border: 3px solid ${(props) => props.theme.text};
  background-color: #e4872c;
  @media (max-width: 48em) {
    width: 70%;
  }
`;

const Box = styled.p`
  height: fit-content;
  background-color: ${(props) => props.theme.carouselColor};
  color: ${(props) => props.theme.text};
  padding: 1rem;
  position: relative;
  border: 1px solid ${(props) => props.theme.text};
`;

const SubTitle = styled.span`
  display: block;
  font-size: ${(props) => props.theme.fontxl};
  text-transform: capitalize;
  color: ${(props) => props.theme.text};

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontlg};
    font-weight: 600;
  }
`;

const Text = styled.span`
  display: block;
  font-size: ${(props) => props.theme.fontsm};
  text-transform: capitalize;
  color: ${(props) => props.theme.text};
  font-weight: 400;
  margin: 0.5rem 0;

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxs};
  }
`;

const GuideItem = ({
  title,
  subText,
  addRef,
}: {
  title: string;
  subText: string;
  addRef: (el: never) => void;
}) => {
  return (
    <Item ref={addRef}>
      <ItemContainer>
        <Box>
          <SubTitle>{title}</SubTitle>
          <Text>{subText}</Text>
        </Box>
      </ItemContainer>
    </Item>
  );
};

function Guide() {
  const revealRefs = useRef([]);
  revealRefs.current = [];

  gsap.registerPlugin(ScrollTrigger);

  const addToRefs = (el: never) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  useLayoutEffect(() => {
    const t1 = gsap.timeline();
    revealRefs.current.forEach((el: never, index: number) => {
      t1.fromTo(
        (el as HTMLElement).childNodes[0],
        {
          y: "0",
        },
        {
          y: "-30%",
          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: el,
            start: "top center+=200px",
            end: "bottom center",
            scrub: true,
            markers: false,
          },
        }
      );
    });
    return () => {};
  }, []);

  return (
    <Section id="guide">
      <Title>Cómo fucniona</Title>
      <Container>
        <SvgContainer>
          <DrawSvg />
        </SvgContainer>
        <Items>
          <Item>&nbsp;</Item>
          <GuideItem
            addRef={addToRefs}
            title="Pre-registro"
            subText="Lorem Ipsum Dolor Sit Amet Consectetur, Adipisicing Elit. At Repellat Placeat, Adipisicing Elit. At Repellat Placeat."
          />
          <GuideItem
            addRef={addToRefs}
            title="Espera a ser aceptado"
            subText="Lorem Ipsum Dolor Sit Amet Consectetur, Adipisicing Elit. At Repellat Placeat, Adipisicing Elit. At Repellat Placeat."
          />
          <GuideItem
            addRef={addToRefs}
            title="Únete a la comunidad"
            subText="Lorem Ipsum Dolor Sit Amet Consectetur, Adipisicing Elit. At Repellat Placeat, Adipisicing Elit. At Repellat Placeat."
          />
          <GuideItem
            addRef={addToRefs}
            title="Participa en eventos"
            subText="Lorem Ipsum Dolor Sit Amet Consectetur, Adipisicing Elit. At Repellat Placeat, Adipisicing Elit. At Repellat Placeat."
          />
          <GuideItem
            addRef={addToRefs}
            title="Obtén recompensas"
            subText="Lorem Ipsum Dolor Sit Amet Consectetur, Adipisicing Elit. At Repellat Placeat, Adipisicing Elit. At Repellat Placeat."
          />
        </Items>
      </Container>
    </Section>
  );
}

export default Guide;
