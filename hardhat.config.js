require('dotenv').config()

require('solidity-coverage')
require('hardhat-gas-reporter')
require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: {
		version: '0.8.9',
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	networks: {
		hardhat: {
			initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
		},
		ropsten: {
			url: `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`,
			accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
		},
		mumbai: {
			url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_ID}`,
			accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
		},
		polygon: {
			url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_ID}`,
			accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
		},
		mainnet: {
			url: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`,
			accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
		},
	},
	gasReporter: {
		enabled: process.env.REPORT_GAS !== undefined,
		currency: 'USD',
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
}
