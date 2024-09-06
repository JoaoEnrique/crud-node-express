const formatURL = require('../utils/formatURL');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        // Se não houver token, redireciona para o login
        return res.status(301).redirect('/login');
    }

    try {
        // Tenta verificar o token
        req.userInfo = jwt.verify(token, process.env.TOKEN_SECRET);
        req.formattedURL = formatURL(req.url);
        next();
    } catch (error) {
        // Retorna um erro caso o token esteja inválido ou expirado
        return res.status(401).json({ error: "Token inválido ou expirado" });
        // return res.status(301).redirect('/login');
    }
};

module.exports = auth;