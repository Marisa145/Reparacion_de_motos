const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');
const { validIfExistUser } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findAllUsers);

router.get('/:id', validIfExistUser, findOneUser);

router.post(
  '/',
  [
    check('name', 'The username must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.patch(
  '/:id',
  [
    check('date', 'The date must be a have the next format : DD-MM-YYYY ').isDate({format: 'DD-MM-YYYY'}),
    check('motorsNumber', 'The motorsNumber must be a number').isNumeric(),
    check('description', 'The email must be a correct format').not().isEmpty(),
    validateFields,
    validIfExistUser,
  ],
  updateUser
);

router.delete('/:id', validIfExistUser, deleteUser);

module.exports = {
  usersRouter: router,
};
