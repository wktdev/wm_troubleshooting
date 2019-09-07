
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
     progressContainer:{
     	margin: "0 auto",
     	width:100,
     	top:200,
     	position:"relative"
   }
});


function Loader(props){

	

		const {classes} = props

		return(
    
          <div className={classes.root}>
				              
            <Grid container spacing={24} className = "nav-container">
       
            <Grid item xs={4}>
	         

            </Grid>
                <Grid item xs={4}>
                   <div className = {classes.progressContainer}>  
                   <CircularProgress/> 
                   </div>


            </Grid>
                <Grid item xs={4}>

            </Grid>
     
            </Grid>
					
		    </div>
              
		)
	
}




Loader.propTypes = {
	classes:PropTypes.object.isRequired
}

export default withStyles(styles)(Loader)
