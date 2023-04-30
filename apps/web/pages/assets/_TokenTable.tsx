import { useEffect, useState } from "react";
import styled from "styled-components";
import { Checkbox, Loader } from "ui";
import { CircleIcon } from "../../components/CircleIcon";
import { useMetamaskContext } from "../../contexts/MetamaskContext";
import { fetcher } from "../../utils/fetcher";
import { BalanceMapSchema } from "./schema";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  background-color: ${({ theme }) => theme.primaryReversed};
`;

const TableRow = styled.tr`
  padding: 16px 12px;
  display: flex;
  width: 100%;

  &:not(:last-of-type) {
    border-bottom: ${({ theme }) => `1px solid ${theme.tableBorder}`};
  }

  &:first-child:last-child {
    background-color: ${({ theme }) => theme.tableHeader};
  }
`;

const TableHeader = styled.th`
  color: ${({ theme }) => theme.primary};
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex: 1;
`;

const TableCell = styled.td`
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex: 1;
`;

const CheckboxWrapper = styled.div`
  margin-right: 12px;
`;

const TableWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.primaryShadow};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BalanceWrapper = styled.span`
  margin-right: auto;
`;

const SYMBOLS = ["BTCB", "ETH", "XRP", "BUSD", "USDT", "USDC"];

const getBalanceMap = async (address: string) => {
  const balanceMap = await fetcher(
    `http://localhost:4000/api/assets/all?address=${address}`
  );
  return BalanceMapSchema.parse(balanceMap);
};

const TokenTable: React.FC = () => {
  const [balanceMap, setBalanceMap] = useState({});
  const [loading, setLoading] = useState(true);
  const { address } = useMetamaskContext();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (address === null) return;
    getBalanceMap(address).then((balanceMap) => {
      setBalanceMap(balanceMap);
      setLoading(false);
    });
  }, [address]);
  return (
    <TableWrapper>
      {loading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      <Table>
        <thead>
          <TableRow>
            <TableHeader>
              <CheckboxWrapper>
                <Checkbox />
              </CheckboxWrapper>
              Token
            </TableHeader>
            <TableHeader>Balance</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {SYMBOLS.map((symbol) => (
            <TableRow key={symbol}>
              <TableCell>
                <CheckboxWrapper>
                  <Checkbox />
                </CheckboxWrapper>
                {symbol}
              </TableCell>
              <TableCell>
                <BalanceWrapper>{balanceMap[symbol] ?? 0}</BalanceWrapper>
                <CircleIcon />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default TokenTable;
