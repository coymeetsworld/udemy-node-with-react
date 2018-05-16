// middlewares are just little functions we can reuse in our different route handlers


module.exports = (req, res, next) => { //next is the function we call after this middleware is finished.
  if (!req.user) { // if no user is signed in
    return res.status(401).send({ error: 'You must log in!'}); // don't need to call next if we found an error.
    // 401: HTTP status code for unauthorized
  }

  next();
};