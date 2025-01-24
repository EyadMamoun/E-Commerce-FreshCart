import React, { useContext } from 'react'

import { CartContext } from '../Context/CartContext'
import { HashLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Cart() {

  const Navigate = useNavigate();
  
  const { numOfCartItems, totalCartPrice, allProducts, updateProductCount, deleteProductFromCart, clearUserCart } = useContext(CartContext);

  async function updateCount(id, newCount) {
    const response = await updateProductCount(id, newCount);

    if (response) {
      toast.success('Product Updated', { position: 'top-center', duration: 2000 })
    }
    else {
      toast.error('Failed tp update product', { position: 'top-center', duration: 2000 })
    }
  }

  async function deleteItem(id) {
    const response = await deleteProductFromCart(id);

    if (response) {
      toast.success('Item removed successfully', { position: 'top-center', duration: 2000 })
    }
    else {
      toast.error('Couldn\'t remove Item, Try again', { position: 'top-center', duration: 2000 })
    }
  }

  async function deleteCart()
  {
    const response = await clearUserCart();

    if( response )
    {
      toast.success('Cart deleted successfully', {position: 'top-center', duration: 2000});
    }
    else{
      toast.error('Unable to delete cart', {position: 'top-center', duration: 2000});
    }
  }

  if (!allProducts) {
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

    <div className="container bg-light my-3 py-3">
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <h2>Shop Cart :</h2>
          <p><span className='text-main'>Total Cart Price: </span>{totalCartPrice + ' EGP'}</p>
        </div>

        {numOfCartItems? <div className='d-flex flex-column'>
          <button onClick={ () => { Navigate('/payment') }} className='btn btn-outline-success mb-2'>Purchase Now</button>
          <button onClick={deleteCart} className='btn btn-outline-danger'>Clear Cart</button>
        </div> : <><p className='fw-bold'>Your cart is empty</p></>}
      </div>

      {allProducts.map((product, idx) => {
        return <><div key={idx} className='row align-items-center py-3 border-bottom border-2'>
          <div className="col-md-2">
            <div className="w-75 mx-auto">
              <img className='w-100' src={product.product.imageCover} alt="" />
            </div>
          </div>

          <div className="col-md-9">
            <div>
              <h6>{product.product.title}</h6>
              <p><span className='text-main'>Price: </span>{product.price + ' EGP'}</p>
              <h6 onClick={() => { deleteItem(product.product.id) }} className='d-inline-block' role='button'><i className="fa-solid fa-trash-can me-1 text-main"></i>Remove</h6>
            </div>
          </div>

          <div className="col-md-1">
            <div className='d-flex justify-content-center align-items-center'>
              <button onClick={() => { updateCount(product.product.id, product.count + 1) }} className='btn btn-outline-success fs-5'>+</button>
              <p className='mx-2 mb-0'>{product.count}</p>
              <button onClick={() => { updateCount(product.product.id, product.count - 1) }} className='btn btn-outline-success fs-5'>-</button>
            </div>
          </div>
        </div></>
      })}
    </div>

  </>
}
