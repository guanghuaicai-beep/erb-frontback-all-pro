import React,{useEffect} from 'react'
import '../css/footer.css'
import { Link,useLocation } from 'react-router-dom'
const Footer = () => {
    const location = useLocation();
    useEffect(()=>{
        if(location.hash){
            const element = document.getElementById(location.hash.slice(1));
            if(element){
                const navbar = document.querySelector('.navbar'); 
                const navbarHeight = navbar && window.innerWidth > 889 ? navbar.offsetHeight : 0;
                const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        }
    },[location]);
    return (
        <>
        <div className="footer">
            <div className="top">
                <div className="bg">
                    <img src="https://res.cloudinary.com/dzlcfmhts/image/upload/v1773632922/hkct_logo_sfi9iu.png" alt="logo" />
                    <p>Deliver premium professional training and skill enhancement courses to help adults achieve their career aspirations.</p>
                    <ul>
                        <li className='contacticon'><i className="fa-solid fa-phone"></i>+852 2711 9296</li>
                        <li className='contacticon'><i className="fa-solid fa-envelope"></i>info@hkcta.com</li>
                        <li className='contacticon'><i className="fa-solid fa-map-marker-alt"></i>8/F, Wong Tze Building, 71 Hoi Yuen Road, Kwun Tong, Kowloon</li>
                        <ul className="socialmedia">
                            <li><i className="fa-brands fa-facebook"></i></li>
                            <li><i className="fa-brands fa-square-twitter"></i></li>
                            <li><i className="fa-brands fa-tiktok"></i></li>
                            <li><i className="fa-brands fa-instagram"></i></li>
                        </ul>
                    </ul>
                </div>
                <div className="bg">
                    <h2>Company</h2>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/joinus">Join Us</Link></li>
                        <li><Link to="/network">Network</Link></li>
                    </ul>
                </div>
                <div className="bg">
                    <h2>Courses</h2>
                    <ul>
                        <li><Link to="/course">All Courses</Link></li>
                        <li><Link to="/about#teacherdetail">Tutors</Link></li>
                        <li><Link to="/about#sutdentdetail">Student Reviews</Link></li>
                    </ul>
                </div>
            </div>
            <div className="bottom">
                <p>© 2026 HKCT All rights reserved</p>
            </div>
        </div>
        </>
    )
}

export default Footer