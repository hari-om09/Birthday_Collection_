import Header from './components/Header';
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import React from 'react';
import Footer from './components/Footer';
import Home from './pages/Home';


import Login from './pages/Login';
import AdminLayout from './layout/AdminLayout';
import SignupPage from './pages/Signup';




function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignupPage/>}/>

        <Route path="/admin" element={<AdminLayout/>}>

                
                
          </Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
