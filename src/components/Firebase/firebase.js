import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase';

// init the config variables from the env variable
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

app.initializeApp(config);

class Firebase {
  constructor() {
    this.auth = app.auth(); // auth
    this.db = app.database(); // set this.db to database to save users email and password 

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // authentication API
  
  doCreateUserWithEmailAndPassword = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword  = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => 
    this.auth.signOut();

  // password resets
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // user APi
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // get user data
  getUserData = () => {
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value');
  }

  // social logins
  doSignInWithGoogle = () => 
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () => 
    this.auth.signInWithPopup(this.twitterProvider);

  // check users credentials (for changing password)
  checkCredentials = (userProvidedPassword) => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email, 
        userProvidedPassword
    );
    
    return user.reauthenticateWithCredential(credential);
  }
}

export default Firebase; 