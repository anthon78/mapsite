const express = require("express");
let app = express();
const bodyparser = require("body-parser");
const cors = require("cors");

//middlewear
app.use(bodyparser());
app.use(cors());


//routes



app.use(express.static(__dirname + './../public'));
app.listen(8080, () => console.log("App listening on port 8080!"));