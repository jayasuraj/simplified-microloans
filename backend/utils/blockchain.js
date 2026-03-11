// simplified-microloans/backend/utils/blockchain.js
const { ethers, JsonRpcProvider, Wallet, Contract } = require('ethers');
const ABI = require('../../artifacts/contracts/LoanContract.sol/LoanContract.json').abi;

// Select RPC URL based on network (Sepolia testnet by default)
const getRpcUrl = () => {
  const network = process.env.BLOCKCHAIN_NETWORK || 'sepolia';
  if (network === 'ganache') {
    return process.env.GANACHE_RPC_URL || 'http://127.0.0.1:8545';
  }
  return process.env.SEPOLIA_RPC_URL || 'https://rpc.sepolia.org';
};

const provider = new JsonRpcProvider(getRpcUrl());
const signer = new Wallet(process.env.PRIVATE_KEY, provider);
const contract = new Contract(process.env.CONTRACT_ADDRESS, ABI, signer);

module.exports = contract;
