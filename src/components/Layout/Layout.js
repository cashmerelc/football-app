import React from "react";
import Nav from "../Nav/Nav.js";
import styled from "styled-components";

const Main = styled.main`
  display: grid;
  gap: 0.5rem;
  padding: 0.5rem;
  position: relative;
  width: 100%;
  background-color: #eef5ff;
`;

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <Main>
        {children}
        <h1>Hello</h1>
      </Main>
    </>
  );
}
