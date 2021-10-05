const { expect, use } = require('chai')
const { ethers } = require('hardhat')
use(require('chai-as-promised'))

const BASE_URI = 'https://example.com'
const BASE_URI_2 = 'https://example2.com'

const getTokenId = tx => tx.events[0].args.tokenId.toString()

describe('SongGridNFT', function () {
	let contract

	beforeEach(async () => {
		const SongGridNFT = await ethers.getContractFactory('SongGridNFT')
		contract = await SongGridNFT.deploy(BASE_URI)
		await contract.deployed()
	})

	it('should use the base URL to generate the tokenURI', async function () {
		const mintTx = await contract.mint('foo')
		const tokenId = getTokenId(await mintTx.wait())

		expect(await contract.tokenURI(tokenId)).to.equal(`${BASE_URI}?s=foo`)

		await (await contract.updateBaseUrl(BASE_URI_2)).wait()

		expect(await contract.tokenURI(tokenId)).to.equal(`${BASE_URI_2}?s=foo`)
	})

	it('prevents updating the tokenURI after freeze', async function () {
		expect(await contract.baseTokenURI()).to.equal(BASE_URI)

		await (await contract.updateBaseUrl(BASE_URI_2)).wait()

		expect(await contract.baseTokenURI()).to.equal(BASE_URI_2)

		await (await contract.freezeBaseUrl()).wait()

		await expect(contract.updateBaseUrl(BASE_URI).then(tx => tx.wait())).to.be.rejectedWith('url is frozen')
	})

	it('prevents minting the same hash more than once', async function () {
		await (await contract.mint('foo')).wait()

		await expect(contract.mint('foo').then(tx => tx.wait())).to.be.rejectedWith('song has already been minted')
	})
})
