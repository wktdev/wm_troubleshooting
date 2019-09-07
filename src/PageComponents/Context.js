import React, {createContext, useState, useEffect}from 'react';
import firebase from '../services/firebase'
import { getUser } from '../services/authentication';

let Context = createContext();

function Provider(props){

   const initialState = {
        userID: false,
        user:undefined,
        loading: true,
        authenticated:false
    }

    const [state,updateState] = useState(initialState)

    async function getUserInfo(){
       let user = await getUser();
       return user

    }

    async function fetchUserData(){
  
        try {
          let user = await getUserInfo();


          updateState({
            userID: user.uid,
            user:user,
            loading: false,
            authenticated:true
          })
       } catch(error) {
           console.log(error);
            updateState(({
               loading: false,
               authenticated: false
           }))
       }
    }

   useEffect(() => {
      fetchUserData();
    }, []);



    
  return(

    <Context.Provider value={{
        state:state
    }}>
  
      {props.children}
    </Context.Provider>

  )
    
}


const Consumer = Context.Consumer;
export {Provider, Consumer, Context}