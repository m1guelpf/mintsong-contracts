const { ethers, run } = require('hardhat')

const CONSTRUCTOR_ARGS = [process.env.BASE_URL]

async function main() {
	const SongGridNFT = await ethers.getContractFactory('SongGridNFT')
	const contract = await SongGridNFT.deploy(...CONSTRUCTOR_ARGS)

	await contract.deployed()

	console.log('Contract deployed to:', contract.address)
	run('verify:verify', { address: contract.address, constructorArguments: CONSTRUCTOR_ARGS })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error)
		process.exit(1)
	})
