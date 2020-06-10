import React, { useState, useEffect, useContext } from 'react';
import {CitiesContext} from '../contexts/CitiesContext';
import axios from 'axios';

const SingleCity = (props) => {

    const {cities} = useContext(CitiesContext);

    const [itineraries, setItineraries] = useState([])

    const [plans, setPlans] = useState([]);

    const id = props.match.params.id.split('&')[0]

    const url = new URLSearchParams(window.location.href);

    const city = cities.filter( city => city._id === id);

    const name = url.get('name');

    useEffect( () => {
        const getItins =  async () => {

            await axios.get(`/api/itineraries/city/${name}`)
            .then( res =>  setItineraries(res.data))
            .catch( err => console.log('oops, not hearing that city oright', err))

        }
        getItins();
    }, [])

    useEffect( () => {
        const getPlansByCity = async () => {
            await axios.get(`/api/plans/city/${name}`)
            .then( res => setPlans(res.data))
            .catch( err => console.log('something wrong with the plans in this city', err))
        }
        getPlansByCity();
    }, [])
    

    const itins = itineraries.length ? itineraries.map( itin => {
        return (
            
                <a href={"../itineraries/" + itin._id} style={{textDecoration: 'none'}}>
                    <div key={itin._id} className='city-card' >
                        <img src={itin.image} alt='' />
                        <div className = 'city-content'>
                            <h4>{itin.name}</h4>
                        </div>
                    </div>
                </a>
            
        )
    }) : ( <div style={{marginBottom: '20px'}}>No itineraries defined for this city</div>)

    const renderedCity = city ? ( city.map( city => {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                <div style={{margin: '20px 0', borderRadius: '8px', boxShadow: 'rgb(1, 85, 77) 0 0 10px 0', width: '90%', maxWidth: '450px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img style={{width: '100%', height: 'auto'}} src={city.image} alt="" />
                    <h3>{city.name}</h3>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', borderBottom: 'solid 1.5px teal', padding: '0 5px 20px 5px'}}>
                        <span>{city.country}</span>                    
                    </div>
                    <div>
                        <h4>Check these itineraries</h4>
                    {itins}
                    </div>
                </div>
                <div>
                    {plans.length ? (
                        plans.map( plan => {
                            return (
                                <div key={plan._id} style = {{marginBottom: '10px', paddingRight: '10px', width: '300px', height: '100px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: '6px', boxShadow: '0 0 6px 0 teal'}}>
                                    <img style={{width: '150px', height: '100px', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px'}} src={plan.img} alt='plan' />
                                    <span style={{textAlign: 'right'}}>{plan.title}</span>
                                </div>
                            )
                        })
                    ) : (
                        <div>No plans in this city</div>
                    )}
                </div>
            </div>
        )
    })
    ) : (
        <div>We don't know what city you want to go to.</div>
    )

    return (
        <div>
            {renderedCity}
        </div>
     );
}

export default SingleCity;
