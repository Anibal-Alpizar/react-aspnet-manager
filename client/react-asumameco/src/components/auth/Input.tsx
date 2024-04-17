import styled from "styled-components";
import { forwardRef } from "react";
import { inputProps } from "../../interfaces/ui/inputProps";

const Input = styled.input`
  background-color: #fff;
  border: none;
  border-bottom: 2px solid #053271;

  padding: 1rem 2rem;
  margin: 0.5rem 0;
  width: 100%;

  &:focus {
    outline: none;
    border: none;
    border: 2px solid #053271;
  }
`;

export const InputComponent = forwardRef<HTMLInputElement, inputProps>(
  ({ type, name, id, placeholder, ...rest }, ref) => {
    return (
      <Input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
    );
  }
);
