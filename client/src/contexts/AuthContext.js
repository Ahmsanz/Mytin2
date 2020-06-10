import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect( () => {
        if (localStorage.token || localStorage.token !== undefined ) setIsLoggedIn(true);
    }, [])

    return ( 
        <AuthContext.Provider value={{isLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;