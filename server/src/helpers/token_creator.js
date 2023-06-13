const jwt = require("jwt-simple");
let moment = require("moment");
require("dotenv").config();

exports.createToken = (user) => {
  let payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(24, "hours").unix(),
  };
  return jwt.encode(payload, process.env.SECRET_TOKEN);
};
