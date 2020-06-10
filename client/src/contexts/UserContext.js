import React, { useState, useEffect, createContext } from 'react';

import axios from 'axios';

export const UserContext = createContext();


const UserContextProvider = (props) => {
    const [users, setUsers] = useState([]);

    useEffect( () => {
        axios.get(`/api/users/`)
        .then( res => setUsers(res.data))
        .catch( err => console.log('users not coming, sir', err))
    }, [])

    return ( 
        <UserContext.Provider value={{users}}>
            {props.children}
        </UserContext.Provider>
     );
}
 
export default UserContextProvider;