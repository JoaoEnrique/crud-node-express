const db = require('./database')

// Usuários
const User = db.sequelize.define('users', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true // ID is automatically incremented
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false // Name is required
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false // Name is required
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: true // Password is optional
    },
    cep: {
        type: db.Sequelize.STRING,
        allowNull: false // CEP is required
    },
    street: {
        type: db.Sequelize.STRING,
        allowNull: false // Logradouro (street) is required
    },
    neighborhood: {
        type: db.Sequelize.STRING,
        allowNull: false // Bairro (neighborhood) is required
    },
    city: {
        type: db.Sequelize.STRING,
        allowNull: false // Localidade (city) is required
    },
    state: {
        type: db.Sequelize.STRING,
        allowNull: false // UF (state) is required
    },
});


// db.sequelize.sync({force: true});
db.sequelize.sync();

const adminUser = User.create({
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: '123',
    cep: '00000-000',
    street: 'Admin Street',
    neighborhood: 'Admin Neighborhood',
    city: 'Admin City',
    state: 'AC' // Substitua pelo estado desejado
});

module.exports = {
    User,
}