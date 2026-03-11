// Test script for Sepolia LoanContract interactions
// Run: node backend/tests/testSepoliaContract.js

const { ethers, JsonRpcProvider, Wallet, Contract } = require('ethers');
const dotenv = require('dotenv');
const ABI = require('../../artifacts/contracts/LoanContract.sol/LoanContract.json').abi;

dotenv.config();

const SEPOLIA_RPC = process.env.SEPOLIA_RPC_URL || 'https://rpc.sepolia.org';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '0x43eb6e7886fd677eBb5fFAEf2c688eB04aC8247f';
const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function testContractInteractions() {
  console.log('🧪 Testing Sepolia LoanContract interactions...\n');
  
  try {
    // Initialize provider and signer
    const provider = new JsonRpcProvider(SEPOLIA_RPC);
    const signer = new Wallet(PRIVATE_KEY, provider);
    const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);

    // Get deployer account
    const deployerAddress = await signer.getAddress();
    console.log(`✅ Connected to Sepolia network`);
    console.log(`📍 Signer address: ${deployerAddress}`);
    console.log(`📍 Contract address: ${CONTRACT_ADDRESS}\n`);

    // Get network info
    const network = await provider.getNetwork();
    console.log(`📊 Network Details:`);
    console.log(`   - Name: ${network.name}`);
    console.log(`   - Chain ID: ${network.chainId}`);
    console.log(`   - Sepolia URL: https://sepolia.etherscan.io`);
    console.log(`   - Contract explorer: https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}\n`);

    // Get account balance
    const balance = await provider.getBalance(deployerAddress);
    const balanceEth = ethers.formatEther(balance);
    console.log(`💰 Account Balance: ${balanceEth} ETH`);
    
    if (parseFloat(balanceEth) === 0) {
      console.log(`⚠️  No Sepolia ETH! Get test ETH from faucets:`);
      console.log(`   - https://sepoliafaucet.com`);
      console.log(`   - https://sepolia-faucet.pk910.de`);
      console.log(`   - https://faucets.chain.link/sepolia\n`);
    }

    // Test provider connectivity
    const blockNumber = await provider.getBlockNumber();
    console.log(`✅ Provider connected - Latest block: ${blockNumber}\n`);

    // Read contract name/symbol if available
    const contractCode = await provider.getCode(CONTRACT_ADDRESS);
    if (contractCode === '0x') {
      console.log('❌ Contract not found at address! Check if deployment succeeded.');
      return;
    }
    
    console.log(`✅ Contract code verified on Sepolia\n`);

    // Call a read function (example - adjust based on your LoanContract methods)
    console.log(`📞 Testing contract read function...`);
    try {
      // Try to call owner() if it exists
      if (contract.owner) {
        const owner = await contract.owner();
        console.log(`✅ Contract owner: ${owner}`);
      }
    } catch (err) {
      console.log(`ℹ️  Read function: Check LoanContract ABI for available view functions`);
    }

    console.log(`\n✨ All connectivity tests passed!`);
    console.log(`\n📝 Next steps:`);
    console.log(`   1. Test create loan: await contract.createLoan(...)`);
    console.log(`   2. Test approve lender: await contract.approveLoan(...)`);
    console.log(`   3. Monitor explorer: https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`);
    console.log(`   4. Update frontend with new contract address`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testContractInteractions();
