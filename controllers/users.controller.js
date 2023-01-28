const User = require('../models/user.model');

exports.findAllUsers = async (req, res) => {
  try {
    // 1. BUSCAR TODOS LOS USUARIOS QUE ESTAN CON STATUS TRUE
    const users = await User.findAll({
      where: {
        status: 'available',
      },
    });
    // 2. ENVIAR UNA RESPUESTA AL USUARIO
    res.status(200).json({
      status: 'success',
      message: 'Users was found successfully',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.findOneUser = async (req, res) => {
  try {
    const { user } = req;

    // 4. ENVIAR UNA RESPUESTA AL USUARIO
    res.status(200).json({
      status: 'success',
      message: 'User was found successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    //1. OBTENER LA INFORMACION DE LA REQ.BODY
    const { name, email, password, role } = req.body;
    //2. CREAR EL USUARIO CON LA INFORMACION DE LA REQ.BODY
    const user = await User.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password,
      role: role.toLowerCase(),
    });
    //3. ENVIAR UNA RESPUESTA AL USUARIO
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // 2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
    const { username, email } = req.body;
    const { user } = req;

    // 5. REALIZAR LA ACTUALIZACIÓN DEL USUARIO, CAMPOS USERNAME, EMAIL
    await user.update({ username, email });

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

exports.deleteUser = async (req, res) => {
  try {
    const { user } = req;
    // 4. REALIZAR LA ACTUALIZACIÓN DEL STATUS DEL USUARIO ENCONTRADO ANTERIORMENTE
    await user.update({ status: false });
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
