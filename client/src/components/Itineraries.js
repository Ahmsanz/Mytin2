import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {FaStar, FaHeart} from 'react-icons/fa';
import {UserContext} from '../contexts/UserContext';


const Itineraries = () => {
    
    const {users} = useContext(UserContext);

    const [itins, setItins] = useState([]);
        
    const loggedUser = users ? users.filter( user => user.mail === localStorage.mail) : undefined;
    
    let favs = loggedUser[0] ? loggedUser[0].favourites : undefined;

    useEffect( () => {
        const getItins = async () => {
            await axios('/api/itineraries/')
            .then( res => setItins(res.data))
            .catch( err => console.log('error with the itins', err))
        };  
        getItins();
    }, [favs, itins])
    

    let showingItins = itins.length ? (
        itins.map( itin => {
            return (
                
                    <div style = {{borderRadius: '10px', boxShadow: '0 0 10px 0 teal', margin: '15px 0'}}>
                        <a style={{textDecoration: 'none', color: 'teal'}} key={itin._id} href={`./itineraries/${itin._id}`}>
                            <div style={{backgroundImage: `url(${itin.image})`, backgroundSize: 'cover', minHeight: '200px', padding: '20px 10px', color: 'whiteSmoke'}}>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: '0 5px 20px 5px', margin: '10px 0'}}>
                                <span>{itin.name}</span>
                                <span>{itin.city}</span>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <span>{itin.rating}</span><FaStar style={{color: 'teal', marginLeft: '5px'}}/>
                                </div>
                            </div> 
                        </a>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '20px 0'}}>
                            { favs && favs.includes(itin._id) ? (
                                <div>
                                    <FaHeart style={{color: 'teal', cursor: 'pointer', marginBottom: '20px'}} onClick={ () => {
                                        let userId = loggedUser[0] ? loggedUser[0]._id : undefined;
                                        let token = JSON.stringify(localStorage.token)
                                        let id = itin._id;
                                    
                                         axios(`/api/users/favs/remove/${userId}`, {
                                          method: 'put',
                                          headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                          },
                                          data: {id}
                                        })
                                        .then( res => {
                                            favs.pop(id);
                                             console.log(res)
                                             console.log('favs remaining', favs);})
                                        .catch(err => console.log(err))
                                    
                                        
                                        
                                    }}/>    
                                </div>
                                ) : (
                                <button className='reg-but' onClick={ () => {
                                    let userId = loggedUser[0] ? loggedUser[0]._id : undefined;
                                    let token = JSON.stringify(localStorage.token) 
                                    let id = itin._id;   
                                    console.log('itinerary fav', itin._id);
                                     axios(`/api/users/favs/add/${userId}`, {
                                    method: 'put',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    },
                                    data: {id}
                                    })
                                    .then( res => {
                                          
                                        console.log(res.status)})
                                    .catch(err => console.log(err)) 
                                    // favs.push(id);
                                    favs.push(id); 
                                        console.log('now favs', favs)
                                       
                                                                  
                                    
                                }}><FaHeart style={{color: 'white'}}/>Like it?</button>
                                )
                            }
                        </div>
                    </div>
            )
        })
        ) : (
        <div>No itineraries to show yet.</div>
    )
    return (
        <div>
            {showingItins}
        </div>
    )
};

export default Itineraries;