import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import CitiesContextProvider from './contexts/CitiesContext';
import UserContextProvider from './contexts/UserContext'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AuthContextProvider from './contexts/AuthContext';
import Cities from './components/Cities';
import SingleCity from './components/SingleCity';
import SingleItinerary from './components/SingleItin';
import Profile from './components/Profile';
import Contact from './components/Contact';
import Itineraries from './components/Itineraries';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <UserContextProvider>
        <AuthContextProvider>
        <Navbar />
        <Switch>
          <CitiesContextProvider>
            <Route exact path="/" component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route exact path='/cities' component={Cities} />
            <Route path='/cities/:id' component={SingleCity} />
            <Route path='/itineraries/:id' component={SingleItinerary} />
            <Route path='/profile' component={Profile} />
            <Route exact path='/contact' component={Contact}/>
            <Route exact path= '/itineraries' component= {Itineraries}/>
          </CitiesContextProvider>
        </Switch>
        </AuthContextProvider>
      </UserContextProvider>
    </div>
    </BrowserRouter>
  );
}

export default App;
