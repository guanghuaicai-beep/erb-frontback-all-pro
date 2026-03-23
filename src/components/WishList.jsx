import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/wishlist.css";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]); 
  const [compareData, setCompareData] = useState([]); 
  const [isCompareShown, setIsCompareShown] = useState(false); // 控制对比显示/收起状态

  // 取得 wishlist (from DB)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ Please login first");
      setLoading(false);
      return;
    }

    axios.get("http://localhost:8081/wishlist", {
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

  // 选中数变化时，自动重置对比状态
  useEffect(() => {
    if (selectedCourses.length < 2) {
      setCompareData([]);
      setIsCompareShown(false);
    }
  }, [selectedCourses]);

  // remove wishlist item
  const handleRemove = (courseId) => {
    const token = localStorage.getItem("token");
    axios.delete(`http://localhost:8081/wishlist/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setMessage("✅ Course removed from wishlist");
        setWishlist(prev => prev.filter(item => item.course.id !== courseId));
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(err => {
        console.error("Remove error:", err);
        setMessage("❌ Failed to remove course");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  // 勾選 compare checkbox
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

  // ✅ 核心修改：切换对比显示/收起（复用原按钮）
  const toggleCompare = () => {
    if (isCompareShown) {
      // 收起对比：清空数据 + 标记为隐藏
      setCompareData([]);
      setIsCompareShown(false);
    } else {
      // 显示对比：调用API + 标记为显示
      const token = localStorage.getItem("token");
      axios.get(`http://localhost:8081/wishlist/compare?courseId1=${selectedCourses[0]}&courseId2=${selectedCourses[1]}`, {
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
      <h2><i className="fa-solid fa-heart"></i>My Favourite<i className="fa-solid fa-heart"></i></h2>

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
                <th>ID</th>
                <th>Course Name</th>
                <th>Action</th>
                <th>Compare</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.course.courseName}</td>
                  <td>
                    <button className="btn-remove" onClick={() => handleRemove(item.course.id)}>Remove</button>
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

          {/* ✅ 复用原按钮：根据状态切换文字 + 实现显示/收起 */}
          {selectedCourses.length === 2 && (
            <button className="btn-compare" onClick={toggleCompare}>
              {isCompareShown ? "Hide Comparison" : "Compare Selected Courses"}
            </button>
          )}

          {/* ✅ 对比内容：仅选中2个课程 + 显示状态为true + 有数据时才显示 */}
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