const Place = require('../models/place');
const User = require('../models/user');

// POST /places/been create form with places been new, and the routes for them
//(one places model). decide the routes where you show both of these. loop through the user arrays and then go over the loops on the relevant pages i.e. on profile

//you can set any url to give any view page, so set different urls and the same view page to show different things on the one page (and to tell if you have a post request with a specific url)
function profileIndex(req, res, next) {
  User
    .find()
    .then((users)=> res.render('users/profile', {users}))
    .catch(next);
}

function placesBeenNew(req, res) {
  return res.render('profile/placesBeen/new');
}

function placesBeenCreate(req, res, next) {
  req.body.status = 'been';

  Place
    .create(req.body)
    .then((place) => {
      req.user.placesBeen.push(place.id);
      return req.user.save();
    })
    .then((user) => res.redirect('/profile'))
    .catch(next);
}

function placesToGoNew(req, res) {
  return res.render('profile/placesToGo/new');
}
// POST /places/togo
function placesToGoCreate(req, res, next) {
  req.body.status = 'toGo';

  Place
    .create(req.body)
    .then(place => {
      req.user.placesToGo.push(place.id);
      return req.user.save();
    })
    .then((user) => res.redirect('/profile'))
    .catch(next);
}

function placesBeenDelete(req, res) {
  User.placesBeen = [];
  req.session.regenerate(() => res.redirect('/'));
}

function placesToGoDelete(req, res) {
  User.placesToGo = [];
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  index: profileIndex,
  newpB: placesBeenNew,
  newpTG: placesToGoNew,
  createpB: placesBeenCreate,
  createpTG: placesToGoCreate,
  deletepB: placesBeenDelete,
  deletepTG: placesToGoDelete
};
