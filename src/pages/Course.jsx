import React,{useState} from 'react'
import '../css/course.css'
import { courseList } from '../data/courseDet'
import { Link } from 'react-router-dom'
const Course = () => {
    const [notification, setNotification] = useState("");
    const [selectedCategory,setSelectedCategory] = useState("all courses");
    const [courses, setCourses] = useState([]);


    const filterredCourses = courseList.filter(course=>{
        return selectedCategory === 'all courses' ? true : course.coursecategory === selectedCategory 
    })

    const allCategory = [
        'all courses',
        ...new Set(courseList.map(course=>course.coursecategory))
    ]

    const addToCart = async (courseId) => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("❌ Please sign in before adding to cart");
        return;
        }

        try {
        await axios.post(
            `http://localhost:8081/cart/add/${courseId}?quantity=1`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("✅ Course has been added in your cart");
        setCartCount(prev => prev + 1);
        setTimeout(() => setNotification(""), 5000);

        } catch (err) {
        alert(`❌ Error: ${err.response?.data || "Cannot add course"}`);
        }
    };
    return (
        <>
        <div className="cyetitle">
            <h1>Explore Courses</h1>
            <p>Choose the Perfect Course for Your Career Growth Journey</p>
        </div>
        <div className='allcourse'>
            <h2>Category:</h2>
            <div className='allcoursebutton'>
                <ul>
                    {allCategory.map(category=>(
                        <li key={category}>
                            <button onClick={()=>setSelectedCategory(category)}
                                style={{
                                background: selectedCategory === category 
                                    ? 'var(--clr-primary-6)'  // 选中态：深蓝色
                                    : 'var(--clr-primary-2)', // 未选中：默认浅蓝
                                color: selectedCategory === category 
                                    ? 'var(--clr-white)'      // 选中态：白色文字
                                    : 'var(--clr-primary-9)', // 未选中：深蓝文字
                                border: selectedCategory === category
                                    ? '1px solid var(--clr-primary-8)' // 选中态：深边框
                                    : '1px solid var(--clr-primary-10)', // 未选中：默认边框
                                transition: 'all 0.3s ease' // 平滑过渡
                            }}>{category}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="allcoursedetail"> 
                {filterredCourses.map((course)=>(
                    <div className="bg" key={course.id}>
                        <div className="img-container">
                            <img src={course.courseimglink} alt={course.coursename} />
                        </div>
                        <div className="coudetail">
                            <h3>{course.coursecategory}</h3>
                            <h2>{course.coursename}</h2>
                            {/* <p>{course.teacher.name}</p>
                            <div className="level">
                                <p>{course.courselevel}</p>
                                <p>{course.coursemaxpeople}</p>
                            </div> */}
                        </div>
                        <div className="cost">
                            <h5>{course.coursecost}</h5>
                            <Link to={`/course/${course.slug}`}>Check details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        </>
    )
}

export default Course