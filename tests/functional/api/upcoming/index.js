/* eslint-disable no-undef */
import chai from "chai";
import request from "supertest";
import Upcoming from "../../../../api/upcoming/upcomingModel";
import {upcomings} from '../../../../seedData/upcoming.js';
import loglevel from 'loglevel';

const expect = chai.expect;

let api;
let token;

const sampleMovie = {
  id: 508442,
  title: "Soul",
};

describe("Upcoming endpoint", function (){
  beforeEach(async () => {
    try {
      api = require("../../../../index");
      await Upcoming.deleteMany();
      await Upcoming.collection.insertMany(upcomings);
    } catch (err) {
      loglevel.info(`failed to Load Data: ${err}`);
    }
    return request(api)
        .post("/api/authentication")
        .send({
          username: "user1",
          password: "test1",
        })
        .expect(200)
        .then((res) => {
          token= res.body.token;
        });
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
    delete require.cache[require.resolve("../../../../index")];
  });
  
  describe("GET / ", () => {
    it("should return 20 upcoming movies and a status 200", (done) => {
      request(api)
        .get("/api/movies")
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
          done();
        });
    });
  });

  describe("POST /", () => {
    describe("post movie with id", () => {
      it("should return the new movie and a status 201", () => {
        return request(api)
        .post("/api/upcoming")
        .set("Authorization", token)
        .send({
          id : 20091632,
          title : "test",
          contains : "test"
        })
        .expect(201)
        .then((res) => {
          expect(res.body).to.have.property("id",20091632);
          expect(res.body).to.have.property("title","test");
        });
      });
    });
    describe("post movie without id", () => {
      it("should generate id automatically", () => {
        return request(api)
        .post("/api/upcoming")
        .set("Authorization", token)
        .send({
          title : "test",
          contains : "test"
        })
        .expect(201)
        .then((res) => {
          expect(res.body).to.have.property("title","test");
          expect(res.body).to.have.property("id");
        });
      });
    });
    describe("when no title", () => {
      it("should return the message of asking for a title", () => {
        return request(api)
        .post("/api/upcoming")
        .set("Authorization", token)
        .send({
          contains : "test"
        })
        .expect(412)
        .expect({ code: 412,  msg: 'Please add a title' });
      });
    });
  });

  describe("GET /upcoming/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/api/upcoming/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", sampleMovie.title);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the invaild id message when input is not a number", () => {
        return request(api)
          .get(`/api/upcoming/xxx`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({code: 404, msg: 'Invaild movie id.'});
      });
      it("should return the NOT found message when not found this id", () => {
        return request(api)
          .get(`/api/upcoming/111`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({code: 404, msg: 'The resource you requested could not be found.'});
      });
    });
  });

  describe("DELETE /upcoming/:id", () => {
    describe("when the id is valid", () => {
      it("should return success message and a status 200", () => {
        return request(api)
          .delete(`/api/upcoming/${sampleMovie.id}`)
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .expect({ code: 200, msg: 'Delete successfully'});
      });
      after(()=>{
        return request(api)
          .get(`/api/upcoming/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({code: 404, msg: 'The resource you requested could not be found.'});
      });
    });
    describe("when the id is invalid", () => {
      it("should return the invaild id message", () => {
        return request(api)
          .delete(`/api/upcoming/xxx`)
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({code: 404, msg: 'Invaild movie id.'});
      });
    });
  });
});