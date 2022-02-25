// SPDX-License-Identifier: MIT
pragma solidity '0.8.0';
import "./RWD.sol";
import "./Tether.sol";


contract DecentralBank {
  string public name = 'Decentral Bank';
  address public owner;
  RWD public rwd;
  Tether public tether;

  address[] public stakers;

  mapping(address => uint256) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  constructor(RWD _rwd, Tether _tether) {
    rwd = RWD(_rwd);
    tether = Tether(_tether);
    owner = msg.sender;
  }

  // Staking function
  function depositTokens(uint256 amount) public {
    require(amount > 0, "Cannot stake 0 amount");
    tether.transferFrom(msg.sender, address(this), amount);
    stakingBalance[msg.sender] += amount;

    if(!hasStaked[msg.sender]) {
      stakers.push(msg.sender);
      hasStaked[msg.sender] = true;
    }

    isStaking[msg.sender] = true;
  }

  function issueRewards() public {
    require (msg.sender == owner, "Only the owner can issue rewards");

    for(uint256 i; i < stakers.length; i++) {
      address recipient = stakers[i];
      uint256 reward = stakingBalance[recipient] / 9; // 1/9th of staking balance
      if (reward > 0) {
        rwd.transfer(recipient, reward);
      }
    }
  }

  function unstakeTokens() public {
    uint256 balance = stakingBalance[msg.sender];
    require (balance > 0, "No stake balance");

    stakingBalance[msg.sender] = 0;
    isStaking[msg.sender] = false;

    tether.transfer(msg.sender, balance);
  }
}