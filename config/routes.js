const express = require('express');
const router  = express.Router();
const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');
// const placesBeenController = require('../controllers/placesBeen');
// const placesToGoController = require('../controllers/placesToGo');
// const secureRoute = require('../lib/secureRoute');

// A home route
router.get('/', (req, res) => res.render('homepage'));

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

// router.route('/profile')
//   .get(secureRoute, registrationsController.show)
//   .put(secureRoute, registrationsController.update)
//   .delete(secureRoute, registrationsController.delete);
//
// router.route('/profile/edit')
//   .get(secureRoute, registrationsController.edit);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/logout')
  .get(sessionsController.delete);

router.all('*', (req, res) => res.notFound());


module.exports = router;
