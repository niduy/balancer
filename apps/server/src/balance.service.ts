import { Injectable } from '@nestjs/common';
const Web3 = require('web3');

const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

const ERC20_BALANCE_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function' as const,
  },
];

const BALANCE_CONTRACTS = {
  BTCB: '0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8',
  ETH: '0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378',
  XRP: '0xa83575490D7df4E2F47b7D38ef351a2722cA45b9',
  BUSD: '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
  USDT: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
  USDC: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
};

@Injectable()
export class BalanceService {
  async getBalance(address: string) {
    const promises = [];

    for (const symbol in BALANCE_CONTRACTS) {
      const contract = new web3.eth.Contract(
        ERC20_BALANCE_ABI,
        BALANCE_CONTRACTS[symbol],
      );
      const balancePromise = contract.methods.balanceOf(address).call();
      promises.push(balancePromise);
    }

    const balances = await Promise.all(promises);

    const result: Record<string, number> = {};
    let i = 0;
    for (const symbol in BALANCE_CONTRACTS) {
      result[symbol] = web3.utils.fromWei(balances[i], 'ether');
      i++;
    }

    return result;
  }
}
