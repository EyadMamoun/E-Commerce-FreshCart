import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { HashLoader } from 'react-spinners';
import NotFound from '../NotFound/NotFound';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {

    const { id } = useParams();

    function getSpecificProduct() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    const { addProductToCart } = useContext( CartContext );

    async function addProduct(productId)
    {
        const response = await addProductToCart(productId);

        if( response )
        {
            toast.success('Added Successfully', {duration: 3000, position: 'top-center'})
        }
        else
        {
            toast.error('Error Occurred', {duration: 3000, position: 'top-center'})
        }
    }

    const { data, isLoading, isError } = useQuery({
        // We made this to specify a unique key for each product
        // if it is the same key for all products it will load the last data assiociated to this key and then refetch it to get the new one
        queryKey: [`getSpecificProduct-${id}`],
        queryFn: getSpecificProduct
    })

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

    if (isError) {
        return <NotFound />
    }

    const product = data?.data.data;

    return <>

        <div className="container">
            <div className="row py-5 align-items-center">
                <div className="col-md-4">
                    <div>
                        <img className='w-100' src={product.imageCover} alt={product.title} />
                    </div>
                </div>

                <div className="col-md-8">
                    <div>
                        <h5>{product.title}</h5>
                        <p className='ms-2 text-light-emphasis'>{product.description}</p>
                        <h6 className='text-main'>{product.category.name}</h6>
                        <div className='d-flex justify-content-between align-items-center mb-3'>
                            <div>
                                {product.priceAfterDiscount ? <> <h6 style={{ color: "red" }} className='m-0 text-decoration-line-through'>{product.price + " EGP"}</h6>
                                    <h6 className='m-0'>{product.priceAfterDiscount + " EGP"}</h6> </>
                                    : <h6 className='m-0'>{product.price + " EGP"}</h6>}
                            </div>
                            <h6><span><i className="fa-solid fa-star text-warning"></i></span>{product.ratingsAverage}</h6>
                        </div>

                        <button onClick={ () => addProduct(id) } className='btn bg-main w-100 text-white'>+ add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
