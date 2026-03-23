import React from 'react'
import Navbar from '../components/Navbar';
import '../css/about.css'
import { Link } from 'react-router-dom';
import Aboutvalues from '../components/Aboutvalues';
import {dvalues} from '../data/dabout';
import Aboutteacherdetail from '../components/Aboutteacherdetail';
import {dteacherdetail} from '../data/dabout'
import Aboutstudentreview from '../components/Aboutstudentreview';
const About = () => {
    return (
        <>
        <div className="abouttop">
            <h1>About Us</h1>
            <h2>Mission & Vision</h2>
            <h3>Vision</h3>
            <p>To be the most trusted partner for career transformation and self-actualization, empowering every individual to discover new possibilities through learning in a rapidly changing era.</p>
            <h3>Mission</h3>
            <p>To bridge the gap between traditional education and workplace practice by providing "ready-to-use" professional courses while balancing personal growth and interest exploration.</p>
        </div>
        <div className="story">
            <div className="left">
                <h2>Our Founding Story</h2>
                <p>In 2018, Mr. Lee Ming-wah founded our academy to fill the gap between traditional learning and workplace needs.</p>
                <p>Thus, we created a revolutionary platform, assembling 20 top industry experts to design "learn-and-apply-immediately" courses tailored specifically for working adults. From digital marketing to leadership mastery, every class targets real workplace pain points with proven solutions.</p>
                <p>Over seven remarkable years, we've empowered 2,500+ students to complete their transformation journey, with an impressive 95% achieving promotions or successful career pivots post-graduation—from accountants becoming UI designers to clerks transforming into digital marketing specialists. Every success story fuels our mission.</p>

            </div>
            <div className="right">
                <div className="img-container">
                    <img src="https://res.cloudinary.com/dzlcfmhts/image/upload/v1773633696/founder_w_logo_h0esj1.png" alt="founder" />
                    <p>Our founder Mr. Lee Ming-wah</p>
                </div>
            </div>
        </div>
        <div className="value">
            <h2>Core Values</h2>
            <div className="top">
                <div className='bg'>
                    <h3>Practicality</h3>
                    <p>We reject empty theories. All courses are taught by industry veterans to ensure students can apply what they learn immediately.</p>
                    
                </div>
                <div className='bg'>
                    <h3>Flexibility</h3>
                    <p>Designed for busy adults, we offer a hybrid learning model combining online and offline instruction.</p>
                </div>
                <div className='bg'>
                    <h3>Connection</h3>
                    <p>We build a student community to facilitate cross-industry resource sharing and networking.</p>
                </div>
            </div>
            <h2 className='Strategic'>Strategic Development</h2>
            <div className="bottom">
                {dvalues.map((item)=>(
                    <Aboutvalues key={item.id}
                    icon = {item.icon}
                    title = {item.title}
                    purpose = {item.purpose}
                    />
                ))}
            </div>
        </div>
        <div className="teacher" id="teacherdetail">
            <div className="title">
                <h2>World-Class Faculty</h2>
                <p>An exceptional team of professional instructors dedicated to delivering the highest quality learning experience.</p>
            </div>
            <div className="tea">
                {dteacherdetail.sort((a,b)=>{
                        const firstLetterA = a.teaname.charAt(0).toUpperCase();
                        const firstLetterB = b.teaname.charAt(0).toUpperCase();
                        return firstLetterA.localeCompare(firstLetterB);
                    })
                    .map((item)=>(
                    <Aboutteacherdetail key={item.id}
                        imglink={item.imglink}
                        teaname={item.teaname}
                        teaposition={item.teaposition}
                        experience={item.experience}
                        icon={item.icon}
                        moredetail={item.moredetail}
                    />
                ))}
            </div>
        </div>
        <Aboutstudentreview />
        <div className="community">
            <h2>Join Our Community</h2>
            <p>Start your learning journey right now with our 2500+ companions </p>
            <Link to="/course">Explore Courses</Link>
        </div>
        </>
    )
}

export default About