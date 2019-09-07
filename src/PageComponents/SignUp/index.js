import firebase from 'firebase/app';
import { signUpWithEmailAndPassword } from 'services/authentication';
import { getUser } from 'services/authentication';
import React, {Component} from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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


class SignUp extends Component{
	constructor(props){
		super(props)

		this.state = {
			cachedEmail:"",
			cachedPassword:"",
      cachedUsername:"",
      cachedFirstName:"",
      cachedLastName:"",
      validationMessage:""

		}

    this.usersRef = firebase.database().ref('users')
	}

  async getUser() {
	    try {
	      let user = await getUser();
	      return user;
	    } catch (error) {
	      console.log(error.message);
	    }
  }

  async componentDidMount(){
      let user = await this.getUser();
      if(user){
      	console.log(user)
      }else{
      	console.log("no user")
      }
  }   
    
  handleChange = (event) => {
    	this.setState({
    		[event.target.name]: event.target.value
    	});
  }

  async signUp(username, firstName, lastName, email, password) {

      try {
        await signUpWithEmailAndPassword.createUser(
          email,
          password
        );

        await signUpWithEmailAndPassword.sendValidationEmail();

        let user = await this.getUser();
        console.log(user.currentUser + " current user yay");
        console.log(user.emailVerified + " current user yay");
        console.log(JSON.stringify(user));
        console.log("sign up uid " + user.uid)


      if (!user.emailVerified) {

          this.usersRef.push({
              email: user.email,
              username:username,
              firsName:firstName,
              lastName:lastName,
              user_id:user.uid   // added uid


          })

          this.setState({
            cachedEmail: "",
            cachedPassword: "",
            cachedUsername:"",
            cachedFirstName:"",
            cachedLastName:"",
            validationMessage:
              "Please check your email. An account verification message has been sent"
          });
        }

      }catch (err) {
        console.log(err.message);
        this.setState({
          validationMessage: `${err.message}`
        });
      }

  }

  submitSignUpForm = event => {
    event.preventDefault();
    let email = this.state.cachedEmail;
    let password = this.state.cachedPassword;
    let userName = this.state.cachedUsername;
    let firstName = this.state.cachedFirstName;
    let lastName = this.state.cachedLastName;
    this.signUp(userName, firstName, lastName, email, password) 

    this.setState({
      cachedEmail: "",
      cachedPassword: "",
      cachedUsername: "",
      cachedFirstName:"",
      cachedLastName:""
    });
  };

	render(){
    const { classes } = this.props;
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
        <Paper className={classes.paper}>




        
                    <section>
          <form onSubmit = {this.submitSignUpForm}>
          <label>Your Desired User Name</label>
           <input name= "cachedUsername" type="text" onChange = {this.handleChange} value = {this.state.cachedUsername} />
           <br/>
           <label>Email</label>


            <input name= "cachedEmail" type="email" onChange = {this.handleChange} value = {this.state.cachedEmail} />
            <br/>
            <label>Password</label>
            <input name = "cachedPassword" type = "text" onChange = {this.handleChange} value = {this.state.cachedPassword}/>
            <br/>
            <label>First Name</label>
            <input name = "cachedFirstName" type = "text" onChange = {this.handleChange} value = {this.state.cachedFirstName}/>
            <br/>

            <label>Last Name</label>
            <input name = "cachedLastName" type = "text" onChange = {this.handleChange} value = {this.state.cachedLastName}/>
            <br/>
          <Button variant="outlined" color="primary" className={classes.button} type="submit"> Sign Up</Button> 

          </form>
          {this.state.validationMessage}
        </section>

       </Paper>

   
        </Grid>
     
      </Grid>

      </div>

      )
	 }
}





SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);