import { PropsWithChildren } from "react";
import styled from "styled-components";

const UILink = styled.a`
  color: ${(props) => props.theme.primary};
  text-decoration: none;

  &:hover,
  &:visited,
  &:focus,
  &:active {
    color: ${(props) => props.theme.secondary};
  }
`;

type LinkProps = PropsWithChildren<{
  href: string;
}>;

export const Link = ({ href, children }: LinkProps) => {
  return <UILink href={href}>{children}</UILink>;
};
