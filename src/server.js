const express = require("express");
let app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const RandomOrg = require('random-org');
const OpenWeatherMapHelper = require("openweathermap-node-with-units-preference");

//middlewear
app.use(bodyparser());
app.use(cors());
app.use(express.static(__dirname + './../public'));

const helper = new OpenWeatherMapHelper(
  {
    APPID: 'fc6667ed49fd23a044c4bdfce98ee460',
    units: "imperial"
  }
);


//routes
app.post('/api/weatherData', async (req, res) => {
  let coordinates = req.body.coordinates.data;
  let weatherDataList = [];
  for (let coord of coordinates) {
    let lat = coord[0];
    let long = coord[1];
    helper.getCurrentWeatherByGeoCoordinates(lat, long, (err, currentWeather) => {
      if (err) {
        console.log(err);
      } else {
        weatherDataList.push(currentWeather);
        if (weatherDataList.length === coordinates.length) {
          res.send(weatherDataList);
        }
      }
    })
  }
})

app.post('/api/latLongPoints', (req, res) => {
  let total = req.body.total;
  let random = new RandomOrg({ apiKey: 'c40ba9e1-c548-43cf-b1d3-9f60187d0c0e' });
  let latitudes;
  let longitudes;
  let latLongs;

  random.generateIntegers({ min: -85, max: 85, n: total })
    .then((result) => {
      latitudes = result.random.data;
      random.generateIntegers({ min: -170, max: 170, n: total })
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