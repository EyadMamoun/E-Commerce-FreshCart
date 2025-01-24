import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authContext } from './AuthContext';

export const CartContext = createContext();

export default function CartContextProvider({ children }) {

    const { myToken } = useContext( authContext );

    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [allProducts, setAllProducts] = useState(null);
    const [cartID, setCartID] = useState(0);

    async function addProductToCart(id) {
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
            {
                "productId": id},
            {
                headers: { token: localStorage.getItem('tkn') }
            }).then((res) => {
                console.log(res.data);

                //There is a problem in the backend response for this API, So we made a temporary solution 
                //by assigning the NumOfCartItems, TotalCartPrice, AllProducts through the get user cart API but this not the normal situation
                
                // setNumOfCartItems(res.data.numOfCartItems);
                // setTotalCartPrice(res.data.data.totalCartPrice);
                // setAllProducts(res.data.data.products);
                getUserCart();

                return true;
            })
            .catch((err) => {
                console.log(err);

                return false;
            })

            return res;
    }

    function getUserCart()
    {
        axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: {token: localStorage.getItem('tkn')}
        })
        .then( (res) => {
            console.log(res.data);

            setNumOfCartItems(res.data.numOfCartItems);
            setTotalCartPrice(res.data.data.totalCartPrice);
            setAllProducts(res.data.data.products);
            setCartID(res.data.cartId);
        })
        .catch( (err) => {
            console.log(err);
        })
    }

    async function updateProductCount(id , newCount)
    {
        const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
        {
            "count": newCount
        }, 
        {
            headers: {token: localStorage.getItem('tkn')}
        }).then( (res) => {
            console.log(res);
            
            setNumOfCartItems(res.data.numOfCartItems);
            setTotalCartPrice(res.data.data.totalCartPrice);
            setAllProducts(res.data.data.products);

            return true;
        })
        .catch( (err) => {
            console.log(err);
            
            return false;
        })
        
        return res;
    }

    async function deleteProductFromCart(id)
    {
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers: {token: localStorage.getItem('tkn')}
        })
        .then( (res) => {
            console.log(res);
            
            setNumOfCartItems(res.data.numOfCartItems);
            setTotalCartPrice(res.data.data.totalCartPrice);
            setAllProducts(res.data.data.products);

            return true;
        })
        .catch( (err) => {
            console.log(err);
            
            return false;
        })

        return res;
    }

    async function clearUserCart()
      {
          const res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
              headers: {token: localStorage.getItem('tkn')}
          })
          .then( (res) => {
              console.log(res);
              
              setAllProducts([]);
              setCartID(0);
              setNumOfCartItems(0);
              setTotalCartPrice(0);

              return true;
          })
          .catch( (err) => {
              console.log(err);
              
              return false;
          })

          return res;
      }

    useEffect( () => {
        getUserCart();
    }, [myToken]);

    return (

        <CartContext.Provider value={{
            addProductToCart,
            numOfCartItems,
            totalCartPrice,
            allProducts,
            updateProductCount,
            deleteProductFromCart,
            getUserCart,
            cartID,
            clearUserCart
        }}>
            {children}
        </CartContext.Provider>

    )
}
