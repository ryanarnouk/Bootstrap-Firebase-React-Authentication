# Firebase React Context Authentication

## Getting Started
### 1. Clone the repository `git clone`
### 2. Install modules `npm install`
### 3. Create a new Firebase project.
Inside the firebase project, ensure that you enable sign up. Enable sign up with password/email.

Create and configure real time database. For now you can set it to test mode to allow read and write easily without much configuration. 

Inside of the realtime database create a /users directory with a placeholder inside. 
    ![Example of Database](https://raw.githubusercontent.com/ryanarnouk/Firebase-React-Context-Biolerplate/master/public/exampledatabase.PNG)
    FIX IMAGE AFTER UPLOAD

### 4. After configuring the firebase project simply add all the config variables from your project into a .env file as shown below: 
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

### 5. Set up social logins
Social logins also need to be configured in order to function properly. Without doing this, an error message will be displayed, as seen below. 
```
The identity provider configuration is disabled.
```
ADD IMAGE AFTER UPLOAD

It is simple to configure each provider separately inside the Firebase console.  
ADD IMAGE AFTER UPLOAD

Please note, for social logins other than Google you would be required to sign your app for each website to be able to use Oauth. The process is different for every website.  
https://firebase.google.com/docs/auth/?authuser=0
