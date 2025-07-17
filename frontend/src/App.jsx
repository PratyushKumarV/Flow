import Dashboard from './components/Dashboard'
import Authentication from './components/Authentication'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/login" element={<Authentication/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
