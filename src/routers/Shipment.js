const express = require('express');
const {
  create, findOne, deleteOne, updateOne, findAll, deleteAll
} = require('../controllers/Shipment');
const { isAuth } = require('../middleware/passport');

const router = express.Router();

// set authentication middleware on all shipment router
router.use(isAuth);

router.route('/').post(create).get(findAll).delete(deleteAll);
router.route('/:shipmentId').get(findOne).put(updateOne).delete(deleteOne);

module.exports = router;
