import React, {useContext} from 'react'
import ethereum from '../img/ethereum.svg'
/* import { image } from './Dropzone' */
import { nftNaddress } from './mobx/Classes'
import { TransactionContext } from '../context/TransactionContext'
const WalletPanel = () => {
  const {owners, baseURI, currentAccount, retrieveSmartContractData} = useContext(TransactionContext);
  console.log(owners, baseURI)
  const doThing= () => {
    var imgID = [];
    owners.forEach((value, key) => {
      console.log(currentAccount, baseURI, owners)
      if(value.toLowerCase()==currentAccount.toLowerCase()) {
        imgID.push(key)

      }
      console.log(value,key)

    });
    console.log(imgID)
    return ([...baseURI].map(([key,value]) => {
      if(imgID.includes(key)) {
        console.log(value, key)
        //return <div key={_key} className={'w-60 h-60'}><img src={String(_value)} width={'w-full'} /> </div>
        return <div key={key} className={'w-48 h-60'}><img src={value} className={'w-full h-full'}/> </div>
      }
      
    }))
    /*
    [...baseURI].map(([key,value]) => {
      console.log(key, value)
      console.log(baseURI, [...baseURI])
      return <div key={key} className={'w-60 h-60'}><img src={value} width={'w-full'} height={'h-full'}/> </div>
    })*/
  }
  
  const calculateColSize = () => {
    var imgID = [];
    owners.forEach((value, key) => {
      console.log(currentAccount, baseURI)
      if(value==currentAccount) {
        imgID.push(key)
        
      }
      //console.log(value,key)
    });
    return imgID;
  }

  return (
    <div>
        <h1 className='inline font-small text-4xl'>{currentAccount}</h1><img src={ethereum} className='inline h-8 w-8 mb-4 ml-2'/>
        <ul className='grid grid-cols-6'>
          <li><a href='#' className='focus:text-blue-400'><span className='text-lg'>Nft Available</span></a></li>
          <li><a><span className='text-lg active:text-cyan-300'>Nft on sale</span></a></li>
          <li><a><span className='text-lg active:text-cyan-300'>Bids on NFts</span></a></li>
          <li><a><span className='text-lg active:text-cyan-300'>NFT created</span></a></li>
          <li><a><span className='text-lg active:text-cyan-300'>Activity</span></a></li>
          <li><a><span className='text-lg active:text-cyan-300'>Wallets</span></a></li>
        </ul>
        <div className='h-96 w-full bg-black'>
          <div className={'grid grid-cols-6'}>
          {
            /*
            nftNaddress.nftToAddress.map((item,index) => {
              if(Object.keys(item)[0] == '0xadsadsad') {
                return <div key={index} className={'w-60 h-60'}><img src={Object.values(item)[0]} width={'w-full'} /> </div>
              }
            })
            */
          }
          {/*
            baseURI.forEach((_value, _key) => {
                console.log(_value, _key)
                //return <div key={_key} className={'w-60 h-60'}><img src={String(_value)} width={'w-full'} /> </div>
                return <div key={_key} className={'w-60 h-60'}><img src={_value} width={'w-full'} height={'h-full'}/> </div>
            })
           */   
            
          }
          {
            
            doThing()

          }
          
          </div>
          {/* {
            image.wallet.map((item,index) => {
              if(item) {
                <img key={index} src={item}></img>
              }
            }
            )
          } */}
          {/* <img src={image} /> */}
        </div>
    </div>
  )
}

export default WalletPanel