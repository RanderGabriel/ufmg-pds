import express = require('express');

var router = express.Router();

// Entrega o arquivo index.html na pasta public.
router.get('/app', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

export default router;
