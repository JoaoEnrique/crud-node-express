const crypto = require('crypto');

// Gera uma chave secreta aleatória com 32 bytes de comprimento
const generateTokenSecret = () => {
    return crypto.randomBytes(32).toString('hex');
}

console.log(generateTokenSecret());
