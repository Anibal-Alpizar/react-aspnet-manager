import styled from "styled-components";

const MenuItem = styled.li`
  margin: 0 1rem;
  color: ${(props) => props.theme.text};
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

  @media (max-width: 64em) {
    margin: 1rem 0;
    &::after {
      display: none;
    }
  }
`;

function MenuItemComponent({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return <MenuItem onClick={onClick}>{children}</MenuItem>;
}

export default MenuItemComponent;
