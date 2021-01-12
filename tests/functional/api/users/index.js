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
      loglevel.error(error);
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
  describe("GET /users ", () => {
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

  describe("POST / ", () => {
    describe("valid password", () => {
      it("should return a 200 status and the confirmation message", () => {
        return request(api)
          .post("/api/users?action=register")
          .send({
            username: "user3",
            password: "test3",
          })
          .expect(201)
          .expect({ code: 201, msg: 'Successfully created new user.' });
      });
      after(() => {
        return request(api)
          .get("/api/users")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(3);
            let result = res.body.map((user) => user.username);
            expect(result).to.have.members(["user1", "user2", "user3"]);
          });
      });
    });
    describe("bad password", () => {
      it("should return Register failed message when the password is bad", () => {
        return request(api)
          .post("/api/users?action=register")
          .send({
            username: "user4",
            password: "badpassword",
          })
          .expect(412)
          .expect({code: 412, msg: 'Register failed. Bad password.'});
      });
      after(() => {
        return request(api)
          .get("/api/users")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(2);
            let result = res.body.map((user) => user.username);
            expect(result).to.have.members(["user1", "user2"]);
          });
      });
    });
    describe("input nothing", () => {
      it("should return the message to ask for input", () => {
        return request(api)
          .post("/api/users")
          .send({})
          .expect(401)
          .expect({success: false, msg: 'Please pass username and password.'});
      });
      after(() => {
        return request(api)
          .get("/api/users")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(2);
            let result = res.body.map((user) => user.username);
            expect(result).to.have.members(["user1", "user2"]);
          });
      });
    });
  });

  describe("PUT / ", () => {
    describe("valid id", () => {
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
        return request(api)
          .get("/api/users")
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
            done();
          });
      });
      after(() => {
        return request(api)
          .get("/api/users")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body[0]).to.have.property("favourites");
          });
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
    // describe("duplicated favourites movies ", () => {
    //   it("should return the duplicated info and a status 201", (done) => {
    //     request(api)
    //       .post("/api/users/user1/favourites")
    //       .send({
    //         id: `${sampleMovie.id}`,
    //         title: `${sampleMovie.title}`
    //       })
    //       .expect("Content-Type", /json/)
    //       .expect(201)
    //       .then((err, res) => {
    //         expect(res.body).to.have.property("favourites");
    //         done();
    //       });
    //     request(api)
    //       .post("/api/users/user1/favourites")
    //       .send({
    //         id: `${sampleMovie.id}`,
    //         title: `${sampleMovie.title}`
    //       })
    //       .expect("Content-Type", /json/)
    //       .expect(201)
    //       .then((err, res) => {
    //         expect(res.body).to.have.property("msg",'Already have this movie');
    //       });
    //   });
    // });
  });
});