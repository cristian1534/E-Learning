const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../src/server");
const color = require("colors");

chai.use(chaiHttp);

describe("Test on tutorial controller", () => {
  it(
    color.yellow.bold(
      "Should get React videos, have status 200, return an array of youtube videos"
    ),
    (done) => {
      chai
        .request(server)
        .get("/api/tutorial/react")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    }
  );

   it(
    color.yellow.bold(
      "Should get NodeJs videos, have status 200, return an array of youtube videos"
    ),
    (done) => {
      chai
        .request(server)
        .get("/api/tutorial/node")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    }
  );
});
