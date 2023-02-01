const Repairs = require('../models/repairs.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfExistRepair = catchAsync(async (req, res, next) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { id } = req.params;
  // 2. OBTENER UNA REPARACION  POR SU ID Y QUE EL STATUS SEA PENDING
  const repairs = await Repairs.findOne({
    where: {
      status: 'pending',
      id,
    },
  });
  //3. SI NO EXISTE UN USUARIO ENVIAR UN ERROR
  if (!repairs) {
    return next(new AppError('Repairs not found', 400));
  }

  req.repairs = repairs;
  next();
});
