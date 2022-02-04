const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async (deployer) => { //annon functon
  await deployer.deploy(Tether);
  await deployer.deploy(RWD);
  await deployer.deploy(DecentralBank);
}

// naming the file as 1, 2 etc specifies the orderr of deployment
// >truffle compile
// >truffle migrate

// for second time, to update

// >truffle migrate --reset
