import express = require('express');

var router = express.Router();

// Exemplo de rota post do webservice.
router.post('/', (req, res) => {
    res.send(200).send({
        token: 'abc123',
    });
});

export default router;
