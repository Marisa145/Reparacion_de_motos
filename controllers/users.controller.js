const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllUsers = catchAsync(async (req, res) => {
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
  
});

exports.findOneUser = catchAsync(async (req, res) => {
    const { user } = req;

    // 4. ENVIAR UNA RESPUESTA AL USUARIO
    res.status(200).json({
      status: 'success',
      message: 'User was found successfully',
      user,
    });
  
});

exports.createUser = catchAsync(async(req, res) => {
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
});

exports.updateUser = catchAsync(async(req, res) => {
    // 1. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
    const { username, email } = req.body;
    const { user } = req;

    // 2. REALIZAR LA ACTUALIZACIÓN DEL USUARIO, CAMPOS USERNAME, EMAIL
    await user.update({ username, email });

    // 6. ENVIAR UNA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
    });
  
});

exports.deleteUser = catchAsync(async (req, res) => {
  
    const { user } = req;
    // 4. REALIZAR LA ACTUALIZACIÓN DEL STATUS DEL USUARIO ENCONTRADO ANTERIORMENTE
    await user.update({ status: false });
    // 5. ENVIAR UNA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  
});
