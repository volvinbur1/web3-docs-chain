import './App.css'
import {HashRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/home'
import Upload from './pages/upload/upload'
import Verify from './pages/verify/verify'
import Search from './pages/search/search'
import MetaMaskWallet from './components/meta-mask-wallet'
import Web3 from 'web3'

function App() {
  const web3 = new Web3(window.ethereum)
  let metaMaskWallet = new MetaMaskWallet(web3)
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home metaMaskWallet={metaMaskWallet}/>}/>
        <Route path="/upload" element={<Upload web3={web3} metaMaskWallet={metaMaskWallet}/>}/>
        <Route path="/verify" element={<Verify/>}/>
        <Route path="/search" element={<Search/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App
