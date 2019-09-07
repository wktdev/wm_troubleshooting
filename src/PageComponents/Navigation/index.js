import React, {Component, useContext} from 'react';
import { Link} from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Grid from '@material-ui/core/Grid';
import {signOut} from '../../services/authentication';
import {Consumer,Context} from '../../PageComponents/Context';

const styles = theme => ({
    root: {
        flexGrow: 1,

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    },

    grow: {
      flexGrow: 1,
    },

    menuButton: {
	    marginLeft: -12,
	    marginRight: 20,
  },
});





function NavigationContent(props){

	const userData = useContext(Context)


	function userSignOut(){
		console.log("sign out")
		signOut();
		window.location.href = "/";
	}

	function redirectToClientsList(url){
		window.location.href = url;
	}

    function redirectToCalendar(){
		window.location.href = "/calendar";
	}

    const { classes } = props;
    let clientsListUrl = "/dashboard/" + userData.state.userID
    let signOutUser=  userData.state.authenticated ? <span onClick ={()=>userSignOut()}>Sign Out</span> : " ";
    let companiesLink =  userData.state.authenticated ? <span onClick ={()=>redirectToClientsList(clientsListUrl)}>My Clients</span> : " ";
    let calendar =  userData.state.authenticated ? <span onClick ={redirectToCalendar}>Calendar</span> : " ";

    
	

           
	  
    return(
		

	    <div className={classes.root} >
	      <AppBar position="static" style={props.style}>
	        <Toolbar>
	             <Button color="inherit">    {calendar}</Button>  
	           <Button color="inherit">    {companiesLink}</Button>
	          <Button color="inherit">{signOutUser}</Button>
	        </Toolbar>
	      </AppBar>
	    </div>
				            
	);
}


function Navigation(props, classes){             

	const userData = useContext(Context);          
	if(userData.state.authenticated){                  // If user is logged in then show navigation bar

	    return(

		  <NavigationContent classes={classes} />

		)

	}else{                                             // Otherwise...do not show navigation bar

		return(<div> </div>)
	}
}



Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);



