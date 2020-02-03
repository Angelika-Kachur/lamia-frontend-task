const express = require('express');
const app = express();
const bodyParser = require('body-parser')
let port = 3000

//Places Data
let places = [
  {
      id: 0,
      title: 'Arnold',
      description: 'This is a great Donuts place',
      openHours:  [
          10,
          18
      ],
      location: [
          24.941325187683105,
          60.169938852212965
      ],
      online: false,
      keyWords: [
          'donuts',
          'sweets',
          'tee'
      ]
  },
  {
      id: 1,
      title: 'Sushi',
      description: 'This is a great Sushi place',
      openHours:  [
          10,
          18
      ],
      location: [
          24.941325187683105,
          60.169938852212965
      ],
      online: false,
      keyWords: [
          'sushi',
          'fish'
      ]
  },
  {
      id: 2,
      title: 'Pizza Sushi',
      description: 'This is a great Pizza place',
      openHours:  [
          10,
          20
      ],
      location: [
          24.941325187683105,
          60.169938852212965
      ],
      online: false,
      keyWords: [
          'pizza',
          'fries',
          'soda'
      ]
  },
];

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
app.get('/place', function(req, res) {
  res.send({places: places});
});

//PUT Specific Place to save it after editing
app.put('/place', function(req, res) {
  res.send({places: places});
});

//POST New Place to Places
app.post('/place', function (req, res) {
  console.log(req.body);
  let title = req.body.title;
  let description = req.body.title;
  let openHours = [req.body.hoursStart, req.body.hoursEnd];
  let location = [req.body.lat, req.body.lng];
  let keyWords = ['pizza'];
  currentId++;

  places.push({
    id: currentId++,
    title: title,
    description: description,
    openHours: openHours,
    location: location,
    online: false,
    keyWords: keyWords
  });
  res.send('Successfully created place!');
  return res.end('done')
})

app.listen(port, function () {
  console.log('We are listening on port ' + port)
})
  