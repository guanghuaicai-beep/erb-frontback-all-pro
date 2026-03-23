import React from 'react'

const Aboutvalues = ({icon,title,purpose}) => {
    return (
        <div className="bg">
            <div className="icon">
                <i className={icon}></i>
                <h3>{title}</h3>
            </div>
            <p>{purpose}</p>
        </div>
    )
}

export default Aboutvalues