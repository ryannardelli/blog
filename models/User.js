const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const User = db.define("User", {
  name: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING(250),
    allowNull: false,
    unique: true, // E-mail único
    validate: {
      isEmail: true, // Validação para garantir que seja um e-mail válido
    },
  },

  password: {
    type: DataTypes.STRING(250),
    allowNull: false,
    validate: {
      len: [6, 250], // Senha com no mínimo 6 caracteres
    },
  },

  function: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },

  profile_picture: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '/public/images/user_img.png',
  },
});

module.exports = User;
