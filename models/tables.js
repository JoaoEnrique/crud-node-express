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
        allowNull: false, // Name is required
        unique: true // Garante que o email seja único
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


// Função principal para sincronizar e criar usuário se não existir
async function initialize() {
    try {
        // Sincroniza o banco de dados e cria as tabelas se não existirem
        await db.sequelize.sync();
        console.log('Tabelas sincronizadas com sucesso.');

        // Verificar se o usuário admin já existe
        const adminEmail = 'admin@gmail.com';
        const existingUser = await User.findOne({ where: { email: adminEmail } });

        // Se o usuário não existir, cria o novo usuário admin
        if (!existingUser) {
            const adminUser = await User.create({
                name: 'Admin User',
                email: adminEmail,
                password: '123',
                cep: '00000-000',
                street: 'Admin Street',
                neighborhood: 'Admin Neighborhood',
                city: 'Admin City',
                state: 'AC' // Substitua pelo estado desejado
            });
            console.log('Usuário Admin criado:', adminUser);
        } else {
            console.log('Usuário Admin já existe');
        }
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
    }
}

// Executa a função de inicialização
initialize();

module.exports = {
    User,
}