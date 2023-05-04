import { useContext } from "react";
import styled from "styled-components";
import { Link } from "ui";
import { MetamaskContext } from "../../contexts/MetamaskContext";

const UIHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 51px;

  @media (max-width: 1024px) {
    padding-top: 25px;
  }
`;

const AccountText = styled.span`
  color: ${(props) => props.theme.primary};
  opacity: 0.5;
  margin-right: 13px;
`;

const AccountAddress = styled.span`
  color: ${(props) => props.theme.primary};
  opacity: 0.5;
  border: 1px solid #000000;
  border-radius: 4px;
  padding: 12px 10px;
`;

export const Header = () => {
  const { address } = useContext(MetamaskContext);

  const formattedAddress =
    address?.slice(0, 6).toLocaleUpperCase() +
    "..." +
    address?.slice(-6).toLocaleUpperCase();

  return (
    <UIHeader>
      <Link href="/">BALANCER</Link>
      {address && (
        <div>
          <AccountText>Account</AccountText>
          <AccountAddress>{formattedAddress}</AccountAddress>
        </div>
      )}
    </UIHeader>
  );
};
