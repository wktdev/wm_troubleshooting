import React, { Component, useContext, useLayoutEffect } from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import {Context} from './PageComponents/Context';
import {Switch} from 'react-router';
import SignIn from "./PageComponents/SignIn";
import SignOut from "./PageComponents/SignOut";
import SignUp from "./PageComponents/SignUp";
import Landing from './PageComponents/Landing';
import {Provider} from './PageComponents/Context';
import Dashboard from './PageComponents/Dashboard';


import Navigation from "./PageComponents/Navigation";
// import SignIn from './PageComponents/SignIn';
import ProtectedRoute from './PageComponents/ProtectedRoute';

function App(){


let userData = useContext(Context);

useLayoutEffect(()=>{
   console.log(userData)
},[]);
  
    return (
      <div className="App">

      <Provider>
            <Navigation/>
        <BrowserRouter>
        <div>
          <Switch>

            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-out" component={SignOut} />
            <Route path="/sign-up" component={SignUp} />
            <Route exact={true} path="/" component={Landing} />                     
            <ProtectedRoute exact path="/dashboard/:userid" component={Dashboard} /> 

           <Redirect from="/*" to="/" />

          </Switch>
        </div>
        </BrowserRouter>
        </Provider>

      </div>
    );
  
}

export default App;
