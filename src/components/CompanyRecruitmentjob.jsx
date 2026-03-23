import React from 'react'

const CompanyRecruitmentjob = ({workjob,depaetment,position,workingmode,monsalary,jobrequeirment1,jobrequeirment2,jobrequeirment3}) => {
    return (
        <div className='bg'>
            <h3>{workjob}</h3>
            <h4>{depaetment}</h4>
            <p><i className="fa-solid fa-location-dot"></i>{position}</p>
            <p className='workingmode'>{workingmode}</p>
            <p className='monsalar'>{monsalary}</p>
            <div className='requirement'>
                <p>Job Requirements</p>
                <ul>
                    <li><i className="fa-solid fa-check"></i>{jobrequeirment1}</li>
                    <li><i className="fa-solid fa-check"></i>{jobrequeirment2}</li>
                    <li><i className="fa-solid fa-check"></i>{jobrequeirment3}</li>
                </ul>
            </div>
        </div>
    )
}

export default CompanyRecruitmentjob