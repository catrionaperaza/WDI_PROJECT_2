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
  .put(secureRoute, usersController.update); //have edit details button on profile

router.route('/profile/:id/edit')
  .get(secureRoute, usersController.edit); //page with edit the details

router.route('/profile/:id/places/new') //new ejs page with form
  .get(secureRoute, placesController.new)
  .post(secureRoute, placesController.create);

router.route('/profile/:id/places/:placesId')
  .get(secureRoute, placesController.show)
  .put(secureRoute, placesController.update)
  .delete(secureRoute, placesController.delete);

router.route('/profile/:id/places/:placesId/edit')
  .get(secureRoute, placesController.edit);


router.all('*', (req, res) => res.notFound());

module.exports = router;
