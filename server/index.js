// server/index.js
// following instructions: https://dev.to/techcheck/creating-a-react-node-and-express-app-1ieg

const express = require('express');
const app = express();

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

console.log(app)

app.listen(8080, () => {
      console.log('server listening on port 8080')
})

app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.send('Hello from our server!')
})