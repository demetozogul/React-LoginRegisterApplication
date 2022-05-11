import { json } from "stream/consumers";
import { Bilgiler } from "./models/IUserLogin";

export const control = () => {

  //remember me control
   const rememberMeUser = localStorage.getItem('rememberMeForUser')
   
   if(rememberMeUser)
   {
     sessionStorage.setItem('user',rememberMeUser)
   }


  const st = sessionStorage.getItem('user');
  if (!st) {
    return false;
  }

  try {

    //decode base64
    const userInfo = atob(atob(atob(st)))

    const bilgi: Bilgiler = JSON.parse(userInfo);
    console.log('x',bilgi)
    return bilgi
    

  } catch (error) {
      return false
  }
  
};
