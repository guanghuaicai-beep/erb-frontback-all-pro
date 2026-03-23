import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import React, { useState, useContext, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';
import '../css/navbar.css'

const Navbar = ({ cartCount, heartCount, cartAnimate, heartAnimate, setCartCount, setHeartCount}) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [openConfirm, setOpenConfirm] = useState(false);
     // 狀態：控制菜單是否展開（預設 false = 隱藏）
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navbarRef = useRef(null);

    const { token, firstname, signOut } = useContext(AuthContext);

    // 打開 Dialog
    const handleSignOut = () => {
        setOpenConfirm(true);
    };

    // 確認 Sign Out
    const handleConfirmYes = () => {
        setOpenConfirm(false);
        setCartCount(0);
        setHeartCount(0);
        signOut();          // 清除 Context + localStorage
        navigate("/");      // redirect home page
    };

    // 取消 Sign Out
    const handleConfirmNo = () => {
        setOpenConfirm(false);
    };


    // 切換菜單展開/收起
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

    useEffect(()=>{
        const handleClickoutside = (e) =>{
            if(isMenuOpen && navbarRef.current && !navbarRef.current.contains(e.target)){
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown",handleClickoutside);
        return()=>{
            document.removeEventListener("mousedown",handleClickoutside);
        };
    },[isMenuOpen])

    const closeMenuOnlickclick = () =>{
        setIsMenuOpen(false);
    }


    return (
    <>
    <nav className="navbar" ref={navbarRef}>
        <div className="main-logo">
            <img src="https://res.cloudinary.com/dzlcfmhts/image/upload/v1773632922/hkct_logo_sfi9iu.png" alt="logo" />
            {/* <h1>hkct</h1> */}
        </div>
        <div className={`main-burger ${isMenuOpen ? 'active' : ''}`}>
            <ul>
                <li><Link to="/" onClick={closeMenuOnlickclick}>Home</Link></li>
                <li><Link to="/course" onClick={closeMenuOnlickclick}>Course</Link></li>
                <li><Link to="/network" onClick={closeMenuOnlickclick}>Network</Link></li>
                <li><Link to="/about" onClick={closeMenuOnlickclick}>About</Link></li>
                <li><Link to="/contact" onClick={closeMenuOnlickclick}>Contact</Link></li>
                <li><Link to="/joinus" onClick={closeMenuOnlickclick}>JoinUs</Link></li>
                <li><Link to="/donation" onClick={closeMenuOnlickclick}>Donation</Link></li>
            </ul>
        </div>

        <div className='main-sign'>
            <div 
                className='cart-container' 
                onClick={() => {
                if (token) {
                    navigate("/favorite");
                } else {
                    alert("Please Login");
                }
                }} 
            >
                <i className="fa-solid fa-heart"></i>
                {heartCount > 0 && <span className='heart-badge'>{heartCount}</span>}
            </div>
    
            <div 
                className='cart-container' 
                onClick={() => {
                if (token) {
                    navigate("/cart");
                } else {
                    alert("Please Login");
                }
                }} 
            >
                <i className="fa-solid fa-cart-shopping"></i>
                {cartCount > 0 && <span className='cart-badge'>{cartCount}</span>}
            </div>
            
            {token ? (
                <>
                <div className='navbarwelcome'>
                    <span className="welcome-text">Welcome , {firstname}</span>
                    <button className='btn-signout' onClick={handleSignOut}>Sign Out</button>
                </div>
                
                </>
            ) : (
                <Link to="/signin">Sign In</Link>
            )}
            </div>

        {/* <div className='main-sign'>
            <i className="fa-solid fa-heart"></i>
            <i className="fa-solid fa-cart-shopping"></i>
            <a href="#">Sign-In</a>
        </div> */}


        <div className='min-main-burger'>
        <div className='cart-container'>
            <i 
                className="fa-solid fa-cart-shopping" 
                onClick={() => token ? navigate("/cart") : alert("Please Login")} 
            ></i>
            {cartCount > 0 && <span className='cart-badge'>{cartCount}</span>}
            </div>

            <div className='cart-container'>
            <i 
                className="fa-solid fa-heart" 
                onClick={() => token ? navigate("/favorite") : alert("Please Login")} 
            ></i>
            {heartCount > 0 && <span className='heart-badge'>{heartCount}</span>}
            </div>

            <i 
            className="fa-solid fa-circle-user" 
            onClick={() => token ? toggleUserMenu() : navigate("/signin")} 
            ></i>

            {token && isUserMenuOpen && (
            <div className="user-dropdown">
                <p className='min-navbarwelcome'>Welcome , {firstname}</p>
                <ul>
                <li><button className='btn-signout' onClick={handleSignOut}>Sign Out</button></li>
                </ul>
            </div>
            )}

            <button className="hamburger-btn" aria-label="打開/關閉菜單" onClick={toggleMenu}>
            <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
        </div>
        {/* <div className='min-main-burger'>
            <i className="fa-solid fa-heart"></i>
            <i className="fa-solid fa-cart-shopping"></i>
            <i className="fa-solid fa-circle-user"></i>
            <button className="hamburger-btn" aria-label="打開/關閉菜單" onClick={toggleMenu}>
                <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
        </div> */}
    </nav>
    {/* Material UI Dialog */}
    <Dialog
    open={openConfirm}
    onClose={handleConfirmNo}
    aria-labelledby="signout-dialog-title"
    >
    <DialogTitle id="signout-dialog-title">Confirm Sign Out</DialogTitle>
    <DialogContent>
        <DialogContentText>
        Are you sure you want to sign out?
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleConfirmNo} color="primary">
        No
        </Button>
        <Button onClick={handleConfirmYes} color="primary" autoFocus>
        Yes
        </Button>
    </DialogActions>
    </Dialog>
    </>
    );
}

export default Navbar;