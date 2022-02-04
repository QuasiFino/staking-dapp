// SPDX-License-Identifier: MIT
pragma solidity '0.8.0';

contract RWD { //reward token
  string public name = 'Reward_Token';
  string public symbol = 'RWD';
  uint256 public totalSupply = 10 ** 6 * 10 ** 18; //one million
  uint256 public decimals = 18;

  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approve(address indexed _owner, address indexed _spender, uint256 _value);
  // indexed - only 3 arguments can be indexed per event
  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  constructor() {
    balanceOf[msg.sender] = totalSupply;
  }

  function transfer(address _to, uint256 _value) public returns(bool success) {
    require(balanceOf[msg.sender] >= _value, "Insufficient Balance");
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function approve(address _spender, uint256 _value) public returns(bool success) {
    allowance[msg.sender][_spender] += _value;
    emit Approve(msg.sender, _spender, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns(bool success) {
    require(balanceOf[_from] >= _value, "Insuficient Funds");
    require(allowance[msg.sender][_from] >= _value, "Allowance exceeded");
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    allowance[_from][msg.sender] -= _value;
    emit Transfer(_from, _to, _value);
    return true;
  }

}