import { FormEvent } from "react";
import styled from "styled-components";

const Form = styled.form`
  color: #1b1b1b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 4rem;
`;

function FormSigninComponent({
  onSubmit,
  children,
  className,
}: {
  onSubmit: (event: FormEvent) => void;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <Form className={className} onSubmit={onSubmit}>
      {children}
    </Form>
  );
}

function FormSignupComponent({
  onSubmit,
  children,
  className,
}: {
  onSubmit?: (event: FormEvent) => void;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <Form className={className} onSubmit={onSubmit}>
      {children}
    </Form>
  );
}

export { FormSigninComponent, FormSignupComponent };
