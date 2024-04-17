import styled from "styled-components";

const Text = styled.div<{ $clicked: boolean }>`
  position: absolute;
  z-index: 1000;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  letter-spacing: 0.2rem;
  color: #fff;

  .attention {
    font-size: 2.5rem;
    position: relative;
    margin-top: 2rem;
  }

  .attention-icon {
    position: absolute;
    right: ${(props) => (props.$clicked ? "0" : "none")};
    top: 100%;
    font-size: 5rem;
  }
`;

export const TextComponentOne = ({
  children,
  clicked,
  className,
}: {
  children: React.ReactNode;
  clicked: boolean;
  className: string;
}) => {
  return (
    <Text className={className} $clicked={clicked}>
      {children}
    </Text>
  );
};

export const TextComponentTwo = ({
  children,
  clicked,
  className,
}: {
  children: React.ReactNode;
  clicked: boolean;
  className: string;
}) => {
  return (
    <Text className={className} $clicked={clicked}>
      {children}
    </Text>
  );
};

export default Text;
