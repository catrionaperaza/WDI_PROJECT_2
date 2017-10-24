const User = require('../models/user');

function showRoute(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      return res.render('users/show', { user });
    });
}

function editRoute(req, res) {
  return res.render('users/edit');
}

function updateRoute(req, res, next) { //need to fix this one
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      for(const field in req.body) {
        req.user[field] = req.body[field];
      }

      req.user.save()
        .then((user) => res.redirect('/'))
        .catch((err) => {
          if(err.name === 'ValidationError') return res.badRequest('/profile/:id/edit', err.toString());
          next(err);
        });
    });
}


module.exports = {
  show: showRoute,
  edit: editRoute,
  update: updateRoute
};
