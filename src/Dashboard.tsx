import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import ProItem from './components/ProItem';
import { IProduct, ProBilgiler } from './models/IProduct';
import { allProduct } from './Services'

export default function Dashboard() {

const [arr, setArr] = useState<ProBilgiler[]>([])
const [isLoad, setIsLoad] = useState(true)

useEffect(() => {
 
 allProduct(0).then( res => {

   const dt : IProduct = res.data

   console.log('dt',dt)

   setArr(dt.Products[0].bilgiler)
   setTimeout(() => {
    setIsLoad(false)
   }, 1000);
  

 }).catch(err => {
   console.error(err)
 })
}, []);

return  (
<>
<Helmet>
<title>Dashboard</title>
<meta name='description' content='Dashboard content'></meta>
</Helmet>

<h1>Product List</h1>
<br/>

{
  isLoad && <div style={{display: 'flex', justifyContent: 'center'}} >
    
    <img src='./loading.gif' width={400} />
  </div>
}
{isLoad === false &&
<div className='row'>
{
  arr.map((itm,index) =>

//for error = Each child in a list should have a unique "key" prop.
<ProItem key={index} item={itm} />
  )
}
</div>
}
</>
  )
}
