const User = require('../models/user');


function newRoute(req, res) {
  return res.render('registrations/new');
}

function createRoute(req, res) {//next may become a problem
  User
    .create(req.body)
    .then((user) => {
      req.session.userId = user._id;
      req.session.isAuthenticated = true;
      res.redirect('/');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).render('registrations/new', { message: 'Passwords do not match' });
      }
      res.status(500).end();
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
