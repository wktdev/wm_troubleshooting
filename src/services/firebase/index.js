// import firebase from 'firebase'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { config } from './config'

// TODO: initialize per environment, by reading from environment
!firebase.apps.length && firebase.initializeApp(config)

// Apply the browser's language preference to authentication
firebase.auth().useDeviceLanguage() 

export default firebase
