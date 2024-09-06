const express = require('express');
const router = express.Router();
const { User } = require('../../models/tables');
const auth = require('../middlewares/auth')

router.get('/api/users', auth, async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
        console.log(users);
        
    } catch(err) {
        res.status(500).json({
            msg: "Erro ao buscar Usuários",
            err
        })
    }
});

router.get('/api/users/:id', auth, async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        // {
        //     // attributes: { exclude: ['password'] } // Exclui o campo de senha da consulta
        // }
    } catch(err) {
        res.status(500).json({
            msg: "Erro ao buscar Usuário por ID",
            err
        });
    }
});

router.post('/api/users', auth, async (req, res) => {
    // Dados do formulário HTML
    const {
        name,
        email,
        password,
        cep,
        street,
        neighborhood,
        city,
        state
    } = req.body;

    const user = await User.findOne({
        where: {
            name
        }
    });

    // if(user){
    //     res.status(400).json({
    //         msg: "Email já cadastrado",
    //         err: "Email já cadastrado"
    //     });
    // }

    // IInserção de um usuário no banco
    try {
        const newUser = await User.create({
            name,
            email,
            password,
            cep,
            street,
            neighborhood,
            city,
            state
        });

        res.status(201).json({
            msg: "Usuário cadastrado",
            newUser
        });
    } catch(err) {
        res.status(500).json({
            msg: "Erro ao cadastrar Usuário",
            err
        });
    }
});

router.put('/api/users/:id', auth, async(req, res) => {
    // Atualização dos campos do Usuário
    try {
        // ID do Usuário
        let id = parseInt(req.params.id);
    
        // Dados do Usuário
        const {
            name,
            email,
            password,
            cep,
            street,
            neighborhood,
            city,
            state
        } = req.body;

        // Atualização do Usuário
        const updatedUser = await User.update(
            {
                name,
                email,
                password,
                cep,
                street,
                neighborhood,
                city,
                state
            },
            {
                where: {
                    id
                }
            }
        );

        res.status(201).json({
            msg: "Usuário atualizado",
            updatedUser
        });
    } catch(err) {
        res.status(500).json({
            msg: 'Erro ao atualizar Usuário',
            err
        });
    }
});

router.delete('/api/users/:id', auth, async (req, res) => {
    try {
        // ID do Usuário
        let id = parseInt(req.params.id);

        // Remoção do Usuário por ID
        const removedUser = await User.destroy({
            where: {
                id
            }
        });

        res.status(204).json({
            msg: 'Usuário removido',
            removedUser
        })
    } catch(err) {
        res.status(500).json({
            msg: 'Erro ao remover Usuário',
            err
        });
    }
});

module.exports = router;