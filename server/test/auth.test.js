const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../src/server");
const color = require("colors");
const { dbConnection } = require("../src/database/database");

chai.use(chaiHttp);
let id;

describe("Test on auth controllers", () => {
  it(
    color.yellow.bold(
      "Should register an User, have status 200, return an object with User data."
    ),
    (done) => {
      let user = {
        name: "Pedro",
        username: "pedro-dev",
        email: "pedro@gmail.com",
        password: "pedro2023",
      };

      chai
        .request(server)
        .post("/api/auth/register")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          id = res.body.user.id;
          done();
        });
    }
  );

  it(
    color.yellow.bold(
      "Should get user by ID, have status 200, return found user."
    ),
    (done) => {
      chai
        .request(server)
        .get(`/api/user/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
        });
    }
  );

  it(
    color.yellow.bold(
      "Should login an existing User, have status 200, return Token."
    ),
    (done) => {
      let user = {
        email: "pedro@gmail.com",
        password: "pedro2023",
      };
      chai
        .request(server)
        .post("/api/auth/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("token");
          done();
        });
    }
  );

  after((done) => {
    const query = "DELETE FROM users";
    dbConnection()
      .then((connection) => {
        connection.query(query, (err, result) => {
          if (err) {
            console.log("Error to DELETE users on testing.", err.message);
            done(err);
          } else {
            connection.end((err) => {
              if (err) {
                console.log("Error to CLOSE database elearning.");
                done(err);
              } else {
                done();
              }
            });
          }
        });
      })
      .catch((err) => {
        console.log("Error to establish database connection.", err.message);
        done(err);
      });
  });
});
