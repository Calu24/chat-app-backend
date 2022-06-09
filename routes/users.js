/*
    path: /api/users
*/
const {Router} = require('express');
const { getUser } = require('../controllers/users');

// const validateJWT = require('../middlewares/validate-JWT');

const router = Router();

router.get('/', getUser);

module.exports = router;