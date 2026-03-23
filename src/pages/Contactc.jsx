import React from 'react'
import '../css/contact.css'
import ContactPosition from '../components/ContactPosition'
import {contactData} from '../data/dcontact'
const Contactc = () => {
    return (
    <>
    <div className="titletop">
        <h1>Contact Us</h1>
        <p>Have any enquiries? We're happy to hear your comments and suggestions.</p>
    </div>
    <div className="center">
        <div className="left">
            {contactData.map((item)=>(
                <ContactPosition key={item.id}
                icon={item.icon}
                topic={item.topic}
                detail={item.detail}
                mapurl={item.mapurl}
                />
            ))}
        </div>
        <div className="right">
            <h1>Send a message</h1>
            <div className="name">
                <label for="name">Name</label>
                <input type="name" id="name" name="name" placeholder="Enter your name" />
            </div>
            <div className="email">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" />
            </div>
            <div className="message">
                <label for="message">Message</label>
                <textarea id="message" name="message" placeholder="Enter your message"></textarea>
            </div>
            <div className="btn">
                <button>Send</button>
            </div>
        </div>
    </div>
    </>
    )
}

export default Contactc