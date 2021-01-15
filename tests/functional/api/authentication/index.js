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
    describe("Authentication Endpoint",() => {
        describe("Login", () => {
            describe("no such user (wrong username)", () => {
              it("should return user not found message and a status 401", () => {
                return request(api)
                  .post("/api/authentication")
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
                  .post("/api/authentication")
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
                    .post("/api/authentication")
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
                    .post("/api/authentication")
                    .send({})
                    .expect(401)
                    .expect({
                      success: false,
                      msg: 'Please pass username and password.',
                    });
                });
            });
        });
        describe("Register ", () => {
            describe("valid password", () => {
              it("should return a 200 status and the confirmation message", () => {
                return request(api)
                  .post("/api/authentication?action=register")
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
                  .post("/api/authentication?action=register")
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
            describe("existing username", () => {
              it("should return Register failed message with a existing username message", () => {
                return request(api)
                  .post("/api/authentication?action=register")
                  .send({
                    username: "user1",
                    password: "test1",
                  })
                  .expect(412)
                  .expect({code: 412, msg: 'Already exists this user, please try another username.'});
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
                  .post("/api/authentication")
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
    });
});