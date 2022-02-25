const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async (deployer, network, accounts) => { //annon functon
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  await deployer.deploy(DecentralBank, rwd.address, tether.address);
  const decentralBank = await DecentralBank.deployed();

  // transfer all rwd 1 million RWD to decentral bank
  // transfer happens from the msg.sender account - ganache account 1
  await rwd.transfer(decentralBank.address, '1000000000000000000000000');
  // transfer 100 tether to an investor- ganache 2nd account
  await tether.transfer(accounts[1], '100000000000000000000');
}

// naming the file as 1, 2 etc specifies the orderr of deployment
// >truffle compile
// >truffle migrate

// for second time, to update
// >truffle migrate --reset

// >truffle console
// >accounts = await web3.eth.getAccounts() //10 accounts from ganache
// >balance = await rwd.balanceOf(decentralBank.address)
// >balance.toString()
// >convertBalance = web3.utils.fromWei(balance) //convert to ether
// >web3.utils.toWei('15', 'ETHER') //convert to wei


