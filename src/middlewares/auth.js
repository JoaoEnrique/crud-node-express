const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

        if (!token) {
            return res.status(401).json({ msg: "Token não fornecido" });
        }

        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: "Token inválido" });
            }

            req.user = decoded; // Decoded token data is added to the request object
            next();
        });
    } catch (error) {
        console.error('Erro no middleware de autenticação:', error);
        return res.status(500).json({ msg: "Erro interno do servidor" });
    }
}

module.exports = auth;
