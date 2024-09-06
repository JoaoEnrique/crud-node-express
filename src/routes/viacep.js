const express = require('express');
const router = express.Router();
const cepCache = {};

router.get('/api/cep/:cep', async (req, res) => {
    try {
        const cep = req.params.cep.replace(/\D/g, '');
        const startTime = process.hrtime(); // Tempo de início da operação

        // Verificar se o CEP já está no cache
        if (cepCache[cep]) {
            const cacheEndTime = process.hrtime(startTime); // Tempo após a verificação do cache
            const cacheTime = (cacheEndTime[0] * 1000) + (cacheEndTime[1] / 1e6); // Tempo em milissegundos
            console.log('CACHE: ' + cacheTime);
            return res.json(cepCache[cep]);
        }
        const fetchStartTime = process.hrtime();// Tempo para a requisição externa

        const response = await fetch(`https://viacep.com.br/ws/${req.params.cep}/json/`);
        const data = await response.json();
        const fetchEndTime = process.hrtime(startTime); // Tempo após a verificação da api

        const fetchTime = (fetchEndTime[0] * 1000) + (fetchEndTime[1] / 1e6); // Tempo em milissegundos
        if (data.erro)
            return res.status(500).json({ msg: "CEP não encontrado", err: data.erro });
        
        cepCache[cep] = data;
        console.log(`API: ${fetchTime} ms`);

        res.json(data);
    } catch(err) {
        console.error(err);
        
        res.status(500).json({
            msg: "Erro ao buscar CEP",
            err: `${err}`
        })
    }
});

module.exports = router;