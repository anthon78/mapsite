const express = require("express");
let app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const RandomOrg = require('random-org');

//middlewear
app.use(bodyparser());
app.use(cors());
app.use(express.static(__dirname + './../public'));


//routes
app.post('/api/latLongPoints', (req, res) => {
  let total = req.body.total;
  let random = new RandomOrg({ apiKey: 'c40ba9e1-c548-43cf-b1d3-9f60187d0c0e' });
  let latitudes;
  let longitudes;
  let latLongs;

  random.generateIntegers({ min: -90, max: 90, n: total })
    .then((result) => {
      latitudes = result.random.data;
      random.generateIntegers({ min: -180, max: 180, n: total })
        .then((result) => {
          longitudes = result.random.data;
          latLongs = mergeTwoEqualLists(latitudes, longitudes);
          res.send(latLongs);
        })
    })

  mergeTwoEqualLists = (l1, l2) => {
    let newList = [];
    for (let i = 0; i < l1.length; i++) {
      newList.push([l1[i], l2[i]]);
    }
    return newList;
  }
})

app.listen(3000, () => console.log("App listening on port 3000!"));