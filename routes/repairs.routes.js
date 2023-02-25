const { Router } = require('express');
const { check } = require('express-validator');
const {
  pendingListRepairs,
  pendingOneRepair,
  createDate,
  updateStatusRepairs,
  cancelRepair,
} = require('../controllers/repairs.controller');
const {
  protectAccountOwner,
  restrictTo,
  protect,
} = require('../middlewares/auth.middleware');
const { validIfExistRepair } = require('../middlewares/repairs.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.post('/', [
  check('date', 'Date is Require').not().isEmpty(),
  check('motorsNumber', 'The motorsNumber must be a number').isNumeric(),
  check('description', 'The email must be a correct format').not().isEmpty(),
  validateFields,
  createDate,
]);

router.use(protect);

router.get('/', restrictTo('employee'), pendingListRepairs);

router.get(
  '/:id',
  validIfExistRepair,
  restrictTo('employee'),
  pendingOneRepair
);

router.patch('/:id', [
  check('date', 'The date must be a have the next format : DD-MM-YYYY ').isDate(
    { format: 'DD-MM-YYYY' }
  ),
  check('motorsNumber', 'The motorsNumber must be a number').isNumeric(),
  check('description', 'The email must be a correct format').not().isEmpty(),
  validIfExistRepair,
  restrictTo('employee'),
  updateStatusRepairs,
]);

router.delete(
  '/:id',
  validIfExistRepair,
  protectAccountOwner,
  restrictTo('employee'),
  cancelRepair
);

module.exports = {
  repairsRouter: router,
};
