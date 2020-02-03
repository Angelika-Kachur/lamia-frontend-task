const express = require('express');
const app = express();
const bodyParser = require('body-parser')
let port = 3000

//Places Data
let placesJson = require("./data.json");
let places = placesJson.places;
// console.log(places);

let currentId = 3;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//GET All Places to render on the page
app.get('/places', function(req, res) {
  res.send({places: places});
  console.log('Succesfully GET all!');
});

//GET Specific Place to edit it
app.get('/place', function(req, res) {
  res.send({places: places});
  console.log(res.body);
  console.log('Succesfully GET specific!');
});

//PUT Specific Place to save it after editing
app.put('/place', function(req, res) {
  // res.send({places: places});
  res.send({places: places});
  console.log(req.body);
  console.log(res.body);
  console.log('Succesfully updated product!');
});

//POST New Place to Places
app.post('/place', function (req, res) {
  let newPlace = {
    id: currentId++,
    title: req.body.title,
    description: req.body.title,
    openHours: [req.body.hoursStart, req.body.hoursEnd],
    location: [req.body.lat, req.body.lng],
    online: false,
    keyWords: ['pizza']
  }
  places.push(newPlace);
  res.send({places: places});
  return res.end('done')
})

//DELETE Specific Place to Places
app.delete('/place', function (req, res) {
  console.log(req.body);

  let newPlace = {
    id: currentId++,
    title: title,
    description: description,
    openHours: openHours,
    location: location,
    online: false,
    keyWords: keyWords
  }

  places.push(newPlace);
  res.send({places: places});
  return res.end('done')
})

app.listen(port, function () {
  console.log('We are listening on port ' + port)
})
  