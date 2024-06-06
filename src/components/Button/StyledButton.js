import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  background-color: #f2613f;
  padding: 0.8rem;
  border-radius: 0.6rem;
  border: none;
  color: #000;
  font-size: inherit;

  ${({ variant }) =>
    variant === "signup" &&
    css`
      background-color: #000;
      border: 3px solid #f2613f;
      color: #f2613f;
    `}
`;
