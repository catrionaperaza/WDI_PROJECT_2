const express = require('express');
const router  = express.Router();
const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');
const usersController = require('../controllers/users');
const placesController = require('../controllers/places');
const secureRoute = require('../lib/secureRoute');
const statics = require('../controllers/statics');

// A home route
router.route('/')
  .get(statics.index);

router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/logout')
  .get(sessionsController.delete);

router.route('/profile/:id')
  .get(secureRoute, usersController.show) //shows user details (they registered with)
  .put(secureRoute, usersController.update)//have edit details button on profile
  .delete(secureRoute, usersController.delete);//have delete details button on profile

router.route('/profile/:id/edit')
  .get(secureRoute, usersController.edit); //page with edit the details

router.route('/profile/:id/placesBeen/new') //new ejs page with form
  .get(secureRoute, placesController.newpB)
  .post(secureRoute, placesController.createpB);

router.route('/profile/:id/placesBeen/:placesBeenId')
  .get(secureRoute, placesController.showpB)
  .put(secureRoute, placesController.updatepB);

router.route('/profile/:id/placesBeen/:placesBeenId/edit')
  .get(secureRoute, placesController.editpB);

router.route('/profile/:id/placesToGo/new') //new ejs page with form
  .get(secureRoute, placesController.newpTG)
  .post(secureRoute, placesController.createpTG);

router.route('/profile/:id/placesToGo/:placesToGoId')
  .get(secureRoute, placesController.showpTG)
  .put(secureRoute, placesController.updatepTG);

router.route('/profile/:id/placesToGo/:placesToGoId/edit')
  .get(secureRoute, placesController.editpTG);



router.all('*', (req, res) => res.notFound());


module.exports = router;
