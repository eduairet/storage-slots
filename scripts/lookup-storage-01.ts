import { ethers } from 'hardhat';
import { config } from 'dotenv';
config();
const { provider, utils } = ethers,
    { keccak256, hexZeroPad, hexlify } = utils,
    addr: string = process.env.STORAGE01 || '';

async function main(): Promise<void> {
    /**
     * You can use the ethers abstraction of eth_getStorageAt
     * to get values at certain storage slot
     */

    // uint public x = 100; // Slot -> 0x0
    await getStorageValue(addr, '0x0');
    // 0x0000000000000000000000000000000000000000000000000000000000000064
    // 100

    // uint public y = 100; // Slot -> 0x1
    await getStorageValue(addr, '0x1');
    // 0x00000000000000000000000000000000000000000000000000000000000000c8
    // 200

    // mapping(uint => uint) public someMapping; // Base slot -> 0x2
    await getStorageRefValue(addr, 0, 0x2);
    // 0x000000000000000000000000000000000000000000000000000000000000000c
    // 12
    await getStorageRefValue(addr, 5, 0x2);
    // 0x0000000000000000000000000000000000000000000000000000000000000005
    // 5
    await getStorageRefValue(addr, 100, 0x2);
    // 0x00000000000000000000000000000000000000000000000000000000000000c7
    // 199
}

async function getStorageValue(addr: string, slot: string): Promise<void> {
    const value: string = await provider.getStorageAt(addr, slot);
    console.log(value); // Hex value
    console.log(parseInt(value)); // Actual value
}

async function getStorageRefValue(
    addr: string,
    _key: number,
    _baseSlot: number
): Promise<void> {
    const key: string = hexZeroPad(hexlify(_key), 32),
        baseSlot: string = hexZeroPad(hexlify(_baseSlot), 32).slice(2),
        slot: string = keccak256(key + baseSlot);
    await getStorageValue(addr, slot);
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
