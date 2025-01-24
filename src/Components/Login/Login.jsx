import React, { useContext } from 'react'
import { useNavigate } from "react-router";
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup' //This library is imported like this as it is not exported as default, So we export all(*) as Yup(alias)
import axios from 'axios'
import LoginCSS from './Login.module.css'
import {authContext} from '../Context/AuthContext';
import { Link } from 'react-router-dom';

export default function Login() {

  const {myToken, setMyToken} = useContext(authContext);

  const userData = {
    email: '',
    password: '',
  }

  const [accountState, setAccountState] = useState(null);
  const [accountFail, setAccountFail] = useState("Invalid email or password");
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  function sendData(values) {

    setLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values)
    .then( (response) => {
      setAccountState(true);
      console.log("Success...",response);
      setLoading(false);
      localStorage.setItem('tkn', response.data.token);
      setMyToken(response.data.token);
      setTimeout(() => {
        Navigate('/home');
      }, 2000);
    })
    .catch( (error) => {
      setLoading(false);
      console.log("Failed...",error);
      setAccountState(false);
      const {message} = error.response.data;
      setAccountFail(message);
    });
  }

  const myShema = Yup.object({
    email: Yup.string()
    .required("This field is required...")
    .email("Invalid email"),

    password: Yup.string()
    .required("This field is required..."),
    
  })

  const myFormik = useFormik({
    initialValues: userData, //best practice: make an external object contains the initial values and pass it to the useFormik Hook
    
    onSubmit: sendData, //function to be executed on submit

    validationSchema: myShema,
  })

  return <>

    <div className='w-75 mx-auto py-5'>
      {accountState ? <div className="alert alert-success text-center">Welcome back!</div> : accountState === false ? <div className="alert alert-danger text-center">{accountFail}</div> : ""}
      
      <h2>Login Now:</h2>

      {/* the Formik library handles the submission process automatically by just passing submit handler to the form */}
      <form onSubmit={myFormik.handleSubmit}>

        <label className='mt-2' htmlFor="email">Email :</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} name='email' id='email' className='form-control' type="email" />
        {myFormik.errors.email && myFormik.touched.email ? <div on className="alert alert-danger mt-1">{myFormik.errors.email}</div> : ""}

        <label className='mt-2' htmlFor="password">Password :</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} name='password' id='password' className='form-control' type="password" />
        {myFormik.errors.password && myFormik.touched.password ? <div on className="alert alert-danger mt-1">{myFormik.errors.password}</div> : ""}

        {/* The default value of a button in a form is submit, to change it we use the attribute type="" */}
        {/* The Formik library is generating a warning that it is better to specify the type of the button even if it is the default */}
        
        {loading ? <button type='submit' className=' btn bg-main text-white mt-2'><div className={LoginCSS.loader}></div></button> : <button type='submit' className='btn bg-main text-white mt-2'>Login</button>}

        <p className='mt-4'>Not on FreshCart yet? <span><Link className='text-main text-decoration-underline' to={'/register'}>Register</Link></span></p>
      </form>
    </div>

  </>
}
