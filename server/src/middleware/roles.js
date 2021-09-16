const abortUnauthorized = (res) => {
  res.status('403').send({ message: 'Unauthorized' });
}

module.exports = function (req, res, next) {
  if (req.sso?.user && (
      req.sso.user.roles.includes('ACC_ADMIN') ||
      req.sso.user.roles.includes('ACC_CRM')
  )) {
    next();
  } else {
    abortUnauthorized(res);
  }

}