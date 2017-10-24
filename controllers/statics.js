const User = require('../models/user');

function staticsIndex(req, res) {
  // check if logged in
  if (!req.session.isAuthenticated) {
    console.log('I\'m not logged in');
    res.redirect('/login');
  } else {
    User
      .findById(req.session.userId)
      .populate('placesBeen')
      .exec()
      .then(user => {
        res.render('homepage', { user });
      });
  }
}

module.exports = {
  index: staticsIndex
};
