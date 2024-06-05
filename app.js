'use strict';

const express = require("express"); 
const app = express();
const cors = require("cors");
require('dotenv').config();
const vectorsearch = require('./src/routes/vector-search');


app.use(express.json({limit: "15mb"})); //Used to parse JSON bodies
app.use(express.urlencoded({extended: true}));
app.use(cors());


app.use((req, res, next) => {
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
  

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.sendStatus(200);
    }
    next();
});

app.use(vectorsearch);

app.listen(process.env.PORT_DEV, () => {
    console.log(`App listening on port - ${process.env.PORT_DEV}`);
});