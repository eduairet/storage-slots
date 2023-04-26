import { ethers } from 'hardhat';
import { ContractFactory, Contract } from 'ethers';
import { writeFileSync } from 'fs';
const { getContractFactory } = ethers;

async function main(): Promise<void> {
    const s1: string = await deploy('Storage01'),
        s2: string = await deploy('Storage02');
    writeFileSync('./.env', `${s1}\n${s2}`);
}

async function deploy(cname: string): Promise<string> {
    const MyContract: ContractFactory = await getContractFactory(cname),
        myContract: Contract = await MyContract.deploy();
    await myContract.deployed();
    console.log(`${cname} address: ${myContract.address}`);
    return `${cname.toUpperCase()}=${myContract.address}`;
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exitCode = 1;
    });
