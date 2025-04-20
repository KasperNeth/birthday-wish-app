const express = require("express");
const cors = require("cors");
const helmet = require("helmet")
const compression = require("compression")
const router = require("./src/routes/index.route")
const path = require("path")


const app = express();

app.use(helmet({
  contentSecurityPolicy: false 
}));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'view')));
//all registered routes
app.use(router);



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});


module.exports = app;