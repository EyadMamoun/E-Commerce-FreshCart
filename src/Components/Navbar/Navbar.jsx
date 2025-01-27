import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/freshcart-logo.svg'
import { authContext } from '../Context/AuthContext';
import { CartContext } from '../Context/CartContext';

export default function Navbar() {

  const { myToken, setMyToken } = useContext(authContext);
  const { numOfCartItems } = useContext( CartContext );

  const Navigate = useNavigate();

  function logout() {

    localStorage.removeItem('tkn');
    setMyToken(null);

    Navigate('/login');
  }
  
  const closeNavbar = () => {
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show')
    }
  };

  return <>

    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container">
        <img src={logo} alt="Fresh Cart" />
        <button className="navbar-toggler me-3" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link onClick={closeNavbar} className="nav-link active text-center" aria-current="page" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link onClick={closeNavbar} className="nav-link text-center" to="/categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link onClick={closeNavbar} className="nav-link text-center" to="/brands">Brands</Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 flex-row">
              <li className="nav-item">
                <Link target='_blank' to={"https://www.instagram.com/eyadmamoun/"}><i className="fa-brands fa-instagram mx-2"></i></Link>
              </li>
              <li className="nav-item">
                <Link target='_blank' to={"https://www.facebook.com/eyad.elsharqawy"}><i className="fa-brands fa-facebook mx-2"></i></Link>
              </li>
              <li className="nav-item">
                <Link><i className="fa-brands fa-tiktok mx-2"></i></Link>
              </li>
              <li className="nav-item">
                <Link><i className="fa-brands fa-x-twitter mx-2"></i></Link>
              </li>
              <li className="nav-item">
                <Link target='_blank' to={"https://www.linkedin.com/in/eyad-mamoun-944203227/"}><i className="fa-brands fa-linkedin mx-2"></i></Link>
              </li>
              <li className="nav-item">
                <Link target='_blank' to={"https://www.youtube.com/"}><i className="fa-brands fa-youtube ms-2 me-4"></i></Link>
              </li>
            </ul>
            {myToken ? <><li className="nav-item">
              <Link onClick={closeNavbar} className="nav-link" to="/cart"><span className='me-2'><i className="fa-solid fa-cart-shopping position-relative">
                {numOfCartItems? <span style={{ fontSize: '8.5px' }} class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
                  {numOfCartItems}
                </span> : ""}
              </i></span>Cart</Link>
            </li>
              <li className="nav-item">
                <span onClick={logout} role='button' className='ms-3'>Logout</span>
              </li></> : <>
              <li className="nav-item">
                <Link onClick={closeNavbar} className="nav-link" aria-current="page" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link onClick={closeNavbar} className="nav-link" aria-current="page" to="/register">Register</Link>
              </li> </>}

          </ul>
        </div>
      </div>
    </nav>

  </>
}
