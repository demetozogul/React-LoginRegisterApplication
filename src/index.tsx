import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


//import pages
import App from './App';
import Register from './Register';
import Dashboard from './Dashboard';
import Settings from './Settings';

//Control Class
import ControlView from './ControlView';


const router = 
<Router>
  <Routes>
    <Route path="" element={<App/>}></Route>  
    <Route path='/register' element={<Register/>}></Route>  
    <Route path='/dashboard' element={<ControlView view={<Dashboard/>}/>}></Route>
    <Route path='/settings' element={<ControlView view={<Settings/>}/>}></Route>
    <Route path='*' element={<App/>}></Route>
  </Routes>
</Router>

ReactDOM.render(router,document.getElementById('root'));


reportWebVitals();
