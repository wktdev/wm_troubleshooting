import React, {useState, Component, useContext,useEffect } from "react";
import { signInWithEmailAndPassword } from '../../services/authentication';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import {Context} from '../../PageComponents/Context';



const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    signInContainer:{
      position:"relative",
      top:"320px"
    }
});






function SignIn(props){


    const userData = useContext(Context);
    console.log(userData);

    //_________________________________BEGIN Handle email and password input cache
    
    const [validationMessage, setValidationMessageState] = useState('');

    const [formState,setFormValues] = useState({
          email:"",
          password:""
    });

    
    

    function handleChange (e){
       setFormValues({
        ...formState,
        [e.target.name]: e.target.value
       });
    }


    //_________________________________END Handle email and password input cache

    async function signIn(email, password) {

          try {

            let result = await signInWithEmailAndPassword(email, password);
            console.log(result)
            window.location.href = "/dashboard/" + result.user.uid;

          } catch (err) {

            console.log(err.message);
            setValidationMessageState(`${err.message}`)
          }

      }


    function submitCredentials(event){
        event.preventDefault();
        signIn(formState.email, formState.password);

    }




  //____________________________________________BEGIN DOM
    
    const { classes } = props;

      return (

        <div className={classes.root}>
         <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper>
                
          </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
          </Grid>
          <Grid item xs={12} sm={4}>


          <div className = {classes.signInContainer}> 
          <Paper className={classes.paper}>
          <form> 


          <TextField
            id="outlined-name"
            label="NAME"
            className={classes.textField}
             value={formState.email} 
            onChange = {(event)=>handleChange(event)}
            margin="normal"
            variant="outlined"
            type="text"
             name = "email"
               InputLabelProps={{
               shrink: true,
            }}
          />


            <br/>
         
          <TextField
            id="outlined-password"
            label="PASSWORD"
            className={classes.textField}
            value={formState.password}
            onChange = {(event)=>handleChange(event)}
            margin="normal"
            variant="outlined"
            type="password"
             name = "password"
             InputLabelProps={{
               shrink: true,
             }}
          />


            <br/>
         
            <Button variant="contained" type="submit" color="primary" className={classes.button} onClick={(e)=>submitCredentials(e)}>SUBMIT</Button>


          </form>
    
          {validationMessage}
         

          </Paper>
          </div>
          </Grid>
       
          </Grid>
         </div>


             

        );
  //______________________________________________END DOM

    
}



SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);