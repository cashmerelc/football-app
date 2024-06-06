import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  margin-top: 15px;
  background-color: #eef5ff;
  padding: 0.8rem;
  border-radius: 0.6rem;
  border: 2px solid #eef5ff;
  color: #86b6f6;
  height: 0.5em;
  display: flex;
  align-items: center;

  ${({ variant }) =>
    variant === "signup" &&
    css`
      background-color: #86b6f6;
      border: 2px solid #eef5ff;
      color: #eef5ff;
    `}
`;
