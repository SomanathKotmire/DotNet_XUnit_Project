import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import AddDish from './components/AddDish'
import AddMenu from './components/AddMenu'
import Dishes from './components/Dishes'
import Footer from './components/Footer'
import Header from './components/Header'
import Menus from './components/Menus'
import Home from './components/Home'
import Landing from './components/Landing'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}>
        <Route index element={<Home/>}/>
            <Route path='/menus' element={<Menus/>}/>
            <Route path='/dishes' element={<Dishes/>}/>
            <Route path='/addmenu' element={<AddMenu/>}/>
            <Route path='/addmenu/:id' element={<AddMenu/>}/>
            <Route path='/adddish' element={<AddDish/>}/>
            <Route path='/adddish/:id' element={<AddDish/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
