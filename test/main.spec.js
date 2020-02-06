const supertest = require('supertest')
const app = require('../server')

/* GET places */
describe("GET /places", function() {
  it("it should has status code 200", function(done) {
    supertest(app)
      .get("/places")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });

  it("it shoud has response an object with all places", function(done){
    supertest(app)
      .get("/places")
      .expect({ places:  [ { id: 0,
        title: 'Arnold',
        description: 'This is a great Donuts place',
        openHours: [ 10, 18 ],
        location: [ 60.16901644495906, 24.93797779083252 ],
        online: false,
        keyWords: [ 'donuts', 'sweets', 'tee' ],
        isDeleted: false },
      { id: 1,
        title: 'Sushi',
        description: 'This is a great Sushi place',
        openHours: [ 10, 18 ],
        location: [ 60.17130667985175, 24.94673252105713 ],
        online: false,
        keyWords: [ 'sushi', 'fish' ],
        isDeleted: false },
      { id: 2,
        title: 'Pizza Sushi',
        description: 'This is a great Pizza place',
        openHours: [ 10, 20 ],
        location: [ 60.16923254771562, 24.94167387485504 ],
        online: false,
        keyWords: [ 'pizza', 'fries', 'soda' ],
        isDeleted: false } ]
    })
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

/* GET place */
describe("GET /place", function() {
  it("it should has status code 200", function(done) {
    supertest(app)
      .get("/places")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });

  it("it shoud has response an object with all places", function(done){
    supertest(app)
      .get("/places")
      .expect({ places:  [ { id: 0,
        title: 'Arnold',
        description: 'This is a great Donuts place',
        openHours: [ 10, 18 ],
        location: [ 60.16901644495906, 24.93797779083252 ],
        online: false,
        keyWords: [ 'donuts', 'sweets', 'tee' ],
        isDeleted: false },
      { id: 1,
        title: 'Sushi',
        description: 'This is a great Sushi place',
        openHours: [ 10, 18 ],
        location: [ 60.17130667985175, 24.94673252105713 ],
        online: false,
        keyWords: [ 'sushi', 'fish' ],
        isDeleted: false },
      { id: 2,
        title: 'Pizza Sushi',
        description: 'This is a great Pizza place',
        openHours: [ 10, 20 ],
        location: [ 60.16923254771562, 24.94167387485504 ],
        online: false,
        keyWords: [ 'pizza', 'fries', 'soda' ],
        isDeleted: false } ]
    })
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

/* POST place */
describe("POST /place", function() {
  it("it should has status code 200 if send new place", function(done) {
    supertest(app)
      .post("/place")
      .send({"title":"Place Title","description":"Place Description","hoursStart":"10","hoursEnd":"22","lat":"60.1733711368774","lng":"24.986592829227448"})
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});