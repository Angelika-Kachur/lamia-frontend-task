const supertest = require('supertest')
const app = require('../server')
let placesJson = require("../data.json");

/* GET places */
describe("GET /places", function() {
  it("should return places object", function(done){
    supertest(app)
      .get("/places")
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(placesJson, done)
  });
});

/* GET place */
describe("GET /place/id", function() {
  it("should return correct place", function(done) {
    let placeId = 2;
    supertest(app)
      .get(`/place/${placeId}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(placesJson.places[placeId], done)
  });
});

/* GET place with 404 */
describe("GET /place/id", function() {
  it("should return 404 on missing id", function(done) {
    supertest(app)
      .get(`/place/${9}`)
      .expect(404, done)
  });
});

/* POST place */
describe("POST /place", function() {
  it("should return places with correct added place", function(done) {
    let testPlace = {"title":"title","description":"description","openHours":["0", "0"],"location":["0", "0"]};
    let responseCheck = res => {
      let places = res.body.places;
      if(places[places.length-1].title !== testPlace.title) throw new Error("Objects are not equals!");
      if(places[places.length-1].description !== testPlace.description) throw new Error("Objects are not equals!");
    }
    supertest(app)
      .post("/place")
      .send(testPlace)
      .expect('Content-Type', /json/)
      .expect(responseCheck)
      .end(done);
  });
});

/* PUT place */
describe("PUT /place/id", function() {
  it("should return places with correct edited place", function(done) {
    let placeId = 1;
    let testPlace = placesJson.places[placeId];
    testPlace.title = "sanyasha I love you"
    let responseCheck = res => {
      let places = res.body.places;
      console.log('places[placeId]', places[placeId]);
      console.log('testPlace', testPlace);
      if(places[placeId].title !== testPlace.title) throw new Error("Objects are not equals!");
    }
    supertest(app)
      .put(`/place/${placeId}`)
      .send(testPlace)
      .expect('Content-Type', /json/)
      .expect(responseCheck)
      .end(done);
  });
});

// /* DELETE place */
// describe("DELETE /place/:id", function() {
//   it("it should has status code 200 if   new place", function(done) {
//     supertest(app)
//       .post("/place/:id")
//       .send({"title":"Place Title","description":"Place Description","hoursStart":"10","hoursEnd":"22","lat":"60.1733711368774","lng":"24.986592829227448"})
//       .expect(200)
//       .end(function(err, res){
//         if (err) done(err);
//         done();
//       });
//   });
// });