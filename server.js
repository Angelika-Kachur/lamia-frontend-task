const express = require('express');
const app = express();
const bodyParser = require('body-parser')
let port = 9000

//Places Data
let placesJson = require("./data.json");
let places = placesJson.places;
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
});

//GET Specific Place to edit it
app.get('/place/:id', function(req, res) {
  let id = req.params.id;
  if(places[id])res.send(places[id]);
  else res.status(404).send('Not found');
});

//POST New Place to Places
app.post('/place', function (req, res) {
  let newPlace = {
    id: currentId++,
    title: req.body.title,
    description: req.body.description,
    openHours: [req.body.hoursStart, req.body.hoursEnd],
    location: [req.body.lat, req.body.lng],
    online: false,
    keyWords: ['pizza']
  }
  places.push(newPlace);
  res.send({places: places});
})

//PUT Specific Place to save it after editing
app.put('/place/:id', function(req, res) {
  let id = req.params.id;
  if(!id == req.body.placeId) res.status(400).send('IDs are not equal!');
  let newPlace = {
    id: req.body.placeId,
    title: req.body.title,
    description: req.body.description,
    openHours: [req.body.hoursStart, req.body.hoursEnd],
    location: [req.body.lat, req.body.lng],
    online: false,
    keyWords: ['pizza']
  }
  places[req.body.placeId] = newPlace;
  res.send({places: places});
});

//DELETE Specific Place to Places
app.delete('/place/:id', function (req, res) {
  let id = req.params.id;
  places[id].isDeleted = true;
  res.send({places: places});
})

app.listen(process.env.PORT || port, function () {
  console.log('Your PlacesApp is running on port ' + port)
})

module.exports = app;