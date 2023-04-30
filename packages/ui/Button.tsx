import { PropsWithChildren } from "react";
import styled from "styled-components";

const UIButton = styled.button`
  color: ${(props) => props.theme.primaryReversed};
  background-color: ${(props) => props.theme.buttonBackground};
  border-radius: 4px;
  border: none;
  width: 100%;
  padding: 16px 10px;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
`;

type ButtonProps = PropsWithChildren<{
  onClick: () => void;
}>;

export const Button = ({ onClick, children }: ButtonProps) => {
  return <UIButton onClick={onClick}>{children}</UIButton>;
};
