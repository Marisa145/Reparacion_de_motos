const Repairs = require('../models/repairs.model');

exports.validIfExistRepair = async (req, res, next) => {
  try {
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
      return res.status(404).json({
        status: 'error',
        message: 'Repairs not found',
      });
    }

    req.repairs = repairs;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
