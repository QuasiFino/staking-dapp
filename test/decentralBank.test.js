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
  });
  describe('Yield Farming', async() => {
    it('rewards tokens for staking', async() => {
      // check investor balance
      let result = await tether.balanceOf(customer);
      assert.equal(result, TokenInWei('100'), 'customer\'s mock tether initial balance');

      // approving decentralBank contract
      await tether.approve(decentralBank.address, TokenInWei('100'), {from: customer});
      // check Staking for Customer
      await decentralBank.depositTokens(TokenInWei('100'), {from: customer});
      const allowance = await tether.allowance(customer, decentralBank.address);
      // console.log(allowance.toString()); //after transfer - 0

      // Check Updated balance of customer
      result = await tether.balanceOf(customer);
      assert.equal(result, TokenInWei('0'), 'customer balance after staking');

      // Check mock tether balance of decentral bank
      result = await tether.balanceOf(decentralBank.address);
      assert.equal(result.toString(), TokenInWei('100'));

      // Check staking balance of customer
      result = await decentralBank.stakingBalance(customer);
      assert.equal(result.toString(), TokenInWei('100'));

      // Is Staking balance
      result = await decentralBank.isStaking(customer);
      assert.equal(result.toString(), 'true', 'customer staking status after staking');

      // Issue Rewards
      await decentralBank.issueRewards({ from: owner });

      // reward balance of customer - 1/9th of deposit
      result = await rwd.balanceOf(customer);
      assert.equal(result.toString(), '11111111111111111111');

      // Issue rewards must be accessible only by the owner
      await decentralBank.issueRewards({ from: customer }).should.be.rejected;

      // Unstake token
      await decentralBank.unstakeTokens({ from: customer });

      // customer tether balance after unstake
      result = await tether.balanceOf(customer);
      assert.equal(result.toString(), TokenInWei('100'), 'customer balance after unstaking');

      // decentralBank tether balance after unstake
      result = await tether.balanceOf(decentralBank.address);
      assert.equal(result.toString(), TokenInWei('0'), 'decentral bank balance after unstaking');

      // Is staking update
      result = await decentralBank.isStaking(customer);
      assert.equal(result.toString(), 'false', 'customer is no longer staking');
    })
  });

});

// >truffle test
