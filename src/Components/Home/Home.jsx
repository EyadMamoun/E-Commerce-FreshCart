import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { HashLoader } from 'react-spinners'
import HomeSlider from '../HomeSlider/HomeSlider'

import { useQuery } from '@tanstack/react-query'
import CategoriesSlider from './../CategoriesSlider/CategoriesSlider';
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'

export default function Home() {

  const { addProductToCart } = useContext( CartContext );

  async function addProduct(productId)
  {
    const res = await addProductToCart(productId);

    if( res )
    {
      toast.success('Added Successfully', {position: 'top-center' , duration: 2000});
    }
    else{
      toast.error('Error Occurred', {position: 'top-center' , duration: 2000});
    }
  }

  // const [allProducts, setAllProducts] = useState(null);

  function getProducts() {
    // axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    //   .then((res) => {
    //     console.log(res);
    //     setAllProducts(res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);

    //   });

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  // useEffect(() => {
  //   getProducts();

  // }, [])

  // react-query handles automatically the changes that may be done in the backend through refetching for every mounting and comparing the data to that one cached
  const { data, error, isError, isLoading, refetch, isFetching } = useQuery({

    queryKey: ['getProducts'], // Query key must be an array
    queryFn: getProducts, // Query function
    //Don't refetch on every Mount
    // refetchOnMount: false, 

    //refetch automatically every 2Sec.
    // refetchInterval: 2000, 

    // cache data for 10 Sec. only
    // cacheTime: 10000,

    // disable auto-execution of the getProducts function, we can enable it on specific event through (refetch) fn
    // enabled: false,

  });

  if (isLoading) {
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

    <div className="container mt-5">

        <div className='w-100'>
          <HomeSlider />
        </div>

      <div className="row my-5">
        <CategoriesSlider />
      </div>

      <h1 className='text-center fw-bold mb-3'>Trending Products</h1>
      <div style={{height: '3px', width: '15%'}} className='mx-auto bg-main mb-3 rounded-pill'></div>

      <div className="row mt-5">
      
        {data.data.data.map((product, idx) => {
          return <div key={idx} className="col-md-3">
            <div className="product p-3">
              <Link to={`/productdetails/${product.id}`}>
                <div>
                  <img className='w-100' src={product.imageCover} alt={product.title} />
                </div>
                <h3 className='text-main mb-0 mt-2 fs-6'>{product.category.name}</h3>
                <h2 className='fs-5'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                <div className='d-flex justify-content-between align-items-center mb-2'>

                  <div>
                    {product.priceAfterDiscount ? <> <h6 style={{ color: "red" }} className='m-0 text-decoration-line-through'>{product.price + " EGP"}</h6>
                      <h6 className='m-0'>{product.priceAfterDiscount + " EGP"}</h6> </>
                      : <h6 className='m-0'>{product.price + " EGP"}</h6>}
                  </div>

                  <div className='d-flex align-items-center'>
                    <i className="fa-solid fa-star text-warning"></i>
                    <h6 className='m-0'>{product.ratingsAverage}</h6>
                  </div>
                </div>
              </Link>

              <button onClick={ () => addProduct(product.id) } className='btn bg-main w-100 text-white'>+ add to cart</button>
            </div>
          </div>
        }
        )}
      </div>
    </div>

  </>
}
