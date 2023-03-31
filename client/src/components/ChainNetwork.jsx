import React from 'react'
import bnb_crypto_icon from '../img/bnb_crypto_icon.svg'
import bnb_fill_crypto_icon from '../img/bnb_fill_crypto_icon.svg'
import avax_crypto_icon from '../img/avax_crypto_icon.svg'
import matic_crypto_icon from '../img/matic_crypto_icon.svg'
import neo_crypto_icon from '../img/neo_crypto_icon.svg'

const ChainNetwork = () => {
  const chainNetworks = [ {name:'BSC', icon: bnb_crypto_icon},
                          {name:'Neo N3', icon: neo_crypto_icon},
                          {name:'Phantasma', icon: matic_crypto_icon},
                          {name:'Polygon', icon: bnb_fill_crypto_icon},
                          {name:'Avalanche', icon: avax_crypto_icon}
                        ];

  return (
    <div className='flex self-center gap-5 w-3/4 mt-14'>
      
      {
      chainNetworks.map((item,index) => (
        <div key={index} className='w-60 h-24 rounded bg-slate-200 flex flex-col place-items-center place-content-center hover:ring hover:ring-orange-200'>
         <img src={item.icon} className='h-5 w-5'/>
          <p>{item.name}</p>
        </div>
      )) 
    }
    </div>
    
    
    
  )
}

export default ChainNetwork