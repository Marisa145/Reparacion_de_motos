const { Router } = require('express');
const { check } = require('express-validator');
const {
  pendingListRepairs,
  pendingOneRepair,
  createDate,
  updateStatusRepairs,
  cancelRepair,
} = require('../controllers/repairs.controller');
const { protectAccountOwner } = require('../middlewares/auth.middleware');
const { validIfExistRepair } = require('../middlewares/repairs.middleware');

const router = Router();

router.get('/', pendingListRepairs);

router.get('/:id', validIfExistRepair, pendingOneRepair);

router.post('/', [
  check('date', 'The date must be a have the next format : DD-MM-YYYY ').isDate(
    { format: 'DD-MM-YYYY' }
  ),
  check('motorsNumber', 'The motorsNumber must be a number').isNumeric(),
  check('description', 'The email must be a correct format').not().isEmpty(),
  createDate,
]);

router.patch('/:id', [
  check('date', 'The date must be a have the next format : DD-MM-YYYY ').isDate(
    { format: 'DD-MM-YYYY' }
  ),
  check('motorsNumber', 'The motorsNumber must be a number').isNumeric(),
  check('description', 'The email must be a correct format').not().isEmpty(),
  validIfExistRepair,
  updateStatusRepairs,
]);

router.delete('/:id', validIfExistRepair, protectAccountOwner, cancelRepair);

module.exports = {
  repairsRouter: router,
};
