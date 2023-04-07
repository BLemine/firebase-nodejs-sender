#### About : 
A quick firebase admin notifications sender in express.js.
#### Setup : 
- Create an admin key from the firebase admin [console](https://console.firebase.google.com), download the file and put it under keys/firebase-admin-credentials.json
- Start the project with : 
```bash
npm start 
```
This will run it with **nodemon**, you can edit that in the script closure in package.json file.

To test it, you can use this json object as the body of your **/notify** post request :

```json
{
    "token": "yourToken",
    "notification": {
        "title": "Quick test",
        "body": "It's just a test :)"
    },
    "payload":{
        
    }
}
```

Don't forget to replace the field "token" by your target's firebase token.