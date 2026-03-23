import React,{useState}from 'react'

const Aboutteacherdetail = ({imglink,teaname,teaposition,experience,icon,moredetail}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="bg">
            <div className='top-row'>
                <div className="img-container">
                    <img src={imglink} alt="" />
                </div>
                <div className="teadetail">
                    <h2>{teaname}</h2>
                    <h3>{teaposition}</h3>
                    <h4>{experience}</h4>

                    <a className="more-btn" onClick={()=>setIsOpen(!isOpen)}>{isOpen ? "隐藏详情" : "了解更多"}
                        <i className={`${icon} arrow-icon ${isOpen ? "rotate" : ""}`}></i></a>
                </div>
            </div>
            <div className={`tea-anwser ${isOpen ? 'show' : ''}`}>
                <p>{moredetail}</p>
            </div>
        </div>
    )
}

export default Aboutteacherdetail