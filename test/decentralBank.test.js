const { assert } = require('chai');

require('chai')
.use(require('chai-as-promised'))
.should()

const RWD = artifacts.require('RWD');
const Tether = artifacts.require('Tether');
const DecentralBank = artifacts.require('DecentralBank');

contract('DecentralBank', ([owner, customer]) => { //deconstructed from accounts
  let tether, rwd, decentralBank

  function TokenInWei(value) {
    return web3.utils.toWei(value, 'ETHER');
  }

  before(async() => {
    // Loading contracts
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    // Transfer all (1 million) reward tokens to decentral bank
    await rwd.transfer(decentralBank.address, TokenInWei('1000000'), {from: owner}); 

    // Transfer 100 tether tokens to customer
    await tether.transfer(customer, TokenInWei('100'), {from: owner})
  })

  describe('Mock Tether Deployment', async() => {
    it('matches name successfully', async() => {
      const name = await tether.name();
      assert.equal(name, 'Mock_Tether_Token');
    })
  });
  describe('Reward Token Deployment', async() => {
    it('mateched name successfully', async() => {
      const name = await rwd.name();
      assert.equal(name, 'Reward_Token');
    })
  });
  describe('Decentral Bank deployment', async() => {
    it('matched name successfully', async() => {
      const name = await decentralBank.name();
      assert.equal(name, 'Decentral Bank');
    });
    it('has reward tokens', async() => {
      let balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance.toString(), TokenInWei('1000000'));
      // console.log(balance.toString());
    })
  })
});

// >truffle test
