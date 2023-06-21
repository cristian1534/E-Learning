const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../src/server");
const color = require("colors");
const { dbConnection } = require("../src/database/database");

chai.use(chaiHttp);
let id;

describe("Test on contact controller", () => {
  it(
    color.yellow.bold(
      "Should create a Message, have status 200, return an object with Message data."
    ),
    (done) => {
      let message = {
        name: "Cristian",
        email: "cristian@gmail.com",
        message: "This is a test message.",
      };
      chai
        .request(server)
        .post("/api/contact")
        .send(message)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          id = res.body.contact.id;
          console.log(id)
          done();
        });
    }
  ),
    it(
      color.yellow.bold(
        "Should get all messages, have status 200, return an array of messages"
      ),
      (done) => {
        chai
          .request(server)
          .get("/api/contact")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      }
    );

  it(
    color.yellow.bold(
      "Should delete message, have status 200, return a message"
    ),
    (done) => {
      chai
        .request(server)
        .delete(`/api/contact/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Message deleted successfully");
          done();
        });
    }
  );

  after((done) => {
    const query = "DELETE FROM contact";
    dbConnection()
      .then((connection) => {
        connection.query(query, (err, result) => {
          if (err) {
            console.log("Error to DELETE messages on testing.", err.message);
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
