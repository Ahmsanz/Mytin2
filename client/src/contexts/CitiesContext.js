import React, { createContext, useState, useEffect } from 'react';

import axios from 'axios';

export const CitiesContext = createContext();

const CitiesContextProvider = (props) => {
    const [cities, setCities] = useState([]);

    useEffect( () => {
        getCities()
    }, [])

    const getCities = async () => {
      await axios.get(`/api/cities/`)
      .then( res => {
        setCities(res.data)
      }).catch(err => console.log('oops, something went wrong with those cities', err))
    }

    return (
        <CitiesContext.Provider value={{cities}}>
            {props.children}
        </CitiesContext.Provider>
     );
}

export default CitiesContextProvider;
