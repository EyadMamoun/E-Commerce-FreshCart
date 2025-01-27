import React from 'react'
import FooterCSS from './Footer.module.css'
import amazonPay from '../../images/Amazon_Pay_logo.png'
import AmericanExpress from '../../images/amex.svg'
import MasterCard from '../../images/MasterCard_Logo.png'
import PayPal from '../../images/paypal.png'
import AppleStore from '../../images/Available_on_apple_store.png'
import GooglePlay from '../../images/Get_on_google_play.png'

export default function Footer() {
  return <>

    <div className='bg-body-tertiary'>
      <div className="container py-5">
        <h2>Get The FreshCart App</h2>
        <p className={FooterCSS.fontSizeMobile}>We will send you a link, open it on your phone to download the app</p>
        <div className='ms-3 d-flex'>
          <input className='form-control w-75 me-2' type="email" placeholder='Email' />
          <button className={'btn bg-main text-white ms-2 ' + FooterCSS.btnFontMobile}>Share App Link</button>
        </div>

        <div className={FooterCSS.Line + ' my-4'}></div>

        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center w-50'>
            <h5 className={'me-2 w-50 mb-0 ' + FooterCSS.fontSizeMobile}>Payment Partners</h5>
            <div className='d-flex align-items-center w-50 me-5'>
              <div className={FooterCSS.paymentPartners}><img className='w-100' src={amazonPay} alt="" /></div>
              <div className={FooterCSS.paymentPartners + ' mx-2'}><img className='w-100' src={AmericanExpress} alt="" /></div>
              <div className={FooterCSS.paymentPartners}><img className='w-100' src={MasterCard} alt="" /></div>
              <div className={FooterCSS.paymentPartners + ' mx-2'}><img className='w-100' src={PayPal} alt="" /></div>
            </div>
          </div>

          <div className='d-flex justify-content-end align-items-center w-50'>
            <h5 className={'me-2 mb-0 w-50 ' + FooterCSS.fontSizeMobile}>Get deliveries with FreshCart</h5>
            <div className='d-flex w-50'>
              <div className={FooterCSS.AppStore + ' me-2'}><img className='w-100' src={AppleStore} alt="" /></div>
              <div className={FooterCSS.AppStore}><img className='w-100' src={GooglePlay} alt="" /></div>
            </div>
          </div>
        </div>

        <div className={FooterCSS.Line + ' my-4'}></div>

        <p className={FooterCSS.fontSizeMobile}>All Rights Reserved @2025 | Designed by Eyad Mamoun</p>
      </div>
    </div>


  </>
}
