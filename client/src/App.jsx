import {useState} from 'react';
import CreateNft from "./components/CreateNft"
import WalletPanel from "./components/WalletPanel"
import Wallets from "./components/Wallets"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
const App = () => {
  const handleRoute = (e) => {
    // 👇️ prevent page refresh
    e.nativeEvent.stopImmediatePropagation();

    console.log('form submitted ✅');
  };
  return (
    <Router>
      <div className="container App">
        <ul className="flex place-content-around text-3xl font-bold inline-block w-3/4 mx-16 mb-3.5">
          <li><Link to="/" className='text-stone-500'>Marketplace</Link></li>
          <li><Link to="/create" className='text-stone-500'/*onClick={e => handleRoute(e)}*/>Create</Link></li>
          <li><Link to="/wallet" className='text-stone-500'/*onClick={e => handleRoute(e)}*/>Wallet</Link></li>
        </ul>
          <Routes>
            <Route exact path='/' element={<Wallets />} />
            <Route exact path='/create' element={<CreateNft/>}/>
            <Route exact path='/wallet' element={<WalletPanel/>}/>
          </Routes>
      </div>
    </Router>
    
  )
}

export default App
