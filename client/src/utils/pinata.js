//require('dotenv').config();
import {REACT_APP_PINATA_KEY, REACT_APP_PINATA_SECRET} from './constants';
import {useForm} from 'react-hook-form';
//const key = process.env.REACT_APP_PINATA_KEY;
//const secret = process.env.REACT_APP_PINATA_SECRET;
const key = REACT_APP_PINATA_KEY;
const secret = REACT_APP_PINATA_SECRET;
//const axios = require('axios');
import axios from 'axios';
export const pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    console.log('JSON BODY: '+JSONBody)
    return axios 
        .post(url, JSONBody,{
            maxContentLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${JSONBody._boundary}`,
                pinata_api_key: REACT_APP_PINATA_KEY,
                pinata_secret_api_key: REACT_APP_PINATA_SECRET,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })//.then((response) => axios.get(response.pinataUrl, {headers: {'Accept':'text/plain'}})).then((response) => {return response;})
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};