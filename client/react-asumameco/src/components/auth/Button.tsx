import styled from "styled-components";

const Button = styled.button`
  border-radius: 3px;
  padding: 1rem 3.5rem;
  margin-top: 1rem;
  border: 1px solid black;
  background-color: black;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 1px;

  box-shadow: 0 7px #999;

  &:hover {
    background-color: #1b1b1b;
  }
  &:active {
    background-color: black;

    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  &:focus {
    outline: none;
  }
`;

function ButtonComponent({ children }: { children: React.ReactNode }) {
  return <Button>{children}</Button>;
}

export default ButtonComponent;
