import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners';

export default function Brands() {

  const [allBrands, setAllBrands] = useState(null);

  function getBrands(){
    axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    .then( (res) => {
      console.log(res);
      
      setAllBrands(res.data.data);
    })
    .catch( (err) => {
      console.log(err);
      
    })
  }

  useEffect( () => {
    getBrands();
  }, [])

  if(!allBrands)
  {
    return <><div className='vh-100 d-flex justify-content-center align-items-center bg-success-subtle bg-opacity-25'>
      <HashLoader
        color="#3de870"
        loading
        size={50}
        speedMultiplier={1.2}
      />

    </div></>
  }

  return <>
  
    <div className="container p-4">
      <h1 className='text-center fw-bold'>All Brands</h1>
      <div style={{height: '3px', width: '10%'}} className='mx-auto bg-main mb-5 rounded-pill'></div>
      <div className="row">
        
        {allBrands.map( (brand,idx) => <div key={idx} className="col-md-3">
          <div className='product border mb-3 rounded-5 border-success overflow-hidden'>
            <img className='w-100' src={brand.image} alt={brand.name} />
            <h5 className='text-center'>{brand.name}</h5>
          </div>
        </div>)}

      </div>
    </div>
  </>
}
