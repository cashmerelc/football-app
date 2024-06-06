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

  return (
    <NavBar>
      {session ? (
        <>
          <span>Welcome, {session.user.name}</span>
          <StyledButton onClick={() => signOut()}>Sign Out</StyledButton>
        </>
      ) : (
        <>
          <StyledButton onClick={() => signIn("github")}>Sign Up</StyledButton>
          <StyledButton onClick={() => signIn("github")}>Sign In</StyledButton>
        </>
      )}
    </NavBar>
  );
}
