// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract Strings {
    function toLower(string memory _str) internal pure returns (string memory) {
        bytes memory strBytes = bytes(_str);
        for(uint i = 0; i < strBytes.length; i++) {
            if ((uint8(strBytes[i]) >= 65) && (uint8(strBytes[i]) <= 90)) {
                strBytes[i] = bytes1(uint8(strBytes[i]) + 32);
            }
        }
        return string(strBytes);
    }

    function containsSubstring(string memory _str, string memory _substr) internal pure returns (bool) {
        bytes memory strBytes = bytes(_str);
        bytes memory substrBytes = bytes(_substr);

        for (uint256 i = 0; i <= strBytes.length - substrBytes.length; i++) {
            bool found = true;
            for (uint256 j = 0; j < substrBytes.length; j++) {
                if (strBytes[i + j] != substrBytes[j]) {
                    found = false;
                    break;
                }
            }
            if (found) {
                return true;
            }
        }
        return false;
    }
}

contract DocsStorage is Strings {
    enum SearchOption { SearchByTopic, SearchByDescription, SearchByAuthor }

    struct DocInfo {
        string docIpfsAddress;
        string topic;
        string description;
        string authorName;
        address uploaderAddress;
        uint256 tokenId;
    }

    mapping (string => DocInfo) private docsList;
    string[] private docsAddresses;

    function registerNewDoc(string memory nftIpfsAddress, string memory docIpfsAddress, uint256 nftId, bytes memory docInfoData) public {
        (string memory topic, string memory description, string memory authorName) = 
            abi.decode(docInfoData, (string, string, string));
        
        DocInfo memory newDoc = DocInfo({
            docIpfsAddress: docIpfsAddress, 
            topic: topic, 
            description: description,
            authorName: authorName,
            uploaderAddress: msg.sender,
            tokenId: nftId
        });

        docsList[nftIpfsAddress] = newDoc;
        docsAddresses.push(nftIpfsAddress);
    }

    function getDocsList() public view returns (DocInfo[] memory) {
        DocInfo[] memory docs = new DocInfo[](docsAddresses.length);
        for (uint i = 0; i < docsAddresses.length;i++) {
            docs[i] = docsList[docsAddresses[i]];
        }
        return docs;
    }

    function search(SearchOption option, string memory searchText) public view returns (DocInfo[] memory)  {
        searchText = toLower(searchText);
        if (option == SearchOption.SearchByTopic) {
            uint cnt = getCountByTopic(searchText);
            return searchByTopic(searchText, cnt);
        } else if (option == SearchOption.SearchByDescription) {
            uint cnt = getCountByDescription(searchText);
            return searchByDescription(searchText, cnt);
        } else if (option == SearchOption.SearchByAuthor) {
            uint cnt = getCountByAuthor(searchText);
            return searchByAuthor(searchText, cnt);
        } else {
            revert();
        }
    }

    function getCountByTopic(string memory searchText) private view returns (uint) {
        uint coincidenceCnt = 0;
        for (uint i = 0; i < docsAddresses.length; i++) {
            string memory lowerTargetText = toLower(docsList[docsAddresses[i]].topic);
            if (containsSubstring(lowerTargetText, searchText)) {
                coincidenceCnt++;
            }
        }
        return coincidenceCnt;
    }

    function searchByTopic(string memory searchText, uint cnt) private view returns (DocInfo[] memory) {
        if (cnt == 0) {
            return new DocInfo[](0);
        }

        DocInfo[] memory resultingDocs = new DocInfo[](cnt);
        uint resIdx=0;
        for (uint i = 0; i < docsAddresses.length; i++) {
            string memory lowerTargetText = toLower(docsList[docsAddresses[i]].topic);
            if (containsSubstring(lowerTargetText, searchText)) {
                resultingDocs[resIdx] = docsList[docsAddresses[i]];
                resIdx++;
            }
        }
        return resultingDocs;
    }

    function getCountByDescription(string memory searchText) private view returns (uint) {
        uint coincidenceCnt = 0;
        for (uint i = 0; i < docsAddresses.length; i++) {
            string memory lowerTargetText = toLower(docsList[docsAddresses[i]].description);
            if (containsSubstring(lowerTargetText, searchText)) {
                coincidenceCnt++;
            }
        }
        return coincidenceCnt;
    }

    function searchByDescription(string memory searchText, uint cnt) private view returns (DocInfo[] memory) {
        if (cnt == 0) {
            return new DocInfo[](0);
        }

        DocInfo[] memory resultingDocs = new DocInfo[](cnt);
        uint resIdx=0;
        for (uint i = 0; i < docsAddresses.length; i++) {
            string memory lowerTargetText = toLower(docsList[docsAddresses[i]].description);
            if (containsSubstring(lowerTargetText, searchText)) {
                resultingDocs[resIdx] = docsList[docsAddresses[i]];
                resIdx++;
            }
        }
        return resultingDocs;
    }

    function getCountByAuthor(string memory searchText) private view returns (uint) {
        uint coincidenceCnt = 0;
        for (uint i = 0; i < docsAddresses.length; i++) {
            string memory lowerTargetText = toLower(docsList[docsAddresses[i]].authorName);
            if (containsSubstring(lowerTargetText, searchText)) {
                coincidenceCnt++;
            }
        }
        return coincidenceCnt;
    }
    
    function searchByAuthor(string memory searchText, uint cnt) private view returns (DocInfo[] memory) {
        if (cnt == 0) {
            return new DocInfo[](0);
        }

        DocInfo[] memory resultingDocs = new DocInfo[](cnt);
        uint resIdx=0;
        for (uint i = 0; i < docsAddresses.length; i++) {
            string memory lowerTargetText = toLower(docsList[docsAddresses[i]].authorName);
            if (containsSubstring(lowerTargetText, searchText)) {
                resultingDocs[resIdx] = docsList[docsAddresses[i]];
                resIdx++;
            }
        }
        return resultingDocs;
    }
}