import { ethers } from 'hardhat';
import { config } from 'dotenv';
import { Storage02 } from '../typechain-types';
config();
const { provider, utils, getContractAt } = ethers,
    { keccak256, toUtf8Bytes } = utils,
    addr: string = process.env.STORAGE02 || '';

async function main(): Promise<void> {
    const Storage02: Storage02 = await getContractAt('Storage02', addr),
        slot = keccak256(toUtf8Bytes('eat')),
        value = await provider.getStorageAt(addr, slot);
    console.log(parseInt(value)); // 1992
    await Storage02.check(); // 1992 will be printed to the local node
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
