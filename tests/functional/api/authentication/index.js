/* eslint-disable no-undef */
import chai from "chai";
import request from "supertest";
import User from "../../../../api/users/userModel";
import loglevel from 'loglevel';

const expect = chai.expect;

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

describe("Authentication", () => {
    beforeEach(async () => {
        try {
            api = require("../../../../index");
            await User.deleteMany({});
            await users.forEach(user => User.create(user));
        } catch (err) {
            loglevel.error(`failed to Load user Data: ${err}`);
        }
    });
    afterEach(() => {
        api.close();
        delete require.cache[require.resolve("../../../../index")];
    });
    describe("Login", () => {
        describe("no such user (wrong username)", () => {
          it("should return user not found message and a status 401", () => {
            return request(api)
              .post("/api/users")
              .send({
                username: "user4",
                password: "test1",
              })
              .expect(401)
              .expect({ code: 401, msg: 'Authentication failed. User not found.'});
          });
        });
        describe("wrong password", () => {
          it("should return wrong password message and a status 401", () => {
            return request(api)
              .post("/api/users")
              .send({
                username: "user1",
                password: "wrongpwd",
              })
              .expect(401)
              .expect({ code: 401, msg: 'Authentication failed. Wrong password.'});
          });
        });
        describe("correct username and password", () => {
            it("should return a status 200 and a BEARER token", () => {
              return request(api)
                .post("/api/users")
                .send({
                  username: "user1",
                  password: "test1",
                })
                .expect(200)
                .then((res) => {
                    expect(res.body).to.have.property("success",true);
                    expect(res.body).to.have.property("token");
                });
            });
        });
        describe("no username or password", () => {
            it("should return a 401 status and ask for username and password when input nothing", () => {
              return request(api)
                .post("/api/users")
                .send({})
                .expect(401)
                .expect({
                  success: false,
                  msg: 'Please pass username and password.',
                });
            });
        });
    });
});