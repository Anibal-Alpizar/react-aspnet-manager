import styled from "styled-components";

const Section = styled.section`
  width: 100vw;
  height: 17vh;
  background-color: ${(props) => props.theme.body};
`;

function SectionComponent({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return <Section id={id}>{children}</Section>;
}

export default SectionComponent;
