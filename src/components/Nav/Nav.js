import styled from "styled-components";
import { StyledButton } from "../Button/StyledButton.js";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const NavBar = styled.nav`
  background-color: #86b6f6;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default function Nav() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <StyledButton>Sign Out</StyledButton>
      </>
    );
  }
  return (
    <NavBar>
      <StyledButton variant="signup">Sign Up</StyledButton>
      <StyledButton>Sign In</StyledButton>
    </NavBar>
  );
}
