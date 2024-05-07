// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract DocsStorage {
    struct DocInfo {
        string ipfsAddress;
        string topic;
        string description;
        string authorName;
        string authorSurname;
        string authorScienceDegree;
        int8 uniqueness;
    }

    DocInfo[] docsList;

    function registerNewDoc(string memory ipfsAddress, bytes memory docInfoData) public {
        (string memory topic, string memory description, string memory authorName, string memory authorSurname, string memory authorDegree) = 
            abi.decode(docInfoData, (string, string, string, string, string));
        
        DocInfo memory newDoc = DocInfo({
            ipfsAddress: ipfsAddress, 
            topic: topic, 
            description: description,
            authorName: authorName,
            authorSurname: authorSurname,
            authorScienceDegree: authorDegree,
            uniqueness: 0
            });
        docsList.push(newDoc);
    }
}