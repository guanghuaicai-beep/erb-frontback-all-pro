import React from 'react'
import { recruitmentList } from '../data/joinusrecruitmentjob'
import Recruitmentjob from '../components/Recruitmentjob'
import "../css/joinus.css"
const JoinUs = () => {
    return (
        <>
        <div className='jutitle'>
            <h1>Join Us</h1>
            <p>Become part of our mission to help thousands of adults achieve their career dreams.</p>
        </div>
        <div className='whyju'>
            <div className='top'>
                <h2>Why Join Us?</h2>
                <p>We believe everyone deserves the opportunity to reach their potential. Our team consists of passionate professionals dedicated to transforming the education industry.</p>
            </div>
            <div className='bottom'>
                <div className='bg'>
                    <i className="fa-regular fa-heart"></i>
                    <h3>Competitive Salary</h3>
                    <p>Competitive compensation based on experience and capabilities</p>
                </div>
                <div div className='bg'>
                    <i className="fa-solid fa-users"></i>
                    <h3>Friendly Team</h3>
                    <p className='p1'>Work with like-minded professionals and build long-term career relationships</p>
                </div>
                <div div className='bg'>
                    <i className="fa-solid fa-suitcase"></i>
                    <h3>Career Development</h3>
                    <p className='p1'>Training and development opportunities to help you achieve your career goals with flexible work arrangements</p>
                </div>
                <div div className='bg'>
                    <i className="fa-solid fa-location-dot"></i>
                    <h3>Flexible Work</h3>
                    <p>Support for remote work and flexible working hours</p>
                </div>
            </div>
        </div>
        <div className='jurecruitment'>
            <h2>Current Openings</h2>
            <p className='jutitlep1'>We're looking for talented and passionate people to join our team.</p>
            <div className='job'>
                {recruitmentList.map((item)=>(
                    <Recruitmentjob key={item.id}
                        workjob={item.workjob}
                        department={item.department} 
                        position={item.position}
                        workingmode={item.workingmode}
                        monsalary={item.monsalary}
                        jobrequeirment1={item.jobrequeirment1}
                        jobrequeirment2={item.jobrequeirment2}
                        jobrequeirment3={item.jobrequeirment3}
                    />
                ))}
            </div>
        </div>
        <div className='Applicationprocess'>
            <div className='top'>
                <h2>Application Process</h2>
                <p>Our recruitment process is simple and transparent, typically taking 2-4 weeks.</p>
            </div>
            <div className='process'>
                <div className='bg'>
                    <i className="fa-solid fa-1"></i>
                    <h6>Submit Application</h6>
                    <p>Complete the application form and upload your resume and portfolio</p>
                </div>
                <div className='bg'>
                    <i className="fa-solid fa-2"></i>
                    <h6>Initial Screening</h6>
                    <p>We review your application and select qualified candidates</p>
                </div>
                <div className='bg'>
                    <i className="fa-solid fa-3"></i>
                    <h6>Interview</h6>
                    <p>One-on-one or panel interview with our team</p>
                </div>
                <div className='bg'>
                    <i className="fa-solid fa-4"></i>
                    <h6>Offer</h6>
                    <p>Successful candidates will receive an offer letter</p>
                </div>
            </div>
        </div>
        <div className='readyjoinus'>
            <h2>Ready to Join Us?</h2>
            <h3>Choose a position and submit your application. We look forward to hearing your story!</h3>
            <a href='mailto:2053953491@qq.com'>Submit Application</a>
        </div>
        </>
    )
}

export default JoinUs