// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract DocsChainNft is ERC721, ERC721URIStorage, ERC721Pausable, Ownable, ERC721Burnable {
    uint256 constant private mintPrice = 0.001 ether;

    uint256 private _nextTokenId;
    mapping (address => uint256[]) private _usersNfts;

    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
        Ownable(msg.sender)
    {
        _nextTokenId = 1;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function withdraw() public payable onlyOwner {
        require(address(this).balance > 0, "contact balace is zero");
        payable(owner()).transfer(address(this).balance);
    }

    function currentBalance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }

    function safeMint(string memory uri) public payable returns (uint256) {
        require(msg.value >= mintPrice, "Not enough ether sent as a pay");
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        _usersNfts[msg.sender].push(tokenId);
        return tokenId;
    }

    function getUserNfts(address userAddress) public view returns(uint256[] memory) {
        return _usersNfts[userAddress];
    }

    function doesUserOwnNft(address userAddress, uint256 tokenId) external view returns (bool) {
        for (uint i = 0; i < _usersNfts[userAddress].length; i++) {
            if (_usersNfts[userAddress][i] == tokenId) {
                return true;
            }
        }

        return false;
    }

    function transfer(address from, address to, uint256 tokenId) external {
        _transfer(from, to, tokenId);
        for (uint i = 0; i < _usersNfts[from].length; i++) {
            if (_usersNfts[from][i] == tokenId) {
                _usersNfts[from][_usersNfts[from].length -1] = _usersNfts[from][i];
                _usersNfts[from].pop();
                break;
            }
        }
        _usersNfts[to].push(tokenId);
    }
    

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
