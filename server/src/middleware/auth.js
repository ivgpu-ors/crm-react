const jwt = require('jwt-simple');
const publicKey = require('../lib/publicKey');

const abortUnauthenticated = (res) => {
  res.status('401').send({ message: 'Unauthenticated' });
}

module.exports = function (req, res, next) {
  const token = req.cookies.ivgpu_auth;
  const key = publicKey();

  try {
    req.sso = { user: jwt.decode(token, key) };
    next();
  } catch (e) {
    console.log(e);
    abortUnauthenticated(res);
  }

}