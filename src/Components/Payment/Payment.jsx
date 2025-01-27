import React, { useContext } from 'react'
import { CartContext } from '../Context/CartContext'
import axios from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Payment() {

    const { cartID, getUserCart } = useContext(CartContext);

    const Navigate = useNavigate();

    function confirmPayment(values) {
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
            {
                "shippingAddress": {
                    "details": values.address,
                    "phone": values.phone,
                    "city": values.city
                }
            },
            {
                headers: { token: localStorage.getItem('tkn') }
            }
        )
        .then( (res) => {
            console.log(res);
            
            toast.success('Payment proceeded successfully', {position: 'top-center', duration: 2000});
            getUserCart();
            setTimeout( () => {
                Navigate('/home');
            },1000);
        })
        .catch( (err) => {
            console.log(err);
            
        })
    }

    const userData = {
        address: "",
        phone: "",
        city: ""
    }

    const paymentFormik = useFormik({

        initialValues: userData,
        onSubmit: confirmPayment
    })

    return <>

        <div className="container py-3">

            <div className='w-75 mx-auto'>
                <h2>Pay Now:</h2>

                <form onSubmit={paymentFormik.handleSubmit}>
                    <label htmlFor="Address">Address :</label>
                    <textarea onBlur={paymentFormik.handleBlur} onChange={paymentFormik.handleChange} value={paymentFormik.values.address} type="text" placeholder='Enter shipping address...' id='Address' className='form-control mb-2' />

                    <label htmlFor="Phone">Phone :</label>
                    <input onBlur={paymentFormik.handleBlur} onChange={paymentFormik.handleChange} value={paymentFormik.values.phone} type="text" placeholder='phone...' id='Phone' className='form-control mb-2' />

                    <label htmlFor="City">City :</label>
                    <input onBlur={paymentFormik.handleBlur} onChange={paymentFormik.handleChange} value={paymentFormik.values.city} type="text" placeholder='city...' id='City' className='form-control mb-2' />
                </form>

                <button type='submit' className='btn bg-main text-white mt-2'>Confirm cash payment</button>
            </div>

        </div>
    </>
}
