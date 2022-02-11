const { assert } = require('chai');

require('chai')
.use(require('chai-as-promised'))
.should()

const RWD = artifacts.require('RWD');
const Tether = artifacts.require('Tether');
const DecentralBank = artifacts.require('DecentralBank');

contract('DecentralBank', (accounts) => {
  describe('Mock Tether Deployment', async() => {
    it('matches name successfully', async() => {
      let tether = await Tether.new();
      const name = await tether.name();
      assert.equal(name, 'Mock_Tether_Token');
    })
  });
  describe('Reward Token Deployment', async() => {
    it('mateched name successfully', async() => {
      let rwd = await RWD.new();
      const name = await rwd.name();
      assert.equal(name, 'Reward_Token');
    })
  })
});

// >truffle test
