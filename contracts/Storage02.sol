// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "./StorageSlot.sol";
import "hardhat/console.sol";

contract Storage02 {
    constructor() {
        // keccak256("eat") -> 1992
        StorageSlot.getUint256Slot(keccak256("eat")).value = 1992;
    }

    function check() external view {
        console.log(StorageSlot.getUint256Slot(keccak256("eat")).value);
    }
}
