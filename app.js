const express = require("express");
const cors = require("cors");
const helmet = require("helmet")
const compression = require("compression")
const router = require("./src/routes/index.route")


const app = express();

app.use(helmet())
app.use(cors("*"));
app.use(compression());
app.use(express.json());

//all registered routes
app.use(router);


//catch all route for invalid routes
// app.all('*', (req, res) => {
//   res.status(404).json({ message: 'Route not found', code: 404 });
// });

module.exports = app;