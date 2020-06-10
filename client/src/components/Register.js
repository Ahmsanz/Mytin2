import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';

const Register = () => {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail, setMail] = useState("");
    const [picture, setPicture] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (e) => {
        e.preventDefault();
        setName(e.target.value);        
    }

    const handleLastNameChange = (e) => {
        e.preventDefault();
        setLastName(e.target.value);        
    }

    const handleMailChange = (e) => {
        e.preventDefault();
        setMail(e.target.value);        
    }

    const handlePictureChange = (e) => {
        e.preventDefault();
        setPicture(e.target.value);        
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);        
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        let user = {
            first_name: name,
            last_name: lastName,
            picture: picture,
            mail: mail,
            password: password
        }
        console.log(user);
        Axios.post(`/api/users/register`, {data: user, headers: {'Content-Type': 'application/json'}})
        .then( res => console.log(res, 'User correctly registered'))
        .catch( err => console.log(err))

        setName("");
        setLastName("");
        setMail("");
        setPassword("");
        setPicture("");
    }


    return ( 
        <div className="list">
            <form className="reg-form"onSubmit={handleSubmit}>
                <input className = "form-field" type="text" placeholder="name" value={name} onChange={handleNameChange}/>
                <input className = "form-field" type="text" placeholder="last name" value={lastName} onChange={handleLastNameChange}/>
                <input className = "form-field" type="text" placeholder="mail" value={mail} onChange={handleMailChange}/>
                <input className = "form-field" type="text" placeholder="pic" value={picture} onChange={handlePictureChange}/>
                <input className = "form-field" type="password" placeholder="password" value={password} onChange={handlePasswordChange}/>
                <button className="submit-but">Just say yes!</button>
            </form>
        </div>
     );
}
 
export default Register;