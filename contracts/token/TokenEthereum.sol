// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./TokenBase.sol";

contract TokenEthereum is TokenBase {
    constructor() TokenBase("Curlent Ethereum Token","CETH") {}
}