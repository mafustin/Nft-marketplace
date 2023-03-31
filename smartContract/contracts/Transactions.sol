//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;
//import "@openzeppelin/contracts/utils/Strings.sol"; 
contract Transactions {
    address payable _owner; //owner address payable - for deploying contract and etc
    address _contractAddress; //smart contract deployed address
    mapping(uint256 => address) public _owners;  //tokenID => address
    mapping (address => uint256) public _balances; //owener address => count of tokens
    mapping (uint256 => string) public _baseURI; //tokenId => baseUri
    uint256 public mintedTokensSum = 0;
    
    constructor() {
        _owner = payable(msg.sender);
        _contractAddress = contractAddress();
    }
    function mint(address to, uint256 tokenId, string memory path) public payable {
        require(exists(tokenId) != true, "TokenID already exist");
        _balances[to] += 1;
        mintedTokensSum += 1;

        _owners[tokenId] = to;
        BaseURI(tokenId, path);

    }
    function contractAddress() public view returns (address) {  
       address contAddress = address(this); //contract address  
       return contAddress;  
    }
    function exists(uint256 tokenId) public view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "ERC721: invalid token ID");
        return owner;
    }
    function _ownerOf(uint256 tokenId) public view returns (address) {
        return _owners[tokenId];
    }
    function balanceOf(address owner) public view returns (uint256) {
        uint256 balance = _balances[owner];
        require(owner != address(0), "ERC721: address zero is not a valid owner");
        return balance;
    }
    function BaseURI(uint256 tokenId, string memory path) internal {
        _baseURI[tokenId] = path;
    }
    function BaseURIof(uint256 tokenId) public view returns (string memory) {
        return _baseURI[tokenId];
    }
    /*
    function tokenUri (uint256 tokenId) public view returns (string memory) {
        string memory baseUri = _baseURI[tokenId];
        return bytes(baseUri).length > 0 ? string(abi.encodePacked(baseUri, Strings.toString(tokenId))) : "";
    }
    */

}