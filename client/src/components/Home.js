import React, { useContext } from 'react';
import logo from '../media/MYtineraryLogo.png'
import { CitiesContext } from '../contexts/CitiesContext';

const Home = () => {

    const {cities} = useContext(CitiesContext)

    const sample = cities.slice(0,4);



    let show = sample.length ? sample.map( city => {
        return (

            <div key={city._id} className='city-card'>
                <img src={city.image} alt='' />
                <div className = 'city-content'>
                    <h4>{city.name}</h4>
                    <p>{city.country}</p>
                </div>
            </div>

        )
    }) : (
        <div>No cities to show yet.</div>
    );

    return (
        <div>
            <h2> Welcome to Mytinerary</h2>
            <img style={{maxWidth:'300px', heigth:'auto', margin: '30px 20px'}}src={logo} alt='' />
            <div className="reg-but" style={{margin: '0 auto'}}><a href='/register'><p>Sign Up!</p></a></div>
            <div className="list">
              {show}
            </div>
        </div>
     );
}

export default Home;
