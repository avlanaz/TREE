// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity =0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CRBToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Carbon", "CRB") {
        _mint(msg.sender, initialSupply);
    }
}


contract TGVToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Tree Governance Token", "TGV") {
        _mint(msg.sender, initialSupply);
    }
}