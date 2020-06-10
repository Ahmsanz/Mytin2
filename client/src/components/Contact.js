import React, {useState, useContext} from 'react';
import {UserContext} from '../contexts/UserContext';
import axios from 'axios';

const Contact = () => {
    const {users} = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userMail, setUserMail] = useState("");
    const [message, setMessage] = useState("");

    const loggedUser = localStorage.mail ? users.filter( user => user.mail === localStorage.mail) : undefined;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loggedUser) {
            let body = {
                userId: loggedUser[0]._id,
                firstName: loggedUser[0].first_name,
                lastName: loggedUser[0].last_name, 
                userMail: loggedUser[0].mail,
                message, 
                date: new Date().toString
            }

            axios('/api/users/message/send', {
                method: 'post', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                data: body
            })
            .then( res => console.log(res.status))
            .catch( err => console.log('the message was not sent', err))
            setMessage('')
        } else {
            let body = {
                firstName,
                lastName, 
                userMail,
                message, 
                date: new Date().toString
            }

            axios('/api/users/message/send', {
                method: 'post', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                data: body
            })
            .then( res => console.log(res))
            .catch( err => console.log('the message was not sent', err))
            
            setMessage("");
            setUserMail('');
            setFirstName('')
            setLastName('')
        }
        
    }

    const handleName = (e) => {
        e.preventDefault();
        setFirstName(e.target.value)
    }

    const handleLastName = (e) => {
        e.preventDefault();
        setLastName(e.target.value)
    }

    const handleMail = (e) => {
        e.preventDefault();
        setUserMail(e.target.value)
    }

    const handleMessage = (e) => {
        e.preventDefault();
        setMessage(e.target.value);
    }

    let infoMail = <a id='info-mail' href='mailto:info@mytin.com'><p>info@mytin.com</p></a>
    return (
        <div className='list'>
            <h3>Anything on your mind? Reach us and let it out!</h3>
            { loggedUser ? (
                <form className="reg-form"onSubmit={handleSubmit}>
                
                <textarea style={{padding: '10px'}}className = "form-field" type="text" placeholder="Your message" value={message} onChange={handleMessage} wrap='soft wrap'/>
                
                <button className="submit-but">Send</button>
            </form>
            ) : (
                <form className="reg-form"onSubmit={handleSubmit}>
                <input className = "form-field" type="text" placeholder="Your name" value={firstName} onChange={handleName}/>
                <input className='form-field' type='text' placeholder='Your last name' value={lastName} onChange={handleLastName} />
                <input className = "form-field" type="text" placeholder="Your mail" value={userMail} onChange={handleMail}/>
                <textarea style={{padding: '10px'}}className = "form-field" type="text" placeholder="Your message" value={message} onChange={handleMessage} wrap='soft wrap' />
                
                <button className="submit-but">Send</button>
            </form>
            )}
            <span style={{color: 'teal'}}>Otherwise, you can reach us at {infoMail}</span>
            
        </div>
    )
}

export default Contact;
