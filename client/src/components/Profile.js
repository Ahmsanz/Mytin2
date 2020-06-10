import React, { useContext, useState, useEffect } from 'react';
import {UserContext} from '../contexts/UserContext';
import axios from 'axios';

const Profile = () => {
    const {users} = useContext(UserContext);
    const [itins, setItins ] = useState([]);
    const [comments, setComments] = useState([])
    

    const url = new URLSearchParams(window.location.href);    
    const mail = url.get('user')
    const token = url.get('token')
    if (!localStorage.token && mail ) localStorage.setItem('token', token);
    if (!localStorage.mail && token ) localStorage.setItem('mail', mail)
    
    const user = users.filter( user => user.mail === localStorage.mail || user.mail === mail)

    const userFavs = user[0] !== undefined ? user[0].favourites : undefined;

    useEffect( () => {
      const getItins = async () => {
        await axios.get(`/api/itineraries/`)
        .then( res => {console.log(res); setItins(res.data)})
        .catch( err => console.log(err))
      }
      getItins()
    }, [])

    useEffect( () => {
      const getComments = async (userId) => {
        await axios.get(`/api/users/${userId}/comments/`)
        .then( res => setComments(res.data))
        .catch( err => console.log('no comments', err))
      }

      if (user[0] !== undefined) {
        getComments(user[0]._id)
      }
    }, [user])

    
    const favs = itins && userFavs !== undefined ? itins.filter( itin => userFavs.includes(itin._id)) : undefined
    
    return (
        user ? (user.map( user => {
            return (
                <div className="profile">
                    <div className = "header">
                        <h2>This is your personal profile</h2>
                    </div>
                    <div className ="user-info">
                        <div className="pic-name">
                            <img src={user.picture}></img>
                            <h3>{user.first_name}</h3>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '60px'}}>
                            <p>Complete name: {user.first_name + ' ' + user.last_name}</p>
                            <p>Age: {user.age ? user.age : 'many'} years</p>
                            <p>Email: {user.mail}</p>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                          <h3>These are the itineraries you love:</h3>
                          { favs.length ? ( favs.map( fav => {
                            return(
                              <a href={`../itineraries/${fav._id}`} style={{textDecoration: 'none'}}key={fav._id}>
                              <div  className='city-card'>
                                  <img src={fav.image} />
                                  <div className = 'city-content'>
                                      <h4>{fav.name}</h4>
                                  </div>
                              </div>
                              </a>
                            )
                          })) : (<p>You have no favourites yet. Go find your first!</p>)}
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                          <h3>These are the comments you've made:</h3>
                          { comments.length ? comments.map( com => {
                            return (
                              <div key={com._id} style={{borderBottom: '1px teal dashed', marginBottom: '20px'}}>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '300px', padding: '20px 10px'}}>
                                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <img style={{width: '50px', height: '50px', borderRadius: '8px', marginRight: '20px'}} src={com.userPic}/>
                                    <span>{com.userName}</span>
                                  </div>
                                  <p style={{wordWrap:'wrap', textAlign:'left'}}>{com.comment}</p>
                                </div>
                                <p>Commented on: {com.date}</p>
                              </div>
                          )
                          }) : (<p>You're short on words, I guess.</p>)}
                        </div>
                    </div>
                </div>
            )
        })

        ) : (
            <div><p>Come closer, let me take a look at your face.</p></div>
        )
    )
}

export default Profile;
