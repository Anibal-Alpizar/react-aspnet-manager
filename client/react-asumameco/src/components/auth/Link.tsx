import styled from "styled-components";

const Link = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1.4rem;
  margin: 1rem 0;
`;

function LinkComponent({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick}>
      {children}
    </Link>
  );
}

export default LinkComponent;
