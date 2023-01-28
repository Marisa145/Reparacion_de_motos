const Repairs = require('../models/repairs.model');
exports.pendingListRepairs = async (req, res) => {
  try {
    // 1. BUSCAR TODOS LOS USUARIOS QUE ESTAN CON STATUS PENDING
    const repairs = await Repairs.findAll({
      where: {
        status: 'pending',
      },
    });
    // 2. ENVIAR UNA RESPUESTA AL USUARIO
    res.status(200).json({
      status: 'success',
      message: 'Users was found successfully',
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
exports.pendingOneRepair = async (req, res) => {
  try {
    const { repairs } = req;

    // 4. ENVIAR UNA RESPUESTA AL USUARIO
    res.status(200).json({
      status: 'success',
      message: 'Repairs was found successfully',
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.createDate = async (req, res) => {
  try {
    //1. OBTENER LA INFORMACION DE LA REQ.BODY
    const { date, userId } = req.body;
    //2. CREAR EL USUARIO CON LA INFORMACION DE LA REQ.BODY
    const repairs = await Repairs.create({
      date,
      userId,
    });
    //3. ENVIAR UNA RESPUESTA AL USUARIO
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      repairs,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.updateStatusRepairs = async (req, res) => {
  try {
    // 2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
    const { repairs } = req;

    // 5. REALIZAR LA ACTUALIZACIÓN DEL USUARIO, CAMPOS USERNAME, EMAIL
    await repairs.update({ status: "completed" });

    // 6. ENVIAR UNA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.cancelRepair = async (req, res) => {
  try {
    const { repairs } = req;
    // 4. REALIZAR LA ACTUALIZACIÓN DEL STATUS DEL USUARIO ENCONTRADO ANTERIORMENTE
    await repairs.update({ status: "cancelled"});
    // 5. ENVIAR UNA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
