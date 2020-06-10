import React, { useState, useEffect, useContext } from 'react';

import {CitiesContext} from '../contexts/CitiesContext'

const Cities = () => {

    const {cities} = useContext(CitiesContext);
    
    let citiesList = cities.length ? cities.map( city => {
        
        return (
            <a href={"/cities/" + city._id + "&name=" + city.name}>
            <div key={city._id} className='city-card'>
                <img src={city.image} />
                <div className = 'city-content'>
                    <h4>{city.name}</h4>
                    <p>{city.country}</p>
                </div>
            </div>
            </a>

        )
    }) : (
        <div>No cities to show yet.</div>
    );

    return (

    <div className="list">
        {citiesList}
    </div>

    );
}

export default Cities;
