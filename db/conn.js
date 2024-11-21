const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('blog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Conectamos com sucesso!');
} catch(err) {
    console.log('Erro ao conectar com o banco de dados: ', err)
}

module.exports = sequelize;