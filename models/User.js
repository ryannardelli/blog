const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
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
    type: DataTypes.STRING(250), // O hash será armazenado aqui
    allowNull: false,
    validate: {
      len: [6, 250], // Senha com no mínimo 6 caracteres
      isStrongPassword(value) {
        const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        if (!strongPasswordRegex.test(value)) {
          throw new Error("A senha deve conter pelo menos uma letra, um número e um caractere especial.");
        }
      },
    },
  },

  function: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },

  profile_picture: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "https://www.gov.br/cdn/sso-status-bar/src/image/user.png",
    validate: {
      isUrl: true, // Garante que seja uma URL válida
    },
  },
});


User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});


User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});


User.authenticate = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Senha inválida.");
  }

  return user;
};

module.exports = User;
