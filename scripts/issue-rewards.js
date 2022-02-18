const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function issueRewards(callback) {
  let decentralBank = await DecentralBank.deployed();
  await decentralBank.issueRewards();
  console.log('Tokens have been issued successfully!');
  callback();
}

// to execute in terminal
// truffle migrate --reset
// truffle exec scripts/issue-rewards.js