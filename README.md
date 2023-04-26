# Storage Slots in Practice

This document has a practical approach to storage slots in solidity.

## Content

1. Contracts:
    - [Storage01.sol](./contracts/Storage01.sol)
    - [Storage02.sol](./contracts/Storage02.sol)
2. Libraries
    - [StorageSlot.sol](./contracts/StorageSlot.sol)
        - [`OpenZeppelin` library](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/StorageSlot.sol) to easily allocate storage without dealing with `assembly`

## Check storage

1. Run a new node `npx hardhat node`
    - [`hardhat.config.ts`](./hardhat.config.ts) is already set to run all the commands within a local hardhat node, check the `defaultNetwork` key
2. Deploy the contracts `npx hardhat run scripts/deploy.ts`
    - This will generate an `.env` file with the addresses you need to check the storage slots on every contract
3. Now you can test both contracts and check how the storage works
    - [Storage01](./scripts/lookup-storage-01.ts) -> `npx hardhat run scripts/lookup-storage-01.ts`
    - [Storage02](./scripts/lookup-storage-02.ts) -> `npx hardhat run scripts/lookup-storage-02.ts`
    - If you check the value printed in the console on every script is the same value that we have in our contracts, we’re accessing that value through the storage slot with the `ethers.provider.getStorageAt` method
