// -------------------- IMPORTS -------------------- //

const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

// -------------------- router.use -------------------- //

router.use('/api', apiRouter);



// -------------------- ROUTES -------------------- //

router.get('/hello/world', function(req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

// -------------------- EXPORTS -------------------- //

module.exports = router;