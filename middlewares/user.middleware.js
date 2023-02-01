const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync')

exports.validIfExistUser = async (req, res, next) => {
  try {
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
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
