import React, {useCallback, useContext} from 'react'
import { TransactionContext } from '../context/TransactionContext'
import Dropzone from './Dropzone'
import SubtitlesExpl from './SubtitlesExpl'
import ChainNetwork from './ChainNetwork'
import { FaUpload } from 'react-icons/fa'
import {SiBattledotnet} from 'react-icons/si'
import {GrAddCircle} from 'react-icons/gr'
/* import { useContext } from 'react' */
import {observer} from 'mobx-react-lite'
import axios from 'axios'
import {REACT_APP_PINATA_KEY, REACT_APP_PINATA_SECRET} from '../utils/constants';
/* import NftImageContext from './Dropzone' */
/* import {image} from './Dropzone' */
const CreateNft = observer(() => {
  const mintHeadings = [
    {subtitle: 'Collection', expl:'Smart contract and simbol on which your NFT will be minted'},
    {subtitle: 'name', expl:'Your NFT name'},
    {subtitle: 'Description', expl:'Your NFT description'},
    {subtitle: 'Type', expl:'Your NFT type'},
    {subtitle: 'Royalties', expl:'Defined as a %'},
    {subtitle: 'Quantity', expl:'This is the are where you drop your nft image'},
    {subtitle: 'Attributes(optional)', expl:'Your NFT Attribute Types&Values'},
  ]
  const Input = ({placeholder, id, type, value, handleChange, max, width}) => (
    <input
      placeholder = {placeholder}
      type={type}
      step="0.0001"
      defaultValue={value}
      maxLength={max} //doesnt work
      className={`my-2 ${width} rounded-sm p-2 outline-none bg-transparent border-orange-400 focus:border-none focus:outline-orange-300`} /* focus:ring focus:ring-blue-400 */
    />
  )
  const { checkMintRequirements, checkIfWalletIsConnected, handleSubmission, setCurrentBase, currentBase, retrievedContentFromPinata } = useContext(TransactionContext);
  const fetchApi = () => {
    //axios('https://jsonplaceholder.typicode.com/todos/7').then(res => JSON.stringify(res)).then(json => console.log(json));
    axios('https://api.pinata.cloud/data/testAuthentication', {
      headers: {
        pinata_api_key: REACT_APP_PINATA_KEY,
        pinata_secret_api_key: REACT_APP_PINATA_SECRET
      }
    }).then(res => JSON.stringify(res)).then(json => console.log(json));
  }
  const postApi = () => {
    axios.post('https://jsonplaceholder.typicode.com/posts', {
        userId:999,title:'Marin is modafucker', body:'tralalala'     
    }).then((res) => JSON.stringify(res)).then((json) => console.log(json));
  }
  const changeHandler = (event) => {
    console.log(event.target.files[0]);
    handleSubmission(event.target.files[0])
    //setCurrentBase(event.target.files[0]);
  }
    // onDrop function  
  /* const onDrop = useCallback(acceptedFiles => (
    // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
    console.log(acceptedFiles)

), []); */
  /* let imagePath = (files) => {
    image = files[0].path
    console.log(image+'=>This is path')
} */
 /*  const image = useContext(NftImageContext); */
  return (
    <div className='flex flex-col justify-start justify-items-start mx-1.5 my-1.5'>
        <h1 className='text-4xl self-center font-medium'>Create Nft</h1>
        <ChainNetwork />
        <div className='w-3/4 self-center mt-8'>
          <SubtitlesExpl subtitle={'Image'}
                        explanation={'Please make sure you upload images / artwork that you have created or have the right to use.'}
                         />
          {/* <div className='flex flex-col place-items-center place-content-center h-40 w-10/12 border border-dotted rounded-sm border-black'
                onDrop={`dropHandler(event)`}
                ondragover="dragOverHandler(event);"
          >
            <FaUpload className='h-7 w-7 mb-2'/>
            <p>Drop your NFT image here or click to upload</p>
          </div> */}
          <Dropzone /* onDrop={onDrop} accept={"image/*"} */ />
        </div>
        <div className='w-3/4 self-center mt-8'>
          <SubtitlesExpl subtitle={'Collection'} explanation='The smart contract and the simbol on which your NFT will be minted' />
          <div className='flex flex-row gap-5'>
            <div className='flex flex-col place-items-center place-content-center h-36 w-32 border border-solid rounded-sm border-orange-400'>
              <SiBattledotnet className='h-6 w-6 my-2' />
              <p>REAPER</p>
              <p>(ERC-721)</p>
            </div>
            <div className='flex flex-col place-items-center place-content-center h-36 w-32 border border-solid rounded-sm border-orange-400'>
              <SiBattledotnet className='h-6 w-6 my-2' />
              <p>REAPER</p>
              <p>(ERC-1155)</p>
            </div>
            <div className='flex flex-col place-items-center place-content-center h-36 w-32 border border-solid rounded-sm border-orange-400'>
              <GrAddCircle className='h-6 w-6 my-2' />
              <p>NEW</p>
            </div>
          </div>
        </div>
        <div className='w-3/4 grid grid-cols-2 self-center mt-8'>{/* gap-x-80 */}
          <div className='justify-self-start'>
            <SubtitlesExpl subtitle={'Name'} explanation={'Your NFT name'} />
            <Input width={'w-11/12'} placeholder='My custom NFT description' name='nftName' type='text' max={1} />
          </div>
          <div className='justify-self-center'>
            <SubtitlesExpl subtitle={'Description'} explanation={'Your NFT description'} />
            <textarea width={'w-96'} placeholder='My custom NFT descriptiopn' name='nftDesc' required='required' maxLength="5" 
                      className='border-orange-400 focus:border-none focus:outline-orange-300' />
          </div>
        </div>
        <div className='w-3/4 self-center mt-8'>
          <SubtitlesExpl subtitle={'Type'} explanation='this is mostly used in Marketplace to filter by type later' />
          <select>
            <option value='Art'>Art</option>
            <option value='Music'>Music</option>
            <option value='Game'>Game</option>
            <option value='NSFW'>NSFW</option>
          </select>
        </div>
        <div className='grid grid-cols-2 w-3/4 self-center mt-8 gap-x-3.5'>
          <div className='justify-self-start'>
            <SubtitlesExpl subtitle={'Royalties'} explanation='Defined as a %' />
            <div className='flex flex-row'>
              <button className='h-10 w-14 mt-2 mr-2 rounded bg-yellow-300'>-</button>
              <Input width={'w-7/12'} value={0} name='description' type={'text'} handleChange={(e) => handleClick} />
              <button className='h-10 w-14 mt-2 ml-2 rounded bg-yellow-400'>+</button>
            </div>
          </div>
          <div className='justify-self-end'>
            <SubtitlesExpl subtitle={'Quantity'} explanation='Quantity of NFTs that you want to mint right now' />
            <div className='flex flex-row'>
              <button className='h-10 w-14 mt-2 mr-2 rounded bg-yellow-300'>-</button>
              <Input width={'w-7/12'} value={0} name='royalties' type={'text'} handleChange={(e) => handleClick} />
              <button className='h-10 w-14 mt-2 ml-2 rounded bg-yellow-400'>+</button>
            </div>
          </div>
        </div>
        {/* <div>
        {
        mintHeadings.map((item,index) => (
          <SubtitlesExpl key={item.subtitle+index} subtitle={item.subtitle} explanation={item.expl} />
        ) 
        )
        }
        </div> */}
        <div className='w-3/4 self-center'>
          <SubtitlesExpl subtitle={'Attributes(optional)'} explanation='Your NFT Attribute types and values' />
          <div className='grid grid-rows-3 grid-cols-2'>
            <Input width={'w-11/12'} name='type1' type={'text'} />
            <Input width={'w-11/12'} name='type1' type={'text'} />
            <Input width={'w-11/12'} name='type1' type={'text'} />
            <Input width={'w-11/12'} name='type1' type={'text'} />
            <Input width={'w-11/12'} name='type1' type={'text'} />
            <Input width={'w-11/12'} name='type1' type={'text'} />
          </div>
        </div>
        <input type='file' onChange={changeHandler} />
        <button className='self-center h-8 w-32 rounded-xl bg-black text-white' onClick={() =>{/*checkIfWalletIsConnected();*/ /*checkMintRequirements();*/ checkMintRequirements()}}>Submit</button>
        {/* {console.log(image.source)} */}
        {/* <p>{image.source}</p> */}
    </div>
  )
})

export default CreateNft