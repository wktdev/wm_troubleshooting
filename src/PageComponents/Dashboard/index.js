import React, {Component, useContext, useState, useEffect, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';

import firebase from 'firebase/app';
import {Consumer, Context} from '../../PageComponents/Context';
import { instantSearchFilter } from '../../helper_functions';
import "../../PageComponents/fonts/index.css";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },

    logoContainer:{
      position:"relative",
      margin:"0 auto",
      top:"120px"
    },
    container: {
        marginTop:"130px",
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    clientItem:{
      fontSize:"2em",
      display:"inline-block",
      textAlign:"center",
      color:"grey",
       '&:hover': {
       background: "#8a0eff3b",
         transition: "0.4s"
     },
    },

    textField:{
      width:"25em",
    },

    listItem:{
      fontSize:'35px',//Insert your required size
    
    },

    listContainer:{
      position:"relative",
      top:"30px"
    }


});


//____________________________________

function checkForEmptyString(str){
 
     if(!str.trim().length){
        alert("Field cannot be empty")
     }else{
       return str.trim()
     }
}

//___________________________________


function Dashboard(props){

    const [clientNameState,setClientNameState] = useState("");


    


    const {classes} = props;
    const userData = useContext(Context);

    
    const clientsRef = firebase.database().ref('clients');
    const [clientList,setClientListState] = useState([]);   
    const [clientListForRender,setClientListStateForRender] = useState([]);
    const [selectedIndex, updateSelectedIndex] = useState(0);



    useEffect(() => {



      function handleKeyPress(event,arr){
        console.log(arr)
        if(event.key === "ArrowDown"){
          updateSelectedIndex((prev)=>{
              return prev += 1
          });
        }
      }



      clientsRef.on('child_added', snapshot => {
          const client = snapshot.val();
          client.key = snapshot.key;     //     __________________________1. get firebase data


         setClientListState(function(prev){       


            

               setClientListStateForRender(()=>[client,...prev]); //_______2 store data    


              

               return[client,...prev]
          });

       });


document.addEventListener('keydown', handleKeyPress)
    },[]);














    function handleChange(evt){
       console.log(evt.target.value)

        setClientNameState(
           evt.target.value
        );
        console.log("HANDLE CHANGE");
        setClientListStateForRender(
           instantSearchFilter(evt.target.value.trim(),clientList)
        );

    }


    function handleSubmit(event,userID){
      event.preventDefault()
      let result = checkForEmptyString(clientNameState);

      if(result){

        clientsRef.push({
          name: clientNameState,
          user_id:userID
        });

      }
      setClientNameState("")
    }




































    function deleteWorkflow(event,clientObj){
      event.preventDefault();
      clientsRef.child(clientObj.key).remove();   
      let result = clientList.filter((val,index)=>{

        return val.key!== clientObj.key

      });

        setClientListState(function(prev){
        setClientListStateForRender(()=>[...result]);
        return[...result]

      });
    }







      return (
           <div>

             <div className={classes.root}>
                  <Grid container spacing={12}>
                 <div className = {classes.logoContainer}>
                   <h1 className="logoFontContainer">
                        Workflow Magic
                    </h1>
                    </div>
                    <Grid item xs={12} sm={12}>
              <div className={classes.container}>

              <form onSubmit={(event)=>handleSubmit(event,userData.state.userID)}>
                  <TextField
                      autoComplete = "off"
                      id="standard-dense"
                      label="CLIENT NAME"
                      className={classes.textField}
                      onChange = {(event)=>handleChange(event)}
                      margin="normal"
                      variant="outlined"
                      placeholder="Add a client or company"
                      type="text"
                      value={clientNameState}
                       name = "password"
                     InputLabelProps={{
                       shrink: true,
                     }}
                  />

                    <br/>
                 
                    <Button variant="contained" type="submit" color="primary" className={classes.button}>ADD CLIENT</Button>



                </form>


                          <ul className={classes.listContainer}> 
                           
                          {
                             clientListForRender.map((val,index)=>{
                        
                                if(userData.state.userID === val.user_id){
                                  return (

                                    <a  key={index} href={`/dashboard/${userData.state.userID}/company/${val.name}/${val.key}`}> 

                                      <ListItem className={classes.clientItem}>{val.name}                        
                                        <span onClick={(event)=>deleteWorkflow(event,val)}>
                                        <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                        </IconButton>
                                        </span>
                                      </ListItem> 

                                      <Divider/>
                                    </a>

                                  );

                                } 
                             })
                           }

                           </ul>


                       </div>

               
                    </Grid>
                    <Grid item xs={12} sm={4}>

                    </Grid>
                 
                  </Grid>

              </div>

           </div>

    );
}



Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard)


