import * as functions from 'firebase-functions';
import *  as express from 'express';

const app = express();

app.get('/', (req, res) => {
    console.log(req);
    res.send(`
      <!doctype html>
      <head>
        <title>Time</title>
      </head>
      <body>
        <p>Hi</p>
      </body>
    </html>`);
  });

exports.app = functions.https.onRequest(app);
