# Dummy Solidity Contract

A simple "Hello, World"-style smart contract written in Solidity. This project serves as a basic template or a starting point for more complex decentralized applications.

## Contract Details

The repository contains one simple contract:

*   **`Dummy.sol`**: A contract with a single function `ping()` that returns "pong". This is useful for quickly testing if a contract has been deployed successfully and is responsive on a network.

### Functions

*   `ping() external pure returns (string memory)`
    *   A view-only function that costs no gas to call.
    *   Returns the string "pong".

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. This guide assumes you are using the Hardhat development environment.

### Prerequisites

*   Node.js (v18 or later recommended)
*   `npm` or `yarn`

### Installation

1.  Clone the repository:
    ```sh
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2.  Install the project dependencies (like Hardhat):
    ```sh
    npm install
    ```

### Compiling the Contract

To compile the smart contract, run the following command:

```sh
npx hardhat compile
```

This will create artifact files in the `/artifacts` directory.