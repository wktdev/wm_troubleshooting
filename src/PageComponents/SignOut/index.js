import firebase from 'firebase/app';
import React, {Component} from "react";


function SignOut(){

	
	function signOut(){
				firebase.auth().signOut();
		window.location = "/"
	}


		return(
           <div onClick = {signOut}> SignOut </div>
		)
	}


export default SignOut
