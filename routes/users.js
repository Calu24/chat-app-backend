/*
    path: /api/users
*/
const {Router} = require('express');
const { getUser } = require('../controllers/users');

const validateJWT = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getUser);

module.exports = router;