const express = require('express');
const router  = express.Router();
const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');
const usersController = require('../controllers/users');
const placesController = require('../controllers/places');
const secureRoute = require('../lib/secureRoute');

// A home route
router.get('/', (req, res) => res.render('homepage'));

router.get('/profile', (req, res) => res.render('profile'));

// router.route('/hotels')
//   .get(hotelsController.index)
//   .post(secureRoute, hotelsController.create);
//
// router.route('/hotels/new')
//   .get(secureRoute, hotelsController.new);
//
// router.route('/hotels/:id')
//   .get(hotelsController.show)
//   .put(secureRoute, hotelsController.update)
//   .delete(secureRoute, hotelsController.delete);
//
// router.route('/hotels/:id/edit')
//   .get(secureRoute, hotelsController.edit);
//

router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/logout')
  .get(sessionsController.delete);

router.route('/profile')
  .get(secureRoute, usersController.show) //have edit button on profile
  .put(secureRoute, usersController.update)
  .delete(secureRoute, usersController.delete);//have delete button on profile

router.route('/profile/edit')
  .get(secureRoute, usersController.edit); //edit the details

router.route('/profile/placesBeen')
  .get(secureRoute, placesController.new);
  .put(secureRoute, placesController.update)
  .delete(secureRoute, usersController.delete);

router.route('/profile/placesBeen/edit')
  .get(secureRoute, placesController.edit);



router.all('*', (req, res) => res.notFound());


module.exports = router;
