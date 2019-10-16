# Firebase React Context Biolerplate

## Getting Started
1. Fork the repository
2. Create a new Firebase project.
    - Inside the firebase project, ensure that you enable sign up. Enable sign up with password/email.
    - Create and configure real time database. For now you can set it to test mode to allow read and write easily without much configuration. 
    - Inside of the realtime database create a /users directory with a placeholder inside. 
    ![Example of Database](https://raw.githubusercontent.com/ryanarnouk/Firebase-React-Context-Biolerplate/master/public/exampledatabase.PNG)

3. After configuring the firebase project simply add all the config variables from your project into a .env file as shown below: 
```
REACT_APP_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_AUTH_DOMAIN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_DATABASE_URL=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_PROJECT_ID=xxxxxxxxxxxxxxxxxx
REACT_APP_STORAGE_BUCKET=xxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_MESSAGING_SENDER_ID=xxxxxxxxxx 
REACT_APP_APP_ID=1:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
