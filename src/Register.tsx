import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { IUserRegister } from "./models/IUserRegister";
import { Navigate, NavLink } from "react-router-dom";


export default function Register() {

    //isRedirect -- buna göre sayfayı yönlendiricez
  const [isRedirect, setIsRedirect] = useState(false);

  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");

  const fncRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const url = "https://www.jsonbulut.com/json/userRegister.php";
    const params = {
      ref: "c7c2de28d81d3da4a386fc8444d574f2",
      userName: userName,
      userSurname: userSurname,
      userPhone: userPhone,
      userMail: userMail,
      userPass: userPass,
    }

    //then bize servisteki yanıtı döndürür promise işlemi bittikten sonra
    axios.get(url, { params: params }).then((res) => {
      const dt: IUserRegister = res.data;
      const user = dt.user[0];
      const status = user.durum;

      console.log('response',dt)
      if (status) {
        //redirect 
        //window.location.href='/'

        setIsRedirect(true)

      } else {
        toast.error(user.mesaj)
      }
    })
  }

  return (
    <>
    {isRedirect && <Navigate to="/"/>}
      <ToastContainer />
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <h1>User Register</h1>
          <form onSubmit={(e) => fncRegister(e)}>
            <div className="mb-3">
              <input
                onChange={(e) => setUserName(e.target.value)}
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="mb-3">
              <input
                onChange={(e) => setUserSurname(e.target.value)}
                className="form-control"
                placeholder="Surname"
              />
            </div>
            <div className="mb-3">
              <input  type="text" pattern="\d*" maxLength={4}
                onChange={(e) => setUserPhone(e.target.value)}
                className="form-control"
                placeholder="Phone"
              />
            </div>
            <div className="mb-3">
              <input
                onChange={(e) => setUserMail(e.target.value)}
                className="form-control"
                placeholder="Mail"
              />
            </div>
            <div className="mb-3">
              <input type='password'
                onChange={(e) => setUserPass(e.target.value)}
                className="form-control"
                placeholder="Password"
              />
            </div>
            <button className="btn btn-primary">Submit</button>
            <NavLink to="/" className="btn btn-danger" style={{ float:'right' }}>Cancel</NavLink>
          </form>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </>
  );
}

