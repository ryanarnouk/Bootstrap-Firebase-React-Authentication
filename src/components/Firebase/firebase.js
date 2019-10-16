import app from 'firebase/app';
import 'firebase/auth';
import firebase from 'firebase';

// init the config variables. Put variables in env file and get them from Firebase
const config = {
  apiKey: "AIzaSyATFuXDtGXlRq9GYZmdAuyydMsIeYjIoo0",
  authDomain: "fir-react-biolerplate.firebaseapp.com",
  databaseURL: "https://fir-react-biolerplate.firebaseio.com",
  projectId: "fir-react-biolerplate",
  storageBucket: "fir-react-biolerplate.appspot.com",
  messagingSenderId: "683211152614",
  appId: "1:683211152614:web:4d5b8985931aea65f6af27"
};

app.initializeApp(config);

class Firebase {
  constructor() {
    this.auth = app.auth();

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // authentication API
  
  doCreateUserWithEmailAndPassword = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword  = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref('users/' + user.uid).set({
          "test": "user signing out"  // set user data before signing out
        }).then(() => {
          this.auth.signOut();
        });
        this.auth.signOut();
      }
    });  
  }

  // password resets
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // set username
  onAuthStateChanged = (username) => {
    this.auth.onAuthStateChanged((user) => {
      user.updateProfile({
        displayName: username
      }).then((res) => {
        console.log(res);
      }).then((err) => {
        console.log(err);
      })
    });
  }
   
  getUserData = () => {
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId + '/test').once('value').then((snapshot) => {
      var x = snapshot.val(); 
      console.log(x);
    })
  }

  doSignInWithGoogle = () => 
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () => 
    this.auth.signInWithPopup(this.twitterProvider);
}

export default Firebase; 