// SPDX-License-Identifier: MIT
pragma solidity '0.8.0';

contract Tether {
  string public name = 'Tether';
  string public symbol = 'USDT';
  uint256 public totalSupply = 10 ** 6 * 10 ** 18; //one million
  uint256 public decimals = 18;
}