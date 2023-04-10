import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import firebaseAdminApp from "firebase-admin";
const serviceAccount = require("./keys/firebase-admin-credentials.json");
import { Message, Notification } from 'firebase-admin/lib/messaging/messaging-api';

const app: Express = express();
const PORT: number = 8000

firebaseAdminApp.initializeApp({
    credential: firebaseAdminApp.credential.cert(serviceAccount)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get("/", (req: Request, res: Response) => res.send("This is Firebase nodejs integration example"));
app.post("/notify", async (req, res) => {
    const { token, notification = {}, payload = {} } = req.body;

    const message: Message = {
        token: token,
        notification: notification,
        data: payload
    }
    if (!token)
        res.status(400).send("Please provide a valid device token")
    else
        await firebaseAdminApp.messaging().send(message)
            .then((response: string) => {
                res.send("Notification sent successfully")
            })
            .catch((error: string) => {
                res.status(500).send("Oops, notifcation wasn't sent !")
            });
});

app.listen(PORT, () => console.log("listening on the port " + PORT));