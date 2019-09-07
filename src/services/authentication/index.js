import firebase from '../../services/firebase'


const signUpWithEmailAndPassword = {

    createUser:function(email, password){ 

      return  firebase.auth().createUserWithEmailAndPassword(email, password) 

    },

    sendValidationEmail:function(email, password){

      var actionCodeSettings = {

       url: "http://localhost:3000/sign-in", 
     };

      return  firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)

    }

}



//_____________________________________________________BEGIN getUser

const getUser = () =>{

    return new Promise((resolve, reject) => {   // Step 3. Return a promise

         //___________________ wrapped async function

         firebase.auth().onAuthStateChanged((user)=> {

                if(user){
                    
                    resolve(user);   //____This is the returned value of a promise

                 }else{

                   reject(new Error("Get user error"))

                }
         })

       //_____________________END wrapped async function  
            
    });

}


//______________________________________________________END getUser










const signInWithEmailAndPassword = (email, password) =>{
  console.log("sign in with email an password service is being imported!");
  return firebase.auth().signInWithEmailAndPassword(email, password);
}


const userPasswordReset = (email) => {
  return firebase.auth().sendPasswordResetEmail(email);
}






const signInWithEmail = (email) => {
    console.log("sign in with email service triggered");
    var actionCodeSettings = {

        url: 'http://localhost:3000/dashboard',
        handleCodeInApp: true
    };

   return firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)

}





const signInWithGoogle = () => {


    const providerGoogle = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(providerGoogle).then(function(result) {

   }).catch(function(error) { /* todo */
   })
}

const signOut = () => {
    return firebase.auth().signOut();
}

export { signInWithGoogle, signUpWithEmailAndPassword, signInWithEmailAndPassword,userPasswordReset, signInWithEmail, signOut, getUser }

