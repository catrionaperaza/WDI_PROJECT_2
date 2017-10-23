const express = require('express');
const router  = express.Router();
const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');
const usersController = require('../controllers/users');
const placesController = require('../controllers/places');
const secureRoute = require('../lib/secureRoute');

// A home route
router.get('/', (req, res) => res.render('homepage'));

// router.get('/profile', (req, res) => res.render('profile')); //do I need this twice?

router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/logout')
  .get(sessionsController.delete);

router.route('/profile')
  .get(secureRoute, usersController.show) //shows user details (they registered with)
  .put(secureRoute, usersController.update)//have edit details button on profile
  .delete(secureRoute, usersController.delete);//have delete details button on profile

router.route('/profile/edit')
  .get(secureRoute, usersController.edit); //page with edit the details

router.route('/profile/placesBeen/new') //new ejs page with form
  .get(secureRoute, placesController.new)
  .post(secureRoute, placesController.createpB);

router.route('/profile/placesBeen') //this is on main profile (on controller tell it to stay here)
  .get(secureRoute, placesController.show)
  .put(secureRoute, placesController.update)
  .delete(secureRoute, placesController.delete);

router.route('/profile/placesBeen/edit') //page with edit the places been details
  .get(secureRoute, placesController.edit);

router.route('/profile/placesToGo/new') //new ejs page with form
  .get(secureRoute, placesController.new)
  .post(secureRoute, placesController.createpTG);

router.route('/profile/placesToGo') //this is on main profile (on controller tell it to stay here)
  .get(secureRoute, placesController.show)
  .put(secureRoute, placesController.update)
  .delete(secureRoute, placesController.delete);

router.route('/profile/placesToGo/edit') //page with edit the places been details
  .get(secureRoute, placesController.edit);


router.all('*', (req, res) => res.notFound());


module.exports = router;
