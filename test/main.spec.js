const supertest = require('supertest')
const app = require('../server')
let placesJson = require("../data.json");

/* GET places */
describe("GET /places", function() {
  it("should return places object", function(done){
    supertest(app)
      .get("/places")
      .expect('Content-Type', /json/)
      .expect(200, placesJson, done)
  });

  /* GET place */
  it("should return correct place", function(done) {
    let placeId = 2;
    supertest(app)
      .get(`/place/${placeId}`)
      .expect('Content-Type', /json/)
      .expect(200, placesJson.places[placeId], done)
  });

  /* GET place with 404 */
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
    testPlace.title = "Edited title"
    let responseCheck = res => {
      let places = res.body.places;
      if(places[placeId].title !== testPlace.title) throw new Error("Object is not edited correct!");
    }
    supertest(app)
      .put(`/place/${placeId}`)
      .send(testPlace)
      .expect('Content-Type', /json/)
      .expect(responseCheck)
      .end(done);
  });
});

/* DELETE place */
describe("DELETE /place/id", function() {
  it("should return places with value isDeleted true", function(done) {
    let placeId = 1;
    let responseCheck = res => {
      let places = res.body.places;
      if(!places[placeId].isDeleted) throw new Error("Object doesn't have value isDeleted true!");
    }
    supertest(app)
      .delete(`/place/${placeId}`)
      .send(placesJson.places[placeId])
      .expect('Content-Type', /json/)
      .expect(responseCheck)
      .end(done);
  });
});