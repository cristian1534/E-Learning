const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../src/server");
const color = require("colors");

chai.use(chaiHttp);

describe("Testing on material controller", () => {
  it(
    color.yellow.bold(
      "Should get React doc, have status 200, return an array of docs"
    ),
    (done) => {
      chai
        .request(server)
        .get("/api/react-doc/get")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    }
  );

  it(
    color.yellow.bold(
      "Should get Node doc, have status 200, return an array of docs"
    ),
    (done) => {
      chai
        .request(server)
        .get("/api/node-doc/get")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    }
  );

  it(
    color.yellow.bold(
      "Should get Test Front doc, have status 200, return an array of docs"
    ),
    (done) => {
      chai
        .request(server)
        .get("/api/test-doc/get-front")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    }
  );

    it(
    color.yellow.bold(
      "Should get Test Back doc, have status 200, return an array of docs"
    ),
    (done) => {
      chai
        .request(server)
        .get("/api/test-doc/get-back")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    }
  );

   it(
    color.yellow.bold(
      "Should get Redux doc, have status 200, return an array of docs"
    ),
    (done) => {
      chai
        .request(server)
        .get("/api/redux-doc/get")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    }
  );
});
