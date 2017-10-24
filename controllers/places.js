const Place = require('../models/place');
const User = require('../models/user');

// POST /places/been create form with places been new, and the routes for them
//(one places model). decide the routes where you show both of these. loop through the user arrays and then go over the loops on the relevant pages i.e. on profile

//you can set any url to give any view page, so set different urls and the same view page to show different things on the one page (and to tell if you have a post request with a specific url)
function placesBeenNew(req, res) {
  return res.render('placesBeen/new');
}

function placesBeenCreate(req, res, next) {
  req.body.status = 'been';
  console.log('Im hit');
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
  User.placesBeen = [];
  req.session.regenerate(() => res.redirect('/'));
}

function placesToGoNew(req, res) {
  return res.render('placesToGo/new');
}
// POST /places/togo
function placesToGoCreate(req, res, next) {
  req.body.status = 'to go';
  Place
    .create(req.body)
    .then((place) => {
      User
        .findById(req.params.id)
        .exec()
        .then(user => {
          user.placesToGo.push(place.id);
          return user.save();
        });
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(next);
}

function placesToGoShow(req, res) {
  Place
    .findById(req.params.placesToGoId)
    .exec()
    .then(place => {
      console.log(place);
      res.render('placesToGo/show', {place});
    });
}

function placesToGoEdit(req,res) {
  Place
    .findById(req.params.placesBeenId)
    .exec()
    .then(place => {
      res.render('placesToGo/edit', {place});
    });
}

function placesToGoUpdate(req, res) {
  Place
    .findById(req.params.placesToGoId)
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
          res.redirect(`/profile/${req.session.userId}/placesToGo/${place._id}`);
        });
    });
}

function placesToGoDelete(req, res) {
  User.placesToGo = [];
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  newpB: placesBeenNew,
  newpTG: placesToGoNew,
  createpB: placesBeenCreate,
  createpTG: placesToGoCreate,
  showpB: placesBeenShow,
  showpTG: placesToGoShow,
  editpB: placesBeenEdit,
  editpTG: placesToGoEdit,
  updatepB: placesBeenUpdate,
  updatepTG: placesToGoUpdate,
  deletepB: placesBeenDelete,
  deletepTG: placesToGoDelete
};
