import React from 'react'
import {companyrecruitmentList} from "../data/companyrecruitmentjob"
import CompanyRecruitmentjob from '../components/CompanyRecruitmentjob'
import "../css/companyrecruitment.css"
const Companyrecruitment = () => {
    return (
        <>
            <div className='companyrecruitment'>
                <h2>Current Openings</h2>
                <p className='companytitlep1'>Our parnters are looking for talented and passionate people to join our team.</p>
                <p className='companytitlep2'>If you are interested in applying the below jobs, please contact us via <a href="mailto:info@hkct.com">email<i className="fa-solid fa-envelope"></i></a></p>
                <div className='companyjob'>
                    {companyrecruitmentList.map((item)=>(
                        <CompanyRecruitmentjob key={item.id}
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
        </>
    )
}

export default Companyrecruitment