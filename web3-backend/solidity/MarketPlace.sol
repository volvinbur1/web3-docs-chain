// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IWdcNft {
    function doesUserOwnNft(address userAddress, uint256 tokenId) external view returns (bool);
    function ownerOf(uint256 tokenId) external returns (address);
    function transfer(address from, address to, uint256 tokenId) external;
}

contract Marketplace is Ownable {
    struct NftSale {
        uint256 tokenId;
        // price in Wei
        uint256 price;
    }

    mapping (address => NftSale[]) private nftsOnSale;
    address[] private saleAddresses;
    IWdcNft private docsChainNft;
    uint256 constant private sellFee = 0.001 ether;

    constructor() Ownable(msg.sender) {}

    function setDocsChainNftAddress(address nftContractAddress) public {
        docsChainNft = IWdcNft(nftContractAddress);
    }

    function withdraw() public payable onlyOwner {
        require(address(this).balance > 0, "contact balace is zero");
        payable(owner()).transfer(address(this).balance);
    }

    function currentBalance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }

    function getAllSaleAddresses() public view returns(address[] memory) {
        return saleAddresses;
    }

    function getSaleTokensByAddress(address user) public view returns (NftSale[] memory) {
        return nftsOnSale[user];
    }

    function putOnForSale(uint256 tokenId, uint256 price) public {
        require(address(docsChainNft) != address(0x0), "nft contract address not set");
        require(docsChainNft.doesUserOwnNft(msg.sender, tokenId), "token is not onwed by a sender");
        NftSale memory nftSale = NftSale({
            tokenId: tokenId,
            price: price
        });
        nftsOnSale[msg.sender].push(nftSale);
        saleAddresses.push(msg.sender);
    }

    function buyToken(uint256 tokenId) public payable {
        require(address(docsChainNft) != address(0x0), "nft contract address not set");

        address seller = docsChainNft.ownerOf(tokenId);
        // NftSale[] memory nfts = nftsOnSale[seller];
        // int targetTokenIdx = -1;
        // for (uint i = 0; i < nfts.length; i++) {
        //     if (nfts[i].tokenId == tokenId) {
        //         targetTokenIdx = int(i);
        //         break; 
        //     }
        // }

        // require(targetTokenIdx > -1, "address does not sell the token");
        // require(msg.value > tokenId + sellFee, "not enouth cost + fee.");

        docsChainNft.transfer(seller, msg.sender, tokenId);

        // _removeSaleToken(nfts, uint(targetTokenIdx), seller);
    }

    function _removeSaleToken(NftSale[] memory nfts, uint targetTokenIdx, address seller) private {
        if (nfts.length == 1) {
            for (uint i = 0; i < saleAddresses.length; i++ ) {
                if (saleAddresses[i] == seller) {
                    saleAddresses[i] = saleAddresses[saleAddresses.length - 1];
                    saleAddresses.pop();
                    break;
                }
            }
            delete(nftsOnSale[seller]);
        } else {
            nftsOnSale[seller][targetTokenIdx] = nfts[nfts.length - 1];
            nftsOnSale[seller].pop();
        }
    }
}