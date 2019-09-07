import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../PageComponents/Context';
import Loader from '../PageComponents/Loader';



const ProtectedRoute = ({ component: Component, ...rest }) => {

    return (
        <Consumer>
            {(context)=>{
    


                 if (context.state.loading) {
                     return   <Loader /> 
                 }

                 if(context.state.authenticated){
                    return(
                        <Route {...rest} render={renderProps => {

                           return (<Component {...renderProps} />)
                        }}/>
                    )  
                  }else{
                    return <Redirect to="/"/>
                  }
                }}

        </Consumer>
    )
};

export default ProtectedRoute;