import { ethers } from 'hardhat';
import { ContractFactory, Contract } from 'ethers';
const { getContractFactory } = ethers;

async function main(): Promise<void> {
    const cname: string = 'Storage',
        Storage: ContractFactory = await getContractFactory(cname),
        storage: Contract = await Storage.deploy();
    await storage.deployed();
    console.log(`${cname} address: ${storage.address}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exitCode = 1;
    });
