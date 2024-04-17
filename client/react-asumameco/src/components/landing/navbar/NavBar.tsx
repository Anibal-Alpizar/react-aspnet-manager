import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  height: 5rem;
  height: ${(props) => props.theme.navHeight};
  margin: 0 auto;

  .mobile {
    display: none;
  }

  @media (max-width: 64em) {
    .desktop {
      display: none;
    }
    .mobile {
      display: inline-block;
    }
  }
`;

function NavBarComponent({ children }: { children: React.ReactNode }) {
  return <NavBar>{children}</NavBar>;
}

export default NavBarComponent;
