/* eslint-disable no-undef */
import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";
import loglevel from 'loglevel';

const expect = chai.expect;

let db;
let api;

const users = [
  {
    username: "user1",
    password: "test1",
  },
  {
    username: "user2",
    password: "test2",
  },
];

const sampleMovie = {
  id: 337401,
  title: "Mulan"
};

const sampleUpcoming = {
  id: 508442,
  title: "Soul"
};

describe("Users endpoint", () => {
  before(() => {
    mongoose.connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      loglevel.info(error);
    }
  });
  beforeEach(async () => {
    try {
      api = require("../../../../index");
      await User.deleteMany({});
      await User.collection.insertMany(users);
    } catch (err) {
      loglevel.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(async () => {
    api.close();
    delete require.cache[require.resolve("../../../../index")];
  });

  describe("GET / ", () => {
    it("should return the 2 users and a status 200", (done) => {
      request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2"]);
          done();
        });
    });
  });
  
  describe("GET /username ", () => {
    describe("valid name", () => {
      it("should return a 200 status and the confirmation message", () => {
        return request(api)
          .get("/api/users/user1")
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.property("username","user1");
          });
      });
    });
    describe("no such user", () => {
      it("should return a 404 status and the confirmation message", () => {
        return request(api)
          .get("/api/users/xxx")
          .expect(404)
          .expect({ code: 404, msg: 'User not found.' });
      });
    });
  });

  describe("PUT /username ", () => {
    describe("valid name", () => {
      it("should return a 200 status and the confirmation message", () => {
        return request(api)
          .put("/api/users/user1")
          .send({
            username: "slee",
            password: "test1"
          })
          .expect(200)
          .expect({ code: 200, msg: 'Update Successfully.' });
      });
      after(() => {
        request(api)
          .put("/api/users")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(2);
            let result = res.body.map((user) => user.username);
            expect(result).to.have.members(["slee", "user2"]);
          });
      });
    });
    describe("no such user", () => {
      it("should return a 404 status and the confirmation message", () => {
        return request(api)
          .get("/api/users/xxx")
          .expect(404)
          .expect({ code: 404, msg: 'User not found.' });
      });
    });
  });

  describe("DELETE /username ", () => {
    describe("no such user", () => {
      it("should return a 404 status and the confirmation message", () => {
        return request(api)
          .delete("/api/users/xxxx")
          .expect(404)
          .expect({ code: 404, msg: 'User not found.' });
      });
    });
    describe("valid name", () => {
      it("should return a 200 status and the confirmation message", () => {
        return request(api)
          .delete("/api/users/user2")
          .expect(200)
          .expect({ code: 200, msg: 'Delete successfully'});
      });
      after(()=>{
        request(api)
          .get("/api/users/user2")
          .expect(404)
          .expect({ code: 404, msg: 'User not found.' });
      });
    });
  });
  
  describe("POST /userName/favourites ", () => {
    describe("normal case ", () => {
      it("should return the new info and a status 201", (done) => {
        request(api)
          .post("/api/users/user1/favourites")
          .send({
            id: `${sampleMovie.id}`,
            title: `${sampleMovie.title}`
          })
          .expect("Content-Type", /json/)
          .expect(201)
          .end((err, res) => {
            expect(res.body).to.have.property("favourites");
            expect(res.body.favourites).to.have.members([sampleMovie.id]);
            done();
          });
      });
      after(() => {
        return request(api)
          .get("/api/users/user1/favourites")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.members([sampleMovie.id]);
          });
      });
    });
    describe("no such user", () => {
      it("should return a 404 status and the confirmation message", () => {
        return request(api)
          .post("/api/users/user4/favourites")
          .send({
            id: `${sampleMovie.id}`,
            title: `${sampleMovie.title}`
          })
          .expect(404)
          .expect({ code: 404, msg: 'User not found.' });
      });
    });
    describe("invaild id ", () => {
      it("should return the invaild id message", () => {
        request(api)
          .post("/api/users/user1/favourites")
          .send({
            id: `xxx`,
            title: `111`
          })
          .expect("Content-Type", /json/)
          .expect(401)
          .expect({ code: 401, msg: 'Invaild movie id.' });
      });
    });
    describe("duplicated favourites movies ", () => {
      it("should return the duplicated info and a status 201", (done) => {
        request(api)
          .post("/api/users/user1/favourites")
          .send({
            id: `${sampleMovie.id}`,
            title: `${sampleMovie.title}`
          })
          .expect("Content-Type", /json/)
          .expect(201)
          .end((err, res) => {
            expect(res.body).to.have.property("favourites");
            expect(res.body.favourites).to.have.members([sampleMovie.id]);
            done();
          });
      });
      after(()=>{
        request(api)
          .post("/api/users/user1/favourites")
          .send({
            id: `${sampleMovie.id}`,
            title: `${sampleMovie.title}`
          })
          .expect("Content-Type", /json/)
          .expect(201)
          .then((err, res) => {
            expect(res.body).to.have.property("msg",'Already have this movie');
          });
      });
    });
  });

  describe("GET /userName/favourites ", () => {
    describe("normal case", () =>{
      before(() =>{
        request(api)
        .post("/api/users/user1/favourites")
        .send({
          id: `${sampleMovie.id}`,
          title: `${sampleMovie.title}`
        });
      });
      it("should return favourite movies",() =>{
        request(api)
        .get("/api/users/user1/favourites")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body[0]).to.have.property("id",sampleMovie.id);
        });
      });
    });
    describe("no such user", () =>{
      it("should return a 404 status and the confirmation message", () => {
        request(api)
        .get("/api/users/user6/favourites")
        .expect("Content-Type", /json/)
        .expect(404)
        .expect({ code: 404, msg: 'User not found.' });
      });
    });
  });

  describe("DELETE /userName/favourites/id ", () => {
    describe("normal case", () =>{
      before(() =>{
        request(api)
        .post("/api/users/user1/favourites")
        .send({
          id: `${sampleMovie.id}`,
          title: `${sampleMovie.title}`
        });
      });
      it("should delete that movie in favourites",() =>{
        request(api)
        .delete(`/api/users/user1/favourites/${sampleMovie.id}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .expect({ code: 200, msg: 'Delete successfully'});
      });
      before(() =>{
        request(api)
        .get("/api/users/user1/favourites")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect({});
      });
    });
    describe("no such user", () =>{
      it("should return a 404 status and the confirmation message", () => {
        request(api)
        .delete(`/api/users/user4/favourites/${sampleMovie.id}`)
        .expect("Content-Type", /json/)
        .expect(404)
        .expect({ code: 404, msg: 'User not found.' });
      });
    });
    describe("no such movie", () =>{
      it("should return a 404 status and the confirmation message", () => {
        request(api)
        .delete(`/api/users/user1/favourites/xxx`)
        .expect("Content-Type", /json/)
        .expect(404)
        .expect({ code: 404, msg: 'Invaild movie id.' });
      });
    });
  });

  describe("POST /userName/watchlist ", () => {
    describe("normal case ", () => {
      it("should return the new info and a status 201", (done) => {
        request(api)
          .post("/api/users/user1/watchlist")
          .send({
            id: `${sampleUpcoming.id}`,
            title: `${sampleUpcoming.title}`
          })
          .expect("Content-Type", /json/)
          .expect(201)
          .end((err, res) => {
            expect(res.body).to.have.property("watchlist");
            expect(res.body.watchlist).to.have.members([sampleUpcoming.id]);
            done();
          });
      });
      after(() => {
        return request(api)
        .get("/api/users/user1/watchlist")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.have.members([sampleUpcoming.id]);
        });
      });
    });
    describe("no such user", () => {
      it("should return a 404 status and the confirmation message", () => {
        return request(api)
          .post("/api/users/user4/watchlist")
          .send({
            id: `${sampleUpcoming.id}`,
            title: `${sampleUpcoming.title}`
          })
          .expect(404)
          .expect({ code: 404, msg: 'User not found.' });
      });
    });
    describe("invaild id ", () => {
      it("should return the invaild id message", () => {
        request(api)
          .post("/api/users/user1/watchlist")
          .send({
            id: `xxx`,
            title: `111`
          })
          .expect("Content-Type", /json/)
          .expect(401)
          .expect({ code: 401, msg: 'Invaild movie id.' });
      });
    });
    describe("duplicated watchlist movies ", () => {
      it("should return the duplicated info and a status 201", (done) => {
        request(api)
          .post("/api/users/user1/watchlist")
          .send({
            id: `${sampleUpcoming.id}`,
            title: `${sampleUpcoming.title}`
          })
          .expect("Content-Type", /json/)
          .expect(201)
          .end((err, res) => {
            expect(res.body).to.have.property("watchlist");
            expect(res.body.watchlist).to.have.members([sampleUpcoming.id]);
            done();
          });
      });
      after(()=>{
        request(api)
          .post("/api/users/user1/watchlist")
          .send({
            id: `${sampleUpcoming.id}`,
            title: `${sampleUpcoming.title}`
          })
          .expect("Content-Type", /json/)
          .expect(201)
          .then((err, res) => {
            expect(res.body).to.have.property("msg",'Already have this movie');
          });
      });
    });
  });

  describe("GET /userName/watchlist ", () => {
    describe("normal case", () =>{
      before(() =>{
        request(api)
        .post("/api/users/user1/watchlist")
        .send({
          id: `${sampleUpcoming.id}`,
          title: `${sampleUpcoming.title}`
        });
      });
      it("should return movies in watch list",() =>{
        request(api)
        .get("/api/users/user1/watchlist")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.have.members([sampleUpcoming.id]);
        });
      });
    });
    describe("no such user", () =>{
      it("should return a 404 status and the confirmation message", () => {
        request(api)
        .get("/api/users/user4/watchlist")
        .expect("Content-Type", /json/)
        .expect(404)
        .expect({ code: 404, msg: 'User not found.' });
      });
    });
  });

  describe("DELETE /userName/watchlist/id ", () => {
    describe("normal case", () =>{
      before(() =>{
        request(api)
        .post("/api/users/user1/watchlist")
        .send({
          id: `${sampleUpcoming.id}`,
          title: `${sampleUpcoming.title}`
        });
      });
      it("should delete that movie in watch list",() =>{
        request(api)
        .delete(`/api/users/user1/watchlist/${sampleUpcoming.id}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .expect({ code: 200, msg: 'Delete successfully'});
      });
      before(() =>{
        request(api)
        .get("/api/users/user1/watchlist")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect({});
      });
    });
    describe("no such user", () =>{
      it("should return a 404 status and the confirmation message", () => {
        request(api)
        .delete(`/api/users/user5/watchlist/${sampleUpcoming.id}`)
        .expect("Content-Type", /json/)
        .expect(404)
        .expect({ code: 404, msg: 'User not found.' });
      });
    });
    describe("no such movie", () =>{
      it("should return a 404 status and the confirmation message", () => {
        request(api)
        .delete(`/api/users/user1/watchlist/xxx`)
        .expect("Content-Type", /json/)
        .expect(404)
        .expect({ code: 404, msg: 'Invaild movie id.' });
      });
    });
  });
});