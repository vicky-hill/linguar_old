import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeReview } from '../../actions/review';
import pineapple from '../../img/graphics/pineapple.png';
import { showSettings, logout } from '../../actions/auth';

const Header = ({ url, showSettings, closeReview, logout, auth: {isAuthenticated, loading, user} }) => {
    
   
    const [currentURL, setCurrentURL] = useState('register');

    // Toggle between Sign in and sign up
    function changeURL() {
        console.log('changed')
        setCurrentURL(window.location.href);
    }

    function showLogOut() {
        document.getElementById('logout').classList.toggle('show-logout');
    }

    document.addEventListener('click', function(e) {

        if(!e.target.classList.contains('nav-link--user') && isAuthenticated) {
            document.getElementById('logout').classList.remove('show-logout');
        }

        
    });


    function logoutUser() {
        console.log('log out');
        logout();
    }


    // Logged in
    const loggedIn = (
        // Close review if open
        <div className='header' onClick={closeReview}>

            {/* Dictionary Search */}
            <div className="dictionary-searchbar">
                {/* <form action="">
                    <i class="fas fa-book-open input-icon"></i><input class="heading_grey-box_input rounded-input" type="text" />
                </form> */}
            </div>

            {/* Logo */}
            <Link to={url}>
                <h1>Linguar</h1>
            </Link>

            {/* Desktop Menu */}
            <div className="nav">
                <Link to="/vocabulary" className="nav-link">vocabulary</Link>
                <Link to="/conjugation" className="nav-link">conjugation</Link>

            <img src={pineapple} alt="" />
            <div className="logout-box" onClick={showLogOut}>
                <Link to="" className="nav-link nav-link--user" onClick={ (event) => event.preventDefault() }>{ !loading ? user.name : null }</Link>
                <div className="logout" id="logout">
                    <p className="logout-button" onClick={logoutUser} >Logout</p> 
                </div>
                </div>
            </div>

            {/* Hamburger Menu */}
            <div className="hamburger" onClick={showSettings}>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
            </div>

        </div>
    )


    // Logged in
    const loggedOut = (
        <div className='header'>

            {/* Dictionary Search */}
            <div className="dictionary-searchbar">

            </div>

            {/* Logo */}
            <Link to="">
                <h1>Linguar</h1>
            </Link>

            {/* Desktop Menu */}
            <div className="nav">

                {
                    currentURL.includes('login') ? 
                    
                       <Link to="login" className="nav-link nav-link--signin" onClick={changeURL} >Sign in <i className="fas fa-sign-in-alt"> </i></Link> :
                        <Link to="register" className="nav-link nav-link--signin" onClick={changeURL}>Sign up <i className="fas fa-user-plus"> </i></Link>

                }


                


            </div>


        </div>
    )



    return (

       !isAuthenticated ? loggedOut : loggedIn

    )
}

const mapStateToProps = state => ({
    url: state.words.url,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth

})

export default connect(mapStateToProps, { logout, closeReview, showSettings })(Header);
