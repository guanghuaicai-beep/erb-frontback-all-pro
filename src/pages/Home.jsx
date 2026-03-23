import React from 'react'
import '../css/homepage.css'
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <>
        <div className="homepagetitle">
            <div className="left">
                <h1 className="ztitle">Driven by Creativity Empowered by Technology</h1>
                <h1 className="ftitle">Progress Beyond the Workplace</h1>
                <p>HKCT is Hong Kong's leading adult education brand. Master practical, ready-to-use skills and unlock your slashie lifestyle.</p>
                <ul>
                    <li><Link to="/course">Explore Our Courses</Link></li>
                    <li><Link to="/about">Learn More About HKCT</Link></li>
                </ul>
            </div>
            <div className="right">
                <img src="https://res.cloudinary.com/dzlcfmhts/image/upload/v1773373459/hero_aysb1g.jpg" alt="" />
            </div>
        </div>
        <div className="sign">
            <h1>Ready to Enroll in a Course?</h1>
            <p>Sign up now for 20% OFF your first course!</p>
            <Link to="/course">Enroll Now!</Link>
        </div>
        </>
    )
}

export default Home