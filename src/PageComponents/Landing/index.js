import * as React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dashboard from "../../PageComponents/Dashboard";
import "../../PageComponents/fonts/index.css";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },


    interactionContainer: {
      position:"relative",
      top:"200px",
      width:"400px",
      margin:"0 auto"
    },



    tagline:{
      fontSize:"17px",
      color:"grey",
      position:"relative",
      textAlign:"center",
      width:"100%"

    },

    signInSignUp:{
      position:"relative",
      fontSize:"20px",
      textAlign:"center",
      color:"grey",
      '&:hover': {
       background: "#ffeed9",
       borderRadius:"50%",
         transition: "0.3s"
     },

       '&:active': {
       background: "#92da8959",
       borderRadius:"50%",
         transition: "0.3s"
     },
   
    },

    customAnchor:{
            "textDecoration": "none"
    }



});



function Landing(props){

  const { classes } = props;
  return (
        <div className={classes.root}>
          <Grid container spacing={12}>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12} sm={4}>
            </Grid>
            <Grid item xs={12} sm={4}>
                <div className={classes.interactionContainer}>
                    <h1 className="logoFontContainer">
                        Workflow Magic
                    </h1>
                    <h2 className={classes.tagline}>The simple way to organize your online gigs</h2>
                    <a className={classes.customAnchor}href="sign-in"><h3 className={classes.signInSignUp}>SignIn / SignUp</h3></a>
                    <p className={classes.signInSignUp}>NO?</p>
                    <a className={classes.customAnchor}href=""><h3 className={classes.signInSignUp}>THEN GET STARTED NOW!</h3></a>

  
                   
              </div>

            </Grid>
        </Grid>
    </div>
  )
}







Landing.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Landing);