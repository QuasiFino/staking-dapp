const Tether = artifacts.require('Tether');

module.exports = async (deployer) => { //annon functon
  await deployer.deploy(Tether);
}

// naming the file as 1, 2 etc specifies the orderr of deployment
// >truffle compile
// >truffle migrate
