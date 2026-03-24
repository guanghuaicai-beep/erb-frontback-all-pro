import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/wishlist.css";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]); 
  const [compareData, setCompareData] = useState([]); 
  const [isCompareShown, setIsCompareShown] = useState(false);

  // 取得願望清單
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ Please login first");
      setLoading(false);
      return;
    }

    axios.get("https://channing-dichasial-marissa.ngrok-free.dev/wishlist", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setWishlist(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Wishlist error:", err);
        setMessage("❌ Failed to load wishlist");
        setLoading(false);
      });
  }, []);

  // 選擇變更時重置對比
  useEffect(() => {
    if (selectedCourses.length < 2) {
      setCompareData([]);
      setIsCompareShown(false);
    }
  }, [selectedCourses]);

  // ✅ 刪除功能（完全對齊後端接口）
  const handleRemove = (courseId) => {
    const token = localStorage.getItem("token");
    axios.delete(`https://channing-dichasial-marissa.ngrok-free.dev/wishlist/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setMessage("✅ Course removed from wishlist");
        setWishlist(prev => prev.filter(item => item.course.id !== courseId));
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(err => {
        console.error("Remove error:", err.response?.data || err);
        setMessage("❌ Failed to remove course");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  // 勾選對比課程
  const handleCompareSelect = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else {
      if (selectedCourses.length >= 2) {
        setMessage("❌ You can only compare 2 courses");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setSelectedCourses([...selectedCourses, courseId]);
      }
    }
  };

  // 顯示 / 隱藏對比
  const toggleCompare = () => {
    if (isCompareShown) {
      setCompareData([]);
      setIsCompareShown(false);
    } else {
      const token = localStorage.getItem("token");
      axios.get(`https://channing-dichasial-marissa.ngrok-free.dev/wishlist/compare?courseId1=${selectedCourses[0]}&courseId2=${selectedCourses[1]}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setCompareData(res.data);
          setIsCompareShown(true);
        })
        .catch(err => {
          setMessage("❌ Failed to compare courses");
          setTimeout(() => setMessage(""), 3000);
        });
    }
  };

  return (
    <div className="wishlist-container">
      <h2><i className="fa-solid fa-heart"></i> My Favourite <i className="fa-solid fa-heart"></i></h2>

      {message && (
        <div className={`notification ${message.startsWith("❌") ? "error" : "success"}`}>
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : wishlist.length === 0 ? (
        <p className="empty-msg">Your wishlist is empty</p>
      ) : (
        <>
          <table className="wishlist-table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Action</th>
                <th>Compare</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map(item => (
                <tr key={item.id}>
                  <td>{item.course.id}</td>
                  <td>{item.course.courseName}</td>
                  <td>
                    {/* ✅ 正確傳入 course.id */}
                    <button className="btn-remove" onClick={() => handleRemove(item.course.id)}>
                      Remove
                    </button>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(item.course.id)}
                      onChange={() => handleCompareSelect(item.course.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedCourses.length === 2 && (
            <button className="btn-compare" onClick={toggleCompare}>
              {isCompareShown ? "Hide Comparison" : "Compare Selected Courses"}
            </button>
          )}

          {selectedCourses.length === 2 && isCompareShown && compareData.length === 2 && (
            <div className="compare-container">
              <h3 className="compare-heading">📊 Course Comparison</h3>
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>Attribute</th>
                    <th>{compareData[0].courseName}</th>
                    <th>{compareData[1].courseName}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Category</td><td>{compareData[0].categoryName}</td><td>{compareData[1].categoryName}</td></tr>
                  <tr><td>Duration</td><td>{compareData[0].duration}</td><td>{compareData[1].duration}</td></tr>
                  <tr><td>Mode</td><td>{compareData[0].studyMode}</td><td>{compareData[1].studyMode}</td></tr>
                  <tr><td>Level</td><td>{compareData[0].level}</td><td>{compareData[1].level}</td></tr>
                  <tr><td>Cost</td><td>{compareData[0].price}</td><td>{compareData[1].price}</td></tr>
                  <tr><td>Start Date</td><td>{compareData[0].startDate}</td><td>{compareData[1].startDate}</td></tr>
                  <tr><td>Start Time</td><td>{compareData[0].time}</td><td>{compareData[1].time}</td></tr>
                  <tr><td>Capacity</td><td>{compareData[0].capacity}</td><td>{compareData[1].capacity}</td></tr>
                  <tr><td>Status</td><td>{compareData[0].status}</td><td>{compareData[1].status}</td></tr>
                  <tr><td>Description</td><td>{compareData[0].description}</td><td>{compareData[1].description}</td></tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WishList;