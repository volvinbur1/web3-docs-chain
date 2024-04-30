import './App.css'
import {HashRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/home'
import Upload from './pages/upload/upload'
import Verify from './pages/verify/verify'
import Search from './pages/search/search'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/verify" element={<Verify/>}/>
        <Route path="/search" element={<Search/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App
