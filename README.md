# Bootstrap Firebase React Authentication

Bootstrap Firebase React Authentication is a web application that could be used as a boilerplate or template for any web app. The project uses Firebase to provide seamless authentication without the need for a server. The app uses React and its Context API which makes authentication state easy to track, reducing the need to manually pass props through each level. On the frontend, react-bootstrap helps create the design and make the website responsive for any screen size. After all, Bootstrap is one of the most popular design libraries.  

### Features
- Responsive
- Quick and easy authentication
- Sign up page
- Login page
- Forgot password capabilities
- Homepage
- Profile page
- Change password with credential check
- Simple design that includes dropdown menus and navbars from Bootstrap

![Homepage](https://raw.githubusercontent.com/ryanarnouk/Bootstrap-Firebase-React-Authentication/master/public/homepage.png)

### Getting Started
1. Clone the repository `git clone https://github.com/ryanarnouk/Bootstrap-Firebase-React-Authentication`
2. Install all the modules using `npm install`
3. Create a new Firebase project in the Firebase console.
Inside the firebase project, ensure that you enable sign up. Enable sign up with password/email.

Create and configure a real time database. For now you can set it to test mode to allow read and write easily without much configuration. 

Inside of the realtime database create a /users directory with a placeholder inside. 
![Example of Database](https://raw.githubusercontent.com/ryanarnouk/Bootstrap-Firebase-React-Authentication/master/public/exampledatabase.png)

4. After configuring the firebase project simply add all the config variables from your project into a .env file as shown below: 
```
REACT_APP_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_AUTH_DOMAIN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_DATABASE_URL=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_PROJECT_ID=xxxxxxxxxxxxxxxxxx
REACT_APP_STORAGE_BUCKET=xxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_MESSAGING_SENDER_ID=xxxxxxxxxx 
REACT_APP_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
firebase.js reads all the env variables to initialize config. 

5. Set up social logins
Social logins also need to be configured in order to function properly. Without doing this, an error message will be displayed, as seen below:

![Error Message](https://raw.githubusercontent.com/ryanarnouk/Bootstrap-Firebase-React-Authentication/master/public/socialerrormessage.png)

It is simple to configure each provider separately inside the Firebase console.  

![Enable Social Sign In](https://raw.githubusercontent.com/ryanarnouk/Bootstrap-Firebase-React-Authentication/master/public/enablesocialsignin.jpg)

You can find this in the same page where you previously enabled email and password sign in. 

Please note, for social logins other than Google you would be required to sign your app for each website to be able to use Oauth. The process is different for every website.  
https://firebase.google.com/docs/auth/?authuser=0

6. Once email and password sign in is enabled and firebase configured you can run the application using `npm start`

### Pages & Screenshots

![Login Page](https://raw.githubusercontent.com/ryanarnouk/Bootstrap-Firebase-React-Authentication/master/public/loginform.png)

![Sign Up Page](https://raw.githubusercontent.com/ryanarnouk/Bootstrap-Firebase-React-Authentication/master/public/signupform.png)

![Profile](https://raw.githubusercontent.com/ryanarnouk/Bootstrap-Firebase-React-Authentication/master/public/profilepage.png)

![Forgot Password](https://raw.githubusercontent.com/ryanarnouk/Bootstrap-Firebase-React-Authentication/master/public/forgotpasswordform.png)

![Profile](https://raw.githubusercontent.com/ryanarnouk/Bootstrap-Firebase-React-Authentication/master/public/changepasswordpage.png)
