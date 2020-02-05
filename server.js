const express = require('express');
const app = express();
const bodyParser = require('body-parser')
let port = 9000

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
  console.log('app.get all')
});

//GET Specific Place to edit it
app.get('/place', function(req, res) {
  res.send({places: places});
  console.log('app.get one')
});

//PUT Specific Place to save it after editing
app.put('/place', function(req, res) {
  let newPlace = {
    id: req.body.placeId,
    title: req.body.title,
    description: req.body.description,
    openHours: [req.body.hoursStart, req.body.hoursEnd],
    location: [req.body.lat, req.body.lng],
    online: false,
    keyWords: ['pizza']
  }
  console.log('app.put')
  places[req.body.placeId] = newPlace;
  res.send({places: places});
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
  console.log('app.post')
  res.send({places: places});
})

//DELETE Specific Place to Places
app.delete('/place/:id', function (req, res) {
  let id = req.params.id;
  places[id].isDeleted = true;
  console.log('app.delete')
  res.send({places: places});
})

// app.get('/placed', function (req, res) {

//   let id = req.query.id;
//   console.log(id)
//   places[id].isDeleted = true;
//   res.send({places: places});
// })

app.listen(port, function () {
  console.log('We are listening on port ' + port)
})
  