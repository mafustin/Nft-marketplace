import React, { useEffect, useState, useRef } from 'react'
import {ethers} from 'ethers'
import {contractABI, contractAddress} from '../utils/constants'
import { override } from 'mobx';
import axios from 'axios';
import { pinJSONToIPFS } from '../utils/pinata';
const JWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmYzRkMzJmNy00ZDljLTQyMWUtODhiZi02YWJhMDdjMGQ3YTUiLCJlbWFpbCI6ImZ1c3Rpbm1hcmluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyZjhhOTE0ZGYzNmQ4ZjVmMzE2ZSIsInNjb3BlZEtleVNlY3JldCI6ImRlM2ZkOTlhYWMxZDRmZWJkZmRkODc2N2VmYTBkNTg4MzZjMDJhODM3M2IxZGY3NjkxNjc5NTgyMTAwZTcxMDkiLCJpYXQiOjE2NzQ2NDY1Nzl9.KM5FJwF0AfudxAdGWHG_VPFCmgKpEsoGEHlzw68kfqU`;
import {REACT_APP_PINATA_KEY, REACT_APP_PINATA_SECRET} from '../utils/constants';
export const TransactionContext = React.createContext();

const { ethereum } = window

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    })
    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [ tokenId, setTokenId ] = useState(0);
    const [ currentBase, setCurrentBase ] = useState();
    const [ currentAccount, setCurrentAccount ] = useState();
    const [ owners, setOwners ] = useState(new Map());
    const [ balance, setBalance ] = useState(new Map());
    const [ baseURI, setBaseUri] = useState(new Map());
    //const [ mintedTokensCounter, setMintedTokensCounter] = useState(0);

    const generateTokenId = () => { setTokenId( tokenId + 1 ) }

    const checkMintRequirements = async() => {
        const cond2 = await checkIfAccountIsAvailable();
        //const transactionContract = getEthereumContract();
        //const numberOfPreviousMintPerAccount = await transactionContract.mintedTokensSum();
        //const tokenIdAsParameter = parseInt(numberOfPreviousMintPerAccount._hex)
        console.log('Result is', cond2);
        if(currentBase && cond2.length) {
            generateTokenId(); //late by one turn bcs of state update need to solve that
            console.log(tokenId+1, currentBase, currentAccount, cond2)
            //mapTokens(currentAccount, tokenId+1, currentBase);
            mintNft(currentAccount, tokenId+1, currentBase);
            return true;
        } else {
            console.log('Check Mint Requirements!')
            console.log(tokenId, currentBase, currentAccount, cond2)
            return false;
        }
    };
    const retrieveSmartContractData = async(tokenID=1) => {
        try {
            const transactionContract = getEthereumContract();
            const numberOfPreviousMintPerAccount = await transactionContract.mintedTokensSum();
            setTokenId(parseInt(numberOfPreviousMintPerAccount._hex));
            //console.log(tokenId);
            const numOfMintedTokens = parseInt(numberOfPreviousMintPerAccount._hex)
            //console.log('blablal')
            for(let i=1; i<=numOfMintedTokens; i++) {
                console.log('tralaa')
                const owner = await transactionContract.ownerOf(i);
                const ownerBalance = await transactionContract.balanceOf(currentAccount);
                const base = await transactionContract.BaseURIof(i);
                
                console.log(owner, base)
                var newOwners = owners;
                newOwners.set(i, owner)
                setOwners(newOwners);

                var newBaseUri = baseURI;
                newBaseUri.set(i, base);
                setBaseUri(newBaseUri);

 
            }
            //const owner = await transactionContract.ownerOf(tokenID);
            //const ownerBalance = await transactionContract.balanceOf(accountTo);
            //const base = await transactionContract.BaseURIof(tokenID);
            /*console.log(owner,base)
            var newOwners = owners;
            newOwners.set(tokenID, owner, numberOfPreviousMintPerAccount)
            setOwners(newOwners);
    
            var newBaseUri = baseURI;
            newBaseUri.set(tokenID, base);
            setBaseUri(newBaseUri);*/
        } catch (error) {
            console.error(error);
        }
        
    }
    
    const mapTokens = (accountTo,tokenID, path) => {
        //Update owners state
        var newOwners = owners;
        newOwners.set(tokenID, accountTo)
        setOwners(newOwners);

        //Update balance state
        var newBalance = balance;
        var amount = balance.get(accountTo);
        amount +=1;
        newBalance.set(accountTo, amount);
        setBalance(newBalance);

        //Update BaseUri
        var newBaseUri = baseURI;
        newBaseUri.set(tokenID, path);
        setBaseUri(newBaseUri);
    }
    const mintNft = async (accountTo,tokenID, path) => {
        try {
            //Mint token and get new data from Smart contract
            const transactionContract = getEthereumContract();
            const mintToken = await transactionContract.mint(accountTo, tokenID, path, {gasLimit:30000000});
            console.log(mintToken);
            //const transactionRecepient = await mintToken.wait();

            //console.log(owner);
            //const mintToken = await transactionContract.mint(accountTo, tokenID, path);
            //const owner = await transactionContract.ownerOf(tokenID);
            //const ownerBalance = await transactionContract.balanceOf(accountTo);
            //const base = await transactionContract.BaseURIof(tokenID);
            //console.log('Owners:'+owner+' Balance:'+ ownerBalance+' BaseUriOf'+ base)
            //Update owners state
            /*
            var newOwners = owners;
            newOwners.set(tokenID, accountTo)
            setOwners(newOwners);*/

            //Update balance state
            /*
            var newBalance = balance;
            var amount = balance.get(accountTo);
            amount +=1;
            newBalance.set(accountTo, amount);
            setBalance(newBalance);*/

            //Update BaseUri
            /*
            var newBaseUri = baseURI;
            newBaseUri.set(tokenID, path);
            setBaseUri(newBaseUri);*/
        
        
        } catch (error) {
            console.error(error);
        }
    }
    const handleSubmission = async(pic) => {
        const formData = new FormData();
        formData.append('file', pic);
        //formData.append('binaryForm', baseURI)
        const metaData = {
            name: 'File name',
        };
        formData.append('pinataMetadata', JSON.stringify(metaData));

        const options = {
            cidVersion: 0,
        }
        formData.append('pinataOptions', JSON.stringify(options)) 
        console.log(formData);
        //var object = {};
        //formData.forEach((value, key) => object[key]=value);
        const pinataResponse = await pinJSONToIPFS(formData);
        if(!pinataResponse.success) {
            return {
                success: false,
                status: "😢 Something went wrong while uploading your tokenURI."
            }
        }
        console.log(pinataResponse.pinataUrl);
        setCurrentBase(pinataResponse.pinataUrl);
        //checkMintRequirements();
        //retrievedContentFromPinata(pinataResponse.pinataUrl)
    }
    const retrievedContentFromPinata = async (/*url*/) => {
        const retrieved = axios.get("https://gateway.pinata.cloud/ipfs/QmXv8eQiD5d5hCStmnof5AqoK7uSb597GQt9BRQWX16oE2", {
            headers: {
                'Accept':'text/plain',
                pinata_api_key: REACT_APP_PINATA_KEY,
                pinata_secret_api_key: REACT_APP_PINATA_SECRET,
            }
        });
        console.log(retrieved);
    }
    const checkIfWalletIsConnected = async () => {
        if(!ethereum) return alert('Please install metamask');
        const accounts = await checkIfAccountIsAvailable();
        
        if(accounts.length) {
            setCurrentAccount(accounts[0])
            console.log(currentAccount, accounts);
            console.log(owners, baseURI)
            //return true
        } else {
            setCurrentAccount();
            console.log(currentAccount);
            //return false
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert('Please install metamask');
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
            console.log(currentAccount);
            await retrieveSmartContractData();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
        
    }
    const checkIfAccountIsAvailable = async () => {
        const accounts = await ethereum.request({method: 'eth_accounts'});
        return accounts;
    }
    useEffect(() => {
      checkIfWalletIsConnected()
    })

    return(
        <TransactionContext.Provider value={{checkIfWalletIsConnected, connectWallet, checkMintRequirements, setCurrentBase, handleSubmission,owners, baseURI, currentAccount, retrievedContentFromPinata,retrieveSmartContractData}}>
            {children}
        </TransactionContext.Provider>
    )
}