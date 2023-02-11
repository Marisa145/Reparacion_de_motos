const Repairs = require('./repairs.model');
const User = require('./user.model');

const initmodel = () => {
  // 1-User <----------> M-repairs
  User.hasMany(Repairs);
  Repairs.belongsTo(User);
};

module.exports = initmodel;
