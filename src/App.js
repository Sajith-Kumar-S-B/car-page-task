import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Register from './components/Auth/Register';
import Home from './Home';

function App({}) {
  return (
    <>
    
     <Routes>
      <Route path='/login'  element={<Register/>}/>
      <Route path='/'  element={<Register register/>}/>
      <Route path='/company/add'  element={<Home/>}/>

     </Routes>
         </>
  );
}

export default App;
