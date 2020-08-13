const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const http = require('http');
// const privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
// const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

const port = process.env.PORT || 9100;

// const credentials = { key: privateKey, cert: certificate };

//middlewares Notes - MUST READ
//Helmet will secure all http requests and must be called before any other function. Please do not shift the below helmet middleware from here or do not add any middleware function above this. - Faizan
app.use(helmet());
app.use(helmet.noCache());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
})

// var contents = fs.readFileSync('../qwerty/ss.crt', 'utf8');
// console.log(contents);

const httpServer = http.createServer(app);
//const httpsServer = https.createServer(credentials, app);

httpServer.listen(port, () => {
  console.log('server running on :' + port);
});

// httpsServer.listen(8100, () => {
//   console.log('server running on :' + port);
// });