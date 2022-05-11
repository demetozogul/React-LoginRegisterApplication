import React, { useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { Bilgiler } from "../models/IUserLogin";
import { control } from "../Util";

//react fuctionalty component
export default function NavMenu() {

const bilgi:Bilgiler ={
    userId: "",
    userName: "",
    userSurname: "",
    userEmail: "",
    userPhone: "",
    face: "",
    faceID: ""
}

    const [user, setUser] = useState<Bilgiler>(bilgi)

    useEffect(() => {
     const usr = control()

     if(usr !== false)
     {
      setUser(usr)
     }
     
    }, [])
    
const logoutFunction = ()=>{

    sessionStorage.removeItem('user')
    localStorage.clear()
    window.location.href='/'
}

  return (
    <>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <NavLink className='navbar-brand' to='/dashboard'>Product.Ltd</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <NavLink className='nav-link' aria-current='page' to='/dashboard'>Dashboard</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className='nav-link' aria-current='page' to='/settings'>Settings</NavLink>
                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item"  data-bs-toggle="modal" data-bs-target="#exampleModal" href="#?">Logout</a></li>
                </ul>
                </li>
                <li className="nav-item">
                <a className="nav-link disabled">{user.userName}  {user.userSurname}  </a>
                </li>
            </ul>
            <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
        </nav>

        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Logout</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    Are you sure!
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger" onClick={(e)=> logoutFunction()}>Logout</button>
                </div>
                </div>
            </div>
        </div>
    </>
  );
}
