const Web3 = require("web3");

const masterAbi = require("./abi.json");
const tokenAbi = require("./erc20.json");
const poolAbi = require("./poolAbi.json");

let web3;

const provider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/287af69fca9142f3b1681a93ce4c3afa"
);
web3 = new Web3(provider);

async function getBalance(userAddress) {
  let contractAddress = "0xB93b505Ed567982E2b6756177ddD23ab5745f309";
  const masterInstance = new web3.eth.Contract(masterAbi, contractAddress);

  let LPtokensReceived = await masterInstance.methods
    .balanceOf(userAddress)
    .call();
  let totalSupplyLP = await masterInstance.methods.totalSupply().call();
  totalSupplyLP = totalSupplyLP * 1.655;

  let rewards = await masterInstance.methods.earned(userAddress).call();
  let rewardsAddress = await masterInstance.methods.rewardsToken().call();

  const poolAddress = await masterInstance.methods.stakingToken().call();
  const poolInstance = new web3.eth.Contract(poolAbi, poolAddress);

  let reserves = await poolInstance.methods.getReserves().call();
  let token0reserve = reserves[0];
  let token1reserve = reserves[1];

  let token0address = await poolInstance.methods.token0().call();
  let token1address = await poolInstance.methods.token1().call();
  let token0instance = new web3.eth.Contract(tokenAbi, token0address);
  let token1instance = new web3.eth.Contract(tokenAbi, token1address);
  let rewardsInstance = new web3.eth.Contract(tokenAbi, rewardsAddress);

  let symbol0 = await token0instance.methods.symbol().call();
  let symbol1 = await token1instance.methods.symbol().call();
  let rewardSymbol = await rewardsInstance.methods.symbol().call();
  let decimals0 = await token0instance.methods.decimals().call();
  let decimals1 = await token1instance.methods.decimals().call();
  let rewardDecimals = await rewardsInstance.methods.decimals().call();
  token0reserve = token0reserve / 10 ** decimals0;
  token1reserve = token1reserve / 10 ** decimals1;

  let token0amount = ((LPtokensReceived / totalSupplyLP) * token0reserve).toFixed(2);
  let token1amount = ((LPtokensReceived / totalSupplyLP) * token1reserve).toFixed(2);

  if (token0amount != 0 && token1amount != 0) {
    console.log(symbol0, "+", symbol1, token0amount, "+", token1amount);
    console.log("rewards:", (rewards / 10 ** rewardDecimals).toFixed(2), rewardSymbol);
  }
}

async function getBalance2(userAddress) {
  let contractAddress = "0x5bC4249641B4bf4E37EF513F3Fa5C63ECAB34881";

  const masterInstance = new web3.eth.Contract(masterAbi, contractAddress);

  let LPtokensReceived = await masterInstance.methods
    .balanceOf(userAddress)
    .call();
  let totalSupplyLP = await masterInstance.methods.totalSupply().call();
  totalSupplyLP = totalSupplyLP * 1.6;

  let rewards = await masterInstance.methods.earned(userAddress).call();
  let rewardsAddress = await masterInstance.methods.rewardsToken().call();

  const poolAddress = await masterInstance.methods.stakingToken().call();
  const poolInstance = new web3.eth.Contract(poolAbi, poolAddress);

  let reserves = await poolInstance.methods.getReserves().call();
  let token0reserve = reserves[0];
  let token1reserve = reserves[1];

  let token0address = await poolInstance.methods.token0().call();
  let token1address = await poolInstance.methods.token1().call();
  let token0instance = new web3.eth.Contract(tokenAbi, token0address);
  let token1instance = new web3.eth.Contract(tokenAbi, token1address);
  let rewardsInstance = new web3.eth.Contract(tokenAbi, rewardsAddress);

  let symbol0 = await token0instance.methods.symbol().call();
  let symbol1 = await token1instance.methods.symbol().call();
  let rewardSymbol = await rewardsInstance.methods.symbol().call();
  let decimals0 = await token0instance.methods.decimals().call();
  let decimals1 = await token1instance.methods.decimals().call();
  let rewardDecimals = await rewardsInstance.methods.decimals().call();
  token0reserve = token0reserve / 10 ** decimals0;
  token1reserve = token1reserve / 10 ** decimals1;

  let token0amount = ((LPtokensReceived / totalSupplyLP) * token0reserve).toFixed(2);
  let token1amount = ((LPtokensReceived / totalSupplyLP) * token1reserve).toFixed(2);

  if (token0amount != 0 && token1amount != 0) {
    console.log(symbol0, "+", symbol1, token0amount, "+", token1amount);
    console.log("rewards:", (rewards / 10 ** rewardDecimals).toFixed(2), rewardSymbol);
  }
}

let address = "0x86da2c31fd1d5af2018cb22ada80b2d57f04e65b";
getBalance(address);
getBalance2(address);
