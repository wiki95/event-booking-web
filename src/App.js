import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthPage from './pages/Auth';
import BookingPage from './pages/Booking';
import EventPage from './pages/Event';
import MainNavigation from './components/Navigation';
import AuthContext from './context/auth-context';
import './App.css';

class App extends Component {
  state={
    token: null,
    userId: null
  }
  login=(token, userId, tokenExpiration)=>{
    localStorage.setItem('token',token);
    localStorage.setItem('userId',userId);
    this.setState({token:token,userId:userId})
  }
  logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.setState({token:null,userId:null})
  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
        <AuthContext.Provider value={{token:localStorage.getItem('token'),userId:localStorage.getItem('userId'),login:this.login,logout:this.logout}}>
          <MainNavigation />
            <main className="main-content">
              <Switch>
                {localStorage.getItem('token') && <Redirect from="/" to ="/events" exact />}
                {localStorage.getItem('token') && <Redirect from="/auth" to ="/events" exact />}
                {!localStorage.getItem('token') && <Route path="/auth" component={AuthPage} />}
                <Route path="/events" component={EventPage} />
                {localStorage.getItem('token') && <Route path="/bookings" component={BookingPage} />}
                {!localStorage.getItem('token') && <Redirect to ="/auth" exact />}
              </Switch>
            </main>
        </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
