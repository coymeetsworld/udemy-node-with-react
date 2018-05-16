
module.exports = (req, res, next) => {

  if (req.user.credits <= 0) {
    // Just send any 4xx request to indicate user did something wrong
    return res.status(403).send({ error: 'Not enough credits!'});
  }

  next();
}