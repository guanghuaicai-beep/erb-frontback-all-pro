import React from 'react'

const ContactPosition = ({icon,topic,detail,mapurl}) => {
    return(
        <div className="position location">
            <div className="bg">
                <div className="icon">
                    <i className={icon}></i>
                </div>
                <div className="content">
                    <h2>{topic}</h2>
                    <p>{detail}</p>
                </div>
            </div>
            {mapurl && (
                <div className="img-container">
                <iframe src={mapurl} 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade" ></iframe>
                </div> 
            )}
        </div>
    )
    
}

export default ContactPosition