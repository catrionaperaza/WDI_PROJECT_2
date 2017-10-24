const Place = require('../models/place');
const User = require('../models/user');

function placesBeenNew(req, res) {
  return res.render('placesBeen/new');
}

function placesBeenCreate(req, res, next) {
  req.body.status = 'been';

  Place
    .create(req.body)
    .then((place) => {
      User
        .findById(req.params.id)
        .exec()
        .then(user => {
          user.placesBeen.push(place.id);
          return user.save();
        });
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(next);
}

function placesBeenShow(req, res) {
  Place
    .findById(req.params.placesBeenId)
    .exec()
    .then(place => {
      console.log(place);
      res.render('placesBeen/show', {place});
    });
}

function placesBeenEdit(req,res) {
  Place
    .findById(req.params.placesBeenId)
    .exec()
    .then(place => {
      res.render('placesBeen/edit', {place});
    });
}

function placesBeenUpdate(req, res) {
  Place
    .findById(req.params.placesBeenId)
    .exec()
    .then(place => {
      User
        .findById(req.params.id)
        .exec()
        .then(user => {
          console.log(user.placesBeen);
          for(const field in req.body) {
            place[field] = req.body[field];
          }
          return place.save();
        })
        .then(place => {
          res.redirect(`/profile/${req.session.userId}/placesBeen/${place._id}`);
        });
    });
}

function placesBeenDelete(req, res) {
  console.log('Im hit');
  Place
    .findById(req.params.id)
    .exec()
    .then(place => {
      if (!place) return res.notFound();
      return place.remove();
    })
    .then(() => res.redirect('/'));
}

module.exports = {
  newpB: placesBeenNew,
  createpB: placesBeenCreate,
  showpB: placesBeenShow,
  editpB: placesBeenEdit,
  updatepB: placesBeenUpdate,
  deletepB: placesBeenDelete
};
