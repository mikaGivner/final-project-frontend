import styled from "styled-components";
import "../AnimationsAndDefineds.css";
export const BtnStyle = styled.button`
  cursor: pointer;
  width: 15rem;
  height: 2rem;
  background: green;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--InnerText);
  outline: none;
  border: none;
  border-radius: 1rem;
  margin: 1rem 0;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;
