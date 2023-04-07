const express = require("express");
const app = express();
const PORT = 8000
const firebaseAdminApp = require('firebase-admin');
const bodyParser = require('body-parser');
const serviceAccount = require("./keys/firebase-admin-credentials.json");
firebaseAdminApp.initializeApp({
    credential: firebaseAdminApp.credential.cert(serviceAccount)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get("/", (req, res) => res.send("This is Firebase nodejs integration example"));
app.post("/notify", async (req, res) => {
    const { token, notification = {
        "title": "Quick test",
        "body": "Hey mate, this is a test !"
    }, payload = {} } = req.body;
    const message = {
        token: token,
        notification: notification,
        data: payload
    }
    if (!token)
        res.status(400).send("Please provide a valid device token")
    else
        await firebaseAdminApp.messaging().send(message)
            .then((response) => {
                res.send("Notification sent successfully")
            })
            .catch((error) => {
                res.status(500).send("Oops, notifcation wasn't sent !")
            });
});

app.listen(PORT, () => console.log("listening on the port " + PORT));