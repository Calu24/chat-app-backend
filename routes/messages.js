/*
    path: /api/messages 
*/
const {Router} = require('express');
const { getChat } = require('../controllers/messages');
const validate = require('../middlewares/validate-JWT');

const router = Router();

router.get('/:from', validate, getChat);

module.exports = router;