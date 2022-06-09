/*
    path: /api/messages 
*/
const {Router} = require('express');
const { getChat } = require('../controllers/messages');
// const validateJWT = require('../middlewares/validate-JWT');

const router = Router();

router.get('/:from', getChat);

module.exports = router;