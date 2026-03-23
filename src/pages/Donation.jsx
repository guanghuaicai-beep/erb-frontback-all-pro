import React from 'react'
import "../css/donation.css"
const Donation = () => {
    return (
        <>
        <div className="donationcontainer">
        <div className="donationsections donationsection-1">
            <div className="img img-1">
                <img src="https://res.cloudinary.com/dzlcfmhts/image/upload/v1773824388/donation_img-1_auxqxk.jpg" alt="" />
            </div>
            <div className="contents content-1">
                <h2>Self-financing Institution</h2>
                <p>
                    HKCT is a self-financing college officially recognized by the Hong Kong government. We have always operated on a self-sustaining financial model, with all operational expenses funded exclusively through tuition fees—receiving no government subsidies or institutional grants.

                    Innovation drives our curriculum. As pioneers in vocational specialist education, we deliver flexible, cutting-edge programs designed for tomorrow's workforce.

                    Your generous support is vital to sustaining our mission. Donations enable us to invest heavily in specialized vocational programs, creating pathways for lifelong learners while addressing critical talent shortages across industries. Together, we actively drive social progress and economic advancement.
                </p>
            </div>
        </div>
        <div className="donationsections donationsection-2">
            <div className="contents content-2">
                <h2>Donation Impact</h2>
                <div className="impacts impact-1">
                    <h3>Elevating Teaching Excellence</h3>
                    <ul>
                        <li>Recruiting Industry Veterans: Hiring instructors with real-world professional experience. </li>
                        <li>Regional Faculty Exchange: Fostering collaboration with neighboring institutions. </li>
                        <li>Raising Teaching Standards: Continuous improvement of pedagogical quality. </li>
                        <li>Staff Development: Supporting in-service training and lifelong learning for faculty. </li>
                    </ul>
                </div>
                <div className="impacts impact-2">
                    <h3>
                        Transforming Learning Environments
                    </h3>
                    <ul>
                        <li>State-of-the-Art Equipment: Regular upgrades to cutting-edge teaching technology. </li>
                        <li>Real-World Simulation Classrooms: Building immersive, industry-standard learning spaces. </li>
                        <li>Enhanced Community Spaces: Optimizing public areas to boost student belonging and engagement. </li>
                    </ul>
                </div>
                <div className="impacts impact-concl">
                    <p>Your donations directly empower HKCT to deliver world-class vocational education while creating inspiring spaces where students thrive.</p>
                </div>
            </div>
            <div className="img img-2">
                <img src="https://res.cloudinary.com/dzlcfmhts/image/upload/v1773976883/donations_img-2a_ccu51t.jpg" alt="" />
                <img src="https://res.cloudinary.com/dzlcfmhts/image/upload/v1773976770/donations_img-2_v5qfnm.jpg" alt="" />
            </div>
        </div>
        <div className="donationsections donationsection-3">
            <div className="img img-3">
                <img src="https://res.cloudinary.com/dzlcfmhts/image/upload/v1773824388/donation_img-3_esnxt4.jpg" alt="" />
            </div>
            <div className="contents content-3">
                <h2>Support HKCT Talent Development</h2>
                <h3>Generous Giving, Building Society's Future</h3>
                <a href="https://docs.google.com/forms/u/0/">Online Donation Form</a>
                <p>
                    Tax-Deductible Donations (HK$100+): All contributions qualify for tax-deductible receipts.
                </p> 
                <ul>Multiple Ways to Give:
                    <li>One-Time Online Donation via our secure form</li>
                    <li>Named Facility Sponsorship (classrooms, labs, study areas)</li>
                    <li>Scholarship Endowments supporting outstanding students</li>
                    <li>Academic Program Funding for cutting-edge vocational courses</li>
                </ul>   
                <p>
                    Every gift transforms lives, equipping Hong Kong's workforce with essential skills for tomorrow's challenges.
                </p>
            </div>
        </div>
        </div>
        </>
    )
}

export default Donation