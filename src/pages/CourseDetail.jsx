import React, { useState } from 'react'
import {courseList} from '../data/courseDet';
import { useParams, Link } from 'react-router-dom';
import '../css/coursedetail.css'
import axios from 'axios';
import CourseSyllabus from '../pdf/CourseSyllabus.pdf'

const CourseDetail = ({setCartCount,setHeartCount}) => {
    const { slug } = useParams();
    const currentCourse = courseList.find(item=>item.slug===slug);
    const [notification, setNotification] = useState("");

    if(!currentCourse){
        return(
            <div>
                <h1>Sorry! The course you searched does not exist.</h1>
                <Link to="/course">Back to Course List</Link>
            </div>
        );
    }

    // add to cart
    const handleAddToCart = () => {
        const token = localStorage.getItem("token");
        if (!token) {
        alert("❌ Please Login");
        setTimeout(() => setNotification(""), 5000);
        return;
        }

        axios.post("https://channing-dichasial-marissa.ngrok-free.dev/cart/add",
        { courseId: currentCourse.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(res => {
            alert(`✅ ${res.data.courseName} has been added to your cart`);
            setCartCount(prev=>prev+1);
            setTimeout(() => setNotification(""), 5000);
        })
        .catch(err => {
            alert(`❌ Failed to add to cart: ${err.response?.data?.message || err.message}`);
            setTimeout(() => setNotification(""), 5000);
        });
    };

    // add to wishlist
    const handleAddToFavorite = () => {
        console.log("🔥 currentCourse:", currentCourse);
        console.log("🔥 courseId:", currentCourse.id);
        const token = localStorage.getItem("token");
        if (!token) {
        alert("❌ Please Login");
        setTimeout(() => setNotification(""), 5000);
        return;
        }

        axios.post("https://channing-dichasial-marissa.ngrok-free.dev/wishlist/add",
        { courseId: currentCourse.id },
        { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(res => {
            alert(`✅ ${res.data.courseName} has been added to favorites`);
            setHeartCount(prev=>prev+1)
            setTimeout(() => setNotification(""), 5000);
        })
        .catch(err => {
            if (err.response?.status === 400) {
            alert("❌ Course already in favorites");
            } else {
                alert("✅ Course already added to My Favourite")
            // alert(`❌ Failed to add to favourites: ${err.response?.data?.message || err.message}`);
            }
            setTimeout(() => setNotification(""), 5000);
        });
    };
    return (
    <>
        {/* Notification 提示 */}
        {notification && (
            <div className={`notification ${notification.startsWith("❌") ? "error" : "success"}`}>
            {notification}
            </div>
        )}
        <div className="coursetop">
            <div className="courseleft">
                <h3>{currentCourse.coursecategory}</h3>
                <h1>{currentCourse.coursename}</h1>
                <p>{currentCourse.coursedetail}</p>

                <ul className="iconps">
                    <li><i className="fa-solid fa-clock-rotate-left"></i>{currentCourse.courseduration}</li>
                    <li><i className="fa-solid fa-chalkboard-user"></i>{currentCourse.coursemodel}</li>
                    <li><i className="fa-solid fa-signal"></i>{currentCourse.courselevel}</li>
                </ul>
            </div>
            <div className="courseright">
                <h1>{currentCourse.coursecost}</h1>
                <div className="btn">
                    <button onClick={handleAddToCart} className="btn1" ><i className="fa-regular fa-heart"></i>Add to Cart</button>
                    <button onClick={handleAddToFavorite} className="btn2"><i className="fa-regular fa-heart"></i>My Favourite</button>
                </div>
                <div className="coursefooter">
                    <div>
                        <p>Course Start Date</p>
                        <p>{currentCourse.coursestartdate}</p>
                    </div>
                    <div>
                        <p>Time</p>
                        <p>{currentCourse.coursestartclasstime}</p>
                    </div>
                    <div>
                        <p>Capacity</p>
                        <p>{currentCourse.coursemaxpeople}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="detail">
            <div className="requirement">
                <h2>Requirements</h2>
                <ul>
                    <li><i className="fa-regular fa-heart"></i>{currentCourse.courserequirement1}</li>
                    <li><i className="fa-regular fa-heart"></i>{currentCourse.courserequirement2}</li>
                    <li><i className="fa-regular fa-heart"></i>{currentCourse.courserequirement3}</li>
                </ul>
            </div>
            <div className="teacher2">
                <h2>About Tutor</h2>
                <div className="teatail">
                    <h3>{currentCourse.teacher.name}</h3>
                    <h4>{currentCourse.teacher.position}</h4>
                    <p>{currentCourse.teacher.experience}</p>
                </div>
            </div>
            <div className="studentdetail">
                <h2>Reviews</h2>
                {currentCourse.reviews.map((review,index)=>(
                    <div className="studetail" key={index}>
                        <div className="top">
                            <h4>{review.name}</h4>
                            <div>
                                {Array.from({length:5}).map((_,starIdx)=>
                                    <i key = {starIdx} class = {starIdx<review.star ? "fa-solid fa-star" : "fa-regular fa-star" }>
                                    </i>
                                )}
                            </div>
                        </div>
                        <p>{review.time}</p>
                        <h5>{review.content}</h5>
                    </div>
                ))}
            </div>
            <div className="courselink">
                <i className="fa-regular fa-file-pdf"></i>
                <div className='download'>
                    <a href={currentCourse.coursepdflink || CourseSyllabus}>Course Syllabus</a>
                    <a href={currentCourse.coursepdflink || CourseSyllabus}><i className="fa-solid fa-download"></i></a>
                </div>
            </div>
            <div className='btncompanyrecruitment'>
                <Link to="/companyrecruitment">Relevant Job Openings</Link>
            </div>
        </div>
        </>
    )
}

export default CourseDetail