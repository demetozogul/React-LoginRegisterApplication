import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { IUserLogin } from './models/IUserLogin';
import { toast, ToastContainer } from 'react-toastify';
import { Navigate, NavLink } from 'react-router-dom';
import Register from './Register';
import NavMenu from './components/NavMenu';
import { control } from './Util';

function App() {

//use effect using
//If the user is already logged in, redirect to the dashboard

/*
useEffect(() => {
 
  if(control())
  {
    window.location.href='/dashboard'
  }
}, [])
*/

//ref using 
const refEmail = useRef<HTMLInputElement>(null)
const refPassword = useRef<HTMLInputElement>(null)

//degerleri state e atıcaz onchange olduklarında
//state using
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

//state using for navigate
const [isRedirect, setIsRedirect] = useState(false)

//state using for remember me function
const [rememberMe, setRememberMe] = useState(false)

const fncSend = (e: React.FormEvent) => {
e.preventDefault();   // bu fonk gönderim islemini durdurur  - yapıyı durdurmak icin kullanılır 
                       //bilgiler girilmeden formun gönderilmesini engeller

if(email === ""){

refEmail.current?.focus()
toast("Please enter email address!")

}else if(password === "")
{
refPassword.current?.focus()
toast("Pease enter password!")
}else{

console.log(email,password)

//axions kullanımı  import edilmesi gerekli bir library cunku
//servise veri gönderme

const url ='https://www.jsonbulut.com/json/userLogin.php'

const params = {
 ref : 'c7c2de28d81d3da4a386fc8444d574f2',
 userEmail : email,
 userPass: password,
 face:'no'
}

//then yontemı promiseden miras alır.
//res burada response olacak
//servisler get oldugu icin burada get metodunu cagırdık normalde post yapmak gerekir böyle loginlerde

axios.get(url,{params:params}).then(res=>{

 //interface i verdik dt ye cünkü onun türünde olucak
 //obje eğilimli gitmek istediğimiz icin interface olusturduk

  const dt:IUserLogin =res.data
  const user = dt.user[0]
  const status = user.durum
  const message = user.mesaj

if(status){

  //session create (session storage)
  //json.stringfy : json object convert to string

  const st = JSON.stringify(user.bilgiler)
  //base64 encryption
  const userInfoEncryption = btoa(btoa(btoa(st)))
  sessionStorage.setItem('user',userInfoEncryption)

if(rememberMe === true)
{
  console.log('a',rememberMe)
  localStorage.setItem('rememberMeForUser', userInfoEncryption)
}
  toast.success(message)

  setTimeout(() => {
    //window.location.href='/dashboard'
    setIsRedirect(true) // for Navigate -- if isRedirect true, redirect to dashboard page
  }, 3000);
  

}else{
  toast.error(message)
}

  console.log('response',dt)

}).catch(err =>{
  console.error(err)
  toast.error("Service Error")
})
}

}

  return (
    <>
  
    {control() !==false && <Navigate to='/dashboard'/>}
    <ToastContainer/>
<div className='row'>
        <div className='col-sm-4'></div>
        <div className='col-sm-4'>
          <h1>User Login</h1>
          <form onSubmit={(e) => fncSend(e) }>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
              <input ref={refEmail} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1"  />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input ref={refPassword} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"  />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" onClick={(e) => setRememberMe(!rememberMe)} className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
            </div>
            
            <button type="submit" className="btn btn-primary">Login</button>
            <NavLink to="/register" className="btn btn-success" style={{ float:'right' }}>Register</NavLink>
           
          </form>
        </div>
        <div className='col-sm-4'></div>
      </div>

    </>
  );
}

export default App;
