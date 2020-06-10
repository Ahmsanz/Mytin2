import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios'
import {UserContext} from '../contexts/UserContext';
import {FaHeart} from 'react-icons/fa'
import {FaStar} from 'react-icons/fa'

const SingleItinerary = (props) => {

  const {users} = useContext(UserContext);

  const [itin, setItin] = useState("");
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [plans, setPlans] = useState([]);
  const [nest, setNest] = useState("");
  
  const id = props.match.params.id.split('&')[0];
  const loggedUser = users ? users.filter( user => user.mail === localStorage.mail) : undefined;
  const favs = loggedUser[0] ? loggedUser[0].favourites : undefined;
    
  

  useEffect( () => {
    const getItin = async (id) => {
      await axios.get(`/api/itineraries/itins/${id}`)
        .then( res => {setItin(res.data); setNest(res.data[0].nest);} )
        .catch( err => console.log('something went wrong', err))
    };
    getItin(id);
  }, [id])

  useEffect( () => {
    const getComments = async (id) => {
      await axios.get(`/api/itineraries/comments/${id}`)
      .then( res => {setCommentsList(res.data)})
      .catch( err => console.log(err))
    }
    getComments(id)}, [id])

  useEffect( () => {
    if (favs && favs.includes(id)) { setIsFav(true)}
  }, [favs,id])

  useEffect( () => {
    const getPlans = async (_nest) => {      
      await axios.get(`/api/plans/itinerary/${_nest}`)
      .then( res => {console.log(res);setPlans(res.data)})
      .catch( err => console.log('problems with the plans', err))
    };
    
    if (nest) {
      getPlans(nest);
    }    
  }, [nest])

  const handleComment = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loggedUser) {
      
        let date = new Date().toDateString()
        let body = {
          userId: loggedUser[0]._id,
          comment,
          itinId: id,
          userName: loggedUser[0].first_name,
          userPic: loggedUser[0].picture,
          date
        }        
        setCommentsList([...commentsList, body]);
        axios(`/api/itineraries/comment`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          data: body
        })
        .then( res => {console.log(res.status);  })        
        .catch( err => console.log('we did not get that comment', err))        
    }    
    setComment("");
  }


  const addFav = () => {
    let userId = loggedUser[0] ? loggedUser[0]._id : undefined;
    let token = JSON.stringify(localStorage.token)

    if (id !== undefined) {
      axios(`/api/users/favs/add/${userId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: {id}
      })
      .then( res => {favs.push(id); console.log(res.status)})
      .catch(err => console.log(err))
    }
    setIsFav(true);
  }

  const removeFav = () => {
    let userId = loggedUser[0] ? loggedUser[0]._id : undefined;
    let token = JSON.stringify(localStorage.token)

    axios(`/api/users/favs/remove/${userId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: {id}
    })
    .then( res => {favs.pop(id); console.log(res)})
    .catch(err => console.log(err))

    setIsFav(false)
  }

  let shownItin = itin ? (
    itin.map( itin => {

      let hashtags = itin.hashtags ? (
        // eslint-disable-next-line array-callback-return
        itin.hashtags.split(',').map( (has, i) => {
          if (has.length) {
            return(
              <span style={{margin: '0 10px', fontStyle:'italic'}} key={i}>#{has}</span>
            )
          }
      })
    ) : (<p>No hashtags to show</p>)
      return (
        <div style={{margin: '20px 0', borderRadius: '8px', boxShadow: 'rgb(1, 85, 77) 0 0 10px 0', width: '90%'}} key={itin._id}>
          <div style={{backgroundImage: `url(${itin.image})`, backgroundSize: 'cover', minHeight: '200px', padding: '20px 10px', color: 'whiteSmoke'}}>
          </div>
            <h3>{itin.name}</h3>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', borderBottom: 'solid 1.5px teal', padding: '0 5px 20px 5px'}}>
              <span>{itin.city}</span>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <span>{itin.rating}</span><FaStar style={{color: 'teal', marginLeft: '5px'}}/>
              </div>
            </div>
          <div>

          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '10px 30px'}}>
            <h4>Some practical information:</h4>
            <p>Duration: {itin.duration}h</p>
            <p>Price: {itin.price}€</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h4>Wanna join these plans??</h4>
            { plans.length ? (
              plans.map( plan => {
                return (
                  <div key={plan._id} style = {{marginBottom: '10px', paddingRight: '10px', width: '300px', height: '100px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: '6px', boxShadow: '0 0 6px 0 teal'}}>
                    <img style={{width: '150px', height: '100px', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px'}} src={plan.img} alt='plan' />
                    <span style={{textAlign: 'right'}}>{plan.title}</span>
                  </div>
                )
              })
            ) : (
              <div>there are not plans described for this itinerary yet</div>
            )}
          </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '20px 0'}}>
            { isFav ? (
              <div>
                <FaHeart style={{color: 'teal', cursor: 'pointer'}} onClick={removeFav}/>
              </div>
            ) : (
              <button className='reg-but' onClick={addFav}><FaHeart style={{color: 'white'}}/>Love this!</button>
            )
          }
          </div>
          <div style={{display: 'flex', flexDirection: 'row', margin: '0 0 20px 0', padding: '5px 30px', justifyContent: 'center'}}>
            {hashtags}
          </div>
        </div>
      )
    })
  ) : (<div>Nothing to show yet</div>)



  return (
    <div style={{display: 'flex', flexDirection:'column', width: '100%', alignItems:'center'}}>
      {shownItin}
      <h4>Comments on this:</h4>
      <div style={{maxHeight: '600px', width: '85%', overflowY: 'scroll'}}>
      { commentsList.length ? (
        commentsList.map( com => {
          return (
            <div key={com._id} style={{borderBottom: '1px teal dashed', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '300px', padding: '20px 10px'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <img style={{width: '50px', height: '50px', borderRadius: '8px', marginRight: '20px'}} src={com.userPic} alt="user face"/>
                  <span>{com.userName}</span>
                </div>
                <p style={{wordWrap:'wrap', textAlign:'left'}}>{com.comment}</p>
              </div>
              <p>Commented on: {com.date}</p>
            </div>
          )
        })
      ) : (
        <div>Be the first to leave a comment</div>
      )}
      </div>
      <div style={{display: 'flex', flexDirection:'column', alignItems:'center', border: 'teal 2px solid', borderRadius: '10px', padding: '20px', width: '80%', margin: '20px 0'}}>
        <h3>Leave a comment!</h3>
        <div >
          <img style = {{position: 'relative', width: '50px', height: '50px', borderRadius: '12px', top: '20px', right: '70%'}}src={loggedUser[0] ? loggedUser[0].picture : undefined} alt='user' />
          <span style={{position: 'relative', right:'60%', top: '-8px'}}>{loggedUser[0] ? loggedUser[0].first_name : 'John Doe'}</span>
        </div>
        <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%'}}onSubmit={handleSubmit}>
          <textarea style={{width: '100%', minHeight: '100px', padding: '30px 20px 20px 20px'}} wrap='soft' type='text' onChange={handleComment} value={comment}/>
          <button className='reg-but' type='submit'>Comment</button>
        </form>
      </div>
    </div>
  )
}

export default SingleItinerary;
