import React, {useContext} from 'react';
import { TransactionContext } from '../context/TransactionContext';

const Wallets = () => {
  const { connectWallet } = useContext(TransactionContext);
  return (
    <div className='w-3/4 mx-32'>
      <h1 className='text-3xl mb-2.5'>Wallets</h1>
      <button className='w-40 h-14 bg-orange-400' type="button" onClick={connectWallet}>Connect Metamask wallet</button>
    </div>
    
  )
}

export default Wallets