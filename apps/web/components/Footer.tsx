import styled from "styled-components";
import { Link } from "ui";

const UIFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  padding-bottom: 48px;

  @media (max-width: 1024px) {
    padding-bottom: 24px;
  }
`;

const Copyright = styled.span`
  color: ${(props) => props.theme.primary};
  font-weight: 400;
`;

const PrivacyPolicyLink = styled(Link)`
  line-height: 120%;
  letter-spacing: 0.02em;
  text-decoration-line: underline;
  opacity: 0.5;
`;

export const Footer = () => {
  return (
    <UIFooter>
      <PrivacyPolicyLink href="https://privacy.microsoft.com/en-us/privacystatement">
        PRIVACY POLICY
      </PrivacyPolicyLink>
      <Copyright>
        &copy; {new Date().getFullYear()} All rights reserved
      </Copyright>
    </UIFooter>
  );
};
