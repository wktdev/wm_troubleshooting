import React, { Component, useContext, useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase/app';
import { Consumer, Context } from '../../PageComponents/Context';
import { instantSearchFilter } from '../../helper_functions';
import "../../PageComponents/fonts/index.css";

const clientsRef = firebase.database().ref('clients');

const styles = theme => ({
    root: {
        flexGrow: 1,
    },

    logoContainer: {
        position: "relative",
        margin: "0 auto",
        top: "120px"
    },
    container: {
        marginTop: "130px",
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    clientItem: {
        fontSize: "2em",
        display: "inline-block",
        textAlign: "center",
        color: "grey",
        '&:hover': {
            background: "#8a0eff3b",
            transition: "0.4s"
        },
    },
    clientItemSelected: {
        background: "#8a0eff3b",
    },

    textField: {
        width: "25em",
    },

    listItem: {
        fontSize: '35px', //Insert your required size

    },

    listContainer: {
        position: "relative",
        top: "30px"
    }


});


//____________________________________

function checkForEmptyString(str) {

    if (!str.trim().length) {
        alert("Field cannot be empty")
    } else {
        return str.trim()
    }
}

//___________________________________


function Dashboard(props) {

    const [clientNameState, setClientNameState] = useState("");
    const { classes } = props;
    const userData = useContext(Context);
    const [clientList, setClientListState] = useState([]);
    const [clientListForRender, setClientListStateForRender] = useState([]);
    const [selectedIndex, updateSelectedIndex] = useState(0);



    useEffect(() => {

        clientsRef.on('child_added', snapshot => {
            const client = snapshot.val();
            client.key = snapshot.key; //     __________________________1. get firebase data

            setClientListState(function(prev) {
                return [client, ...prev]
            });

        });

        return () => {
            clientsRef.off();
        };

    }, [clientsRef])



    useEffect(() => {
  
            setClientListStateForRender(clientList);
        
    }, [clientList]);







//_______________________________Instant search function


function instantSearchFilter(s,arr){

  const p = Array.from(s).reduce((a, v, i) => `${a}[^${s.substr(i)}]*?${v}`, '');
  const re = RegExp(p,"i");
  
  let matched = arr.filter(v => v.name.match(re));

  let result = matched.map(function(val,index,arr){
            return val
  })

  console.log(result)

  return result


}
//


//___________________________________________________



    function handleChange(evt) {

        setClientNameState(
            evt.target.value
        );
        setClientListStateForRender(
            instantSearchFilter(evt.target.value.trim(), clientList)
        );

    }



    return (
        <div>


              <form>
                  <input
                      onChange = {(event)=>handleChange(event)}
                      type="text"
                      value={clientNameState}

                  />

                    <br/>
                 
                </form>

                          <ul className={classes.listContainer}> 
                           
                          {
                             clientListForRender.map((val,index)=>{
              
                                if(userData.state.userID === val.user_id){
                                  return (


                                      <ListItem> 
                                        {val.name}                        
                                      </ListItem> 

                                  );

                                } 
                             })
                           }

                           </ul>


          
                  </div>



    );
}



Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard)