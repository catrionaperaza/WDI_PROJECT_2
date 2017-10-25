const Place = require('../models/place');
const User = require('../models/user');

function placesNew(req, res) {
  return res.render('places/new');
}

function placesCreate(req, res) {
  Place
    .create(req.body)
    .then(place => {
      User
        .findById(req.params.id)
        .exec()
        .then(user => {
          user.places.push(place.id);
          return user.save();
        })
        .then(user => {
          for(const field in req.body) {
            place[field] = req.body[field];
          }
          return place.save();
        })
        .then(place => {
          res.redirect(`/profile/${req.session.userId}/places/${place._id}`);
        });
    });
}

function placesShow(req, res) {
  Place
    .findById(req.params.placesId)
    .exec()
    .then(place => {
      console.log(place);
      res.render('places/show', {place});
    });
}

function placesEdit(req,res) {
  Place
    .findById(req.params.placesId)
    .exec()
    .then(place => {
      res.render('places/edit', {place});
    });
}

function placesUpdate(req, res) {
  Place
    .findById(req.params.placesId)
    .exec()
    .then(place => {
      User
        .findById(req.params.id)
        .exec()
        .then(user => {
          for(const field in req.body) {
            place[field] = req.body[field];
          }
          return place.save();
        })
        .then(place => {
          res.redirect(`/profile/${req.session.userId}/places/${place._id}`);
        });
    });
}

function placesDelete(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      console.log(user);
      Place
        .findById(req.params.placesId)
        .exec()
        .then(place => {
          console.log('Im hit');
          console.log(place);
          if (!place) return res.notFound();
          return place.remove();
        });

    })
    .then(() => res.redirect('/'));
}

module.exports = {
  new: placesNew,
  create: placesCreate,
  show: placesShow,
  edit: placesEdit,
  update: placesUpdate,
  delete: placesDelete
};
