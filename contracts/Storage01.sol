// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Storage01 {
    uint public x = 100; // Slot -> 0x0
    uint public y = 200; // Slot -> 0x1

    // keccak256(key + baseSlot) - Collision resistant
    mapping(uint => uint) public someMapping; // Base slot -> 0x2

    constructor() {
        someMapping[0] = 12; // keccak256(0 + 0x2)
        someMapping[5] = 5; // keccak256(5 + 0x2)
        someMapping[100] = 199; // keccak256(100 + 0x2)
    }
}
