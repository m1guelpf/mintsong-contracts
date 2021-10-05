//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract SongGridNFT is Ownable, ERC721, ERC721Enumerable {
    string public baseTokenURI;
    bool public isUrlFrozen = false;

    mapping(uint256 => string) private _songHashes;

    constructor(string memory baseURL) ERC721("SongGridNFT", "SONG") {
        baseTokenURI = baseURL;
    }

    function mint(string memory hash) external returns (uint256) {
        uint256 tokenId = uint256(keccak256(abi.encodePacked(hash)));
        require(!_exists(tokenId), "song has already been minted");

        _songHashes[tokenId] = hash;
        _mint(_msgSender(), tokenId);

        return tokenId;
    }

    function updateBaseUrl(string memory baseUrl) external onlyOwner {
        require(!isUrlFrozen, "url is frozen");

        baseTokenURI = baseUrl;
    }

    function freezeBaseUrl() external onlyOwner {
        isUrlFrozen = true;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "token doesn't exist");

        return string(abi.encodePacked(baseTokenURI, "?s=", _songHashes[tokenId]));
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
