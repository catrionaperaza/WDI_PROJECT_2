const Place = require('../models/place');

// POST /places/been create form with places been new, and the routes for them
//(one places model). decide the routes where you show both of these. loop through the user arrays and then go over the loops on the relevant pages i.e. on profile

function placesBeenCreate(req, res, next) {
  req.body.status = 'been';

  Place
    .create(req.body)
    .then(place => {
      req.user.placesBeen.push(place.id);
      return req.user.save();
    })
    .then((user) => res.redirect('/profile'))
    .catch(next);
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

module.exports = {
  create: placesBeenCreate,
  create2: placesToGoCreate
};
