import React, {Component,useContext,useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
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
});

const showClientDates = () =>{
    alert("Yay")
}




const FetchData = (props) =>{
    const userID = useContext(Context).state.userID;
    const [clients, setClients] = useState([])

    useEffect(() => {
      const clientsRef = firebase.database().ref("clients")
    
      const handleChildAdded = (snapshot) => {
        const client = snapshot.val()
        client.key = snapshot.key
        setClients(clients => [...clients, client])
      }
    
      clientsRef.on("child_added", handleChildAdded)
      return () => clientsRef.off('child_added', handleChildAdded)
    }, [])

     // console.log(clients)
  
        return (
          
            <ul>
                <ListItem>All</ListItem>

                {
                    clients.map((val,index)=>{
                        if(userID === val.user_id)
                        return <a key={index} onClick={showClientDates}> <ListItem>{val.name}</ListItem> </a>
                    }) 
                }

            </ul>
        )
}  

FetchData.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FetchData)