const { Router } = require('express');
const {
  pendingListRepairs,
  pendingOneRepair,
  createDate,
  updateStatusRepairs,
  cancelRepair,
} = require('../controllers/repairs.controller');
const { validIfExistRepair } = require('../middlewares/repairs.middleware');

const router = Router();

router.get('/', pendingListRepairs);

router.get('/:id', validIfExistRepair, pendingOneRepair);

router.post('/', createDate);

router.patch('/:id', validIfExistRepair, updateStatusRepairs);

router.delete('/:id', validIfExistRepair, cancelRepair);

module.exports = {
  repairsRouter: router,
};
