import styled from "styled-components";

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 2rem;
`;

function TitleComponent({ children }: { children: React.ReactNode }) {
  return <Title>{children}</Title>;
}

export default TitleComponent;
