const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfExistUser = catchAsync(async (req, res, next) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { id } = req.params;
  // 2. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA AVAILABLE
  const user = await User.findOne({
    where: {
      status: 'available',
      id,
    },
  });
  //3. SI NO EXISTE UN USUARIO ENVIAR UN ERROR
  if (!user) {
    return next(new AppError('User not found', 400));
  }

  req.user = user;
  next();
});
