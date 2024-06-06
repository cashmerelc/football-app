import styled from "styled-components";
import { StyledButton } from "../Button/StyledButton.js";
import Link from "next/link";

const NavBar = styled.nav`
  background-color: #86b6f6;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default function Nav() {
  return (
    <NavBar>
      <StyledButton variant="signup">Sign Up</StyledButton>
      <StyledButton>Sign In</StyledButton>
    </NavBar>
  );
}
