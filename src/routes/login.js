const express = require('express');
const router = express.Router();
const { User } = require('../../../backend/models/tables');
const jwt = require('jsonwebtoken');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', async (req, res) => {
   res.status(200).json({
        msg: "API Funcionando",
    })
})

// Essa rota apenas recebe um token JWT, verifica se ele é válido e retorna as informações do usuário
router.get('/api/login', async (req, res) => {
    try {
        // Verificação do token
        const token = req.query.token
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
    
        res.json({
            msg: "Usuário autenticado",
            dados: user
        });
    } catch(err) {
        res.status(500).json({
            msg: "Erro ao autenticar usuário",
            err
        })
    }
})

// Essa rota é resposável pela criação de uma nova sessão de login
// Ela recebe os dados do usuário e cria um token JWT baseado nessas informações (se elas estiverem corretas)
router.post('/api/login', async (req, res) => {
    try {
        // Email e senha enviados pelo formulário HTML
        const { email, senha } = req.body

        // Busca pelo usuário através do email fornecido
        const user = await User.findOne({
            where: {
                email
            }
        })

        // Caso o usuário exista, compare a senha fornecida com a senha cadastrada
        // Crie e retorne um token JWT com os dados do usuário
        if (user) {
            if (user.password === senha) {
                // Criação do token
                const token = jwt.sign({
                    id: user.id,
                    nome: user.name, 
                    email,
                }, process.env.TOKEN_SECRET, {
                    expiresIn: 60 * 60 * 24 * 7
                });

                res.status(201).json({
                    msg: `Bem-vindo, ${user.name}!`,
                    token
                });
            } else {
                res.status(400).json("Usuário ou senha incorretos");
            }
        } else {
            res.status(400).json("Usuário ou senha incorretos");
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({
            msg: "Erro ao fazer login",
            err
        })
    }
})

module.exports = router;