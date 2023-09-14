import React, { useState } from 'react'
import Home from './components/Home/Home'
import NavBar from './components/Navigation/NavBar'
import Login from './components/Authentication/Login/Login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './components/Authentication/Signup/Signup';
import Contact from './components/Contact/Contact'
import Part1 from './components/Parts/SourceDestination/Part1'
import Part2 from './components/Parts/BusRouteDisplay/Part2'
import UserInfo from './components/UserProfile/UserInfo'
import FooterBottom from './components/Footer/FooterBottom'


function App() {
  
 

  return (
    <div className="w-full h-auto bg-slate-800">
      <div className='max-w-screen-2xl mx-auto px-16'>
        <Router>
          <NavBar/>
          <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/' element={<Signup/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/contact' element={<Contact />}></Route>
            <Route path='/home/part1' element={<Part1 />}></Route>
            <Route path='/home/part2' element={<Part2 />}></Route>
            <Route path='/home/UserInfo' element={<UserInfo/>}></Route>
            <Route path='/home/Footer' element={<FooterBottom/>}></Route>
          </Routes>
        
        </Router>
      </div>
    </div>
      
  )
}

export default App