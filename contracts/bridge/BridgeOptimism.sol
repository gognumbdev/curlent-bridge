// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./BridgeBase.sol";

contract BridgeOptimism is BridgeBase {
  constructor(address token) BridgeBase(token) {}
}