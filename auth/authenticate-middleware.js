/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  if (req.session.loggedin && (req.session.loggedin === true)) {
    next();
  } else {res.status(400).json({ message: 'Nice marmot.'})}
};
