require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/RuNXyZ8tZ6BoSl5QkPmdPlZV_PjrPkTN',
      accounts: ['50b6812ef36c9ac761a9cf75d136aab8f2324f5525d4eb800faff83bb3f99ad2'],
    },
  },
};
