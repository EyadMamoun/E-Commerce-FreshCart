import React from 'react'
import { useNavigate } from "react-router";
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup' //This library is imported like this as it is not exported as default, So we export all(*) as Yup(alias)
import axios from 'axios'
import RegisterCSS from './Register.module.css'

export default function Register() {

  const userData = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
  }

  const [accountState, setaccountState] = useState(null);
  const [accountFail, setaccountFail] = useState("Failed to create an account, Please try again");
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  async function sendData(values) {

    try
    {
      setLoading(true);
      const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
      console.log("Success" , response.data); //(data) is a built in object in the response returning from the axios (it is not related to a specific response)
      setaccountState(true);
      setLoading(false);
      setTimeout(() => {
        Navigate('/login');
      }, 2000);
    }
    
    catch(err)
    {
      setLoading(false);
      console.log("Failed" , err);
      setaccountState(false);
      const {message} = err.response.data;
      setaccountFail(message);
    }
    // .then( () => {
    //   console.log("Success...");
      
    // } )
    // .catch( () => {
    //   console.log("Failed...");
      
    // } );
  }

  const myShema = Yup.object({
    name: Yup.string()
    .required("This field is required...")
    .min(2,"Name is too short...")
    .max(20,"Name is too long..."),

    email: Yup.string()
    .required("This field is required...")
    .email("Invalid email"),

    phone: Yup.string()
    .required("This field is required...")
    .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),

    password: Yup.string()
    .required("This field is required..."),

    rePassword: Yup.string()
    .required("This field is required...")
    .oneOf([Yup.ref('password')] , "Password doesn't match..."), 
    
  })
  // useFormik is a Hook made by Formik library to: 1- Getting values in and out of form state
  //                                                2- Validation and error messages
  //                                                3- Handling form submission
  const myFormik = useFormik({
    initialValues: userData, //best practice: make an external object contains the initial values and pass it to the useFormik Hook
    
    onSubmit: sendData, //function to be executed on submit

    // You can only use one of validate or validation schema

    // validate: function(values){

    //   const errors = {};

    //   let regexName = /^[A-Z][a-z]*(\s*)/
    //   let regexPhone = /^01[0125][0-9]{8}$/

    //   if(regexName.test(values.name) === false)
    //   {
    //     errors.name = 'Name must start with capital letter';
    //   }

    //   if(values.email.includes('@') === false || values.email.includes('.') === false)
    //   {
    //     errors.email = 'Please enter a valid Email';
    //   }

    //   if(regexPhone.test(values.phone) === false)
    //   {
    //     errors.phone = 'Please enter a valid Phone Number';
    //   }

    //   if(values.password.length < 8)
    //   {
    //     errors.password = 'Password can\'t be less than 8 characters';
    //   }

    //   if(values.rePassword !== values.password)
    //   {
    //     errors.rePassword = 'Password doesn\'t match';
    //   }

    //   return errors
    // }

    validationSchema: myShema,
  })

  return <>

    <div className='w-75 mx-auto py-5'>
      {accountState ? <div className="alert alert-success text-center">Congratulations your account has been created successfully</div> : accountState === false ? <div className="alert alert-danger text-center">{accountFail}</div> : ""}
      
      <h2>Register Now:</h2>

      {/* the Formik library handles the submission process automatically by just passing submit handler to the form */}
      <form onSubmit={myFormik.handleSubmit}>

        <label className='mt-2' htmlFor="name">Name :</label>
        {/* We link each input with its value using value={myFormik.values.} */}
        {/* We capture the change of value in the input using onChange={myFormik.handleChange} and this solves the problem od Un-controlled input */}
        {/* Formik uses the name attribute to map form fields to the corresponding keys in the initialValues object. Without name, Formik cannot associate the input field with the state. */}
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name} name='name' id='name' className='form-control' type="text" />
        {myFormik.errors.name && myFormik.touched.name ? <div on className="alert alert-danger mt-1">{myFormik.errors.name}</div> : ""}

        <label className='mt-2' htmlFor="email">Email :</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} name='email' id='email' className='form-control' type="email" />
        {myFormik.errors.email && myFormik.touched.email ? <div on className="alert alert-danger mt-1">{myFormik.errors.email}</div> : ""}

        <label className='mt-2' htmlFor="phone">Phone :</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} name='phone' id='phone' className='form-control' type="tel" />
        {myFormik.errors.phone && myFormik.touched.phone ? <div on className="alert alert-danger mt-1">{myFormik.errors.phone}</div> : ""}

        <label className='mt-2' htmlFor="password">Password :</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} name='password' id='password' className='form-control' type="password" />
        {myFormik.errors.password && myFormik.touched.password ? <div on className="alert alert-danger mt-1">{myFormik.errors.password}</div> : ""}

        <label className='mt-2' htmlFor="rePassword">Re-Password :</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword} name='rePassword' id='rePassword' className='form-control' type="password" />
        {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div on className="alert alert-danger mt-1">{myFormik.errors.rePassword}</div> : ""}

        {/* The default value of a button in a form is submit, to change it we use the attribute type="" */}
        {/* The Formik library is generating a warning that it is better to specify the type of the button even if it is the default */}
        {loading ? <button type='button' className=' btn bg-main text-white mt-2'><div className={RegisterCSS.loader}></div></button> : <button type='submit' className='btn bg-main text-white mt-2'>Register</button>}
      </form>
    </div>

  </>
}
