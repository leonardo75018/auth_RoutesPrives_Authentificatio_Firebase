import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login';
import Navbar from './components/Navbar';
import Admin from './components/Admin';

import { auth } from "./firebase"


function App() {

  const [firebaseUser, setFirebaseUser] = useState(false)

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }

    })
  }, [])




  return firebaseUser !== false ? (
    <Router>
      <div className="container">
        <Navbar />
        <Switch>
          <Route path="/" exact>Home</Route>
          <Route path="/login">  <Login />  </Route>
          <Route path="/admin"> <Admin /> </Route>
        </Switch>
      </div>
    </Router>

  ) : (
      <p>Loading.......</p>
    )
}
export default App;
