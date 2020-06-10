import React, {useState} from 'react';
import axios from 'axios';


const Login = () => {

    
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("")        

    
    const handleMailChange = (e) => {
        e.preventDefault();
        setMail(e.target.value);            
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);    
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let body = {
            mail: mail,
            password: password
        }

        await axios({
            method: 'post',
            url: `/api/auth/login/`,
            data: body,
            headers: {
                'Content-Type': 'Application/json'
            }
        })
        .then( res => {
            console.log(res);
            localStorage.clear();
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('mail', res.data.mail)
            setMail("");
            setPassword("");            
        })
        .then( () => setInterval( () => { window.location.href = '/cities'}, 1500))
        .catch( err => console.log(err))


    }


    return ( 
        <div className="list">
            <form className="reg-form"onSubmit={handleSubmit}>
                <input className = "form-field" type="text" placeholder="name" value={mail} onChange={handleMailChange}/>
                <input className = "form-field" type="password" placeholder="password" value={password} onChange={handlePasswordChange}/>
                <button className="submit-but">Log In, yo!</button>
            </form>
        </div>
     );
}
 
export default Login;