const express = require('express');
const auth = require('../../../middlewares/auth');
const axios = require('axios')

const router = express.Router();

router.get('/', auth, (req, res) => {
    res.redirect('/users/list')
});

router.get('/users/list', auth, async (req, res) => {
    try {
        const { token } = req.cookies;
        const { formattedURL } = req;
        const response = await axios(`http://localhost:5000/api/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const users = response.data;

        res.render(formattedURL, {
            title: 'Usuários',
            token,
            users: users,
            apiUrl: process.env.API_URL
        });
    } catch(err) {
        return res.status(err.status || 500).json(err);
    }
});

router.get('/users/register', auth, async (req, res) => {
    const { formattedURL } = req;
    const { token } = req.cookies;

    res.render(formattedURL, {
        title: 'Cadastrar Usuário',
        token,
        apiUrl: process.env.API_URL
    })
})

router.get('/users/edit/:id', auth, async (req, res) => {
    try {
        const { token } = req.cookies;
        const response = await axios(`${process.env.API_URL}/api/users/${req.params.id}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho da requisição
            }
        });
        const user = response.data;

        res.render('users/register', {
            title: 'Editar Usuário',
            token,
            user: user,
            apiUrl: process.env.API_URL
        })
    } catch(err) {
        console.log(err);
    }
})

module.exports = router;