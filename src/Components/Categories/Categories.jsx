import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners';

export default function Categories() {

  const [allCategories, setAllCategories] = useState(null);

  function getCategories(){
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    .then( (res) => {
      console.log(res);
      
      setAllCategories(res.data.data);
    })
    .catch( (err) => {
      console.log(err);
      
    })
  }

  useEffect( () => {
    getCategories();
  }, [])

  if(!allCategories)
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
      <h1 className='text-center fw-bold'>All Categories</h1>
      <div style={{height: '3px', width: '15%'}} className='mx-auto bg-main mb-5 rounded-pill'></div>
      <div className="row">
        
        {allCategories.map( (category,idx) => <div key={idx} className="col-md-3">
          <div className='product border mb-3 rounded-5 border-success overflow-hidden'>
            <img style={{height: '300px'}} className='w-100' src={category.image} alt={category.name} />
            <h5 className='text-center mt-2'>{category.name}</h5>
          </div>
        </div>)}

      </div>
    </div>
  </>
}
