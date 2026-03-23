import React from 'react'
import { courseList } from '../data/courseDet'
const Aboutstudentreview = () => {

    const allStudendetail = courseList.flatMap(course=>
        course.reviews.map(review=>({
            review,
            courseName: course.coursename
        }))
    )
    const ReviewCare = ({item})=>{
        return(
            <div className='bg'>
                <div className='icons'>
                    {Array.from({ length: item.review.star }).map((_, i) => (
                        <i key={i} className="fa-solid fa-star"></i>
                    ))}
                </div>
                <p className='review'>{item.review.content}</p>
                <p className='course'>{item.courseName}</p>
                <div className='stuname'>
                    <h6>{item.review.name}</h6>
                    <p>{item.review.time}</p>
                </div>
            </div>
        )
    }
    return (
        <div className="student" id="sutdentdetail">
            <h2>Student Reviews</h2>
            <p>Scroll to learn more about our student reviews</p>
            <div className='stu'>
                {allStudendetail.map((item,index)=>(
                    <ReviewCare key={index} item={item} />
                ))}
            </div>
        </div>
    )
}

export default Aboutstudentreview