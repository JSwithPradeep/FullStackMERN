
import './App.css';
import Headers from './component/headers/Headers';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Edit from './pages/edit/Edit';
import Profile from './pages/profile/Profile';
import {Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
       <Headers/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>
      <Route path='/profile/:id' element={<Profile/>}/>
    </Routes>
 

    
    </>
  );
}

export default App;
