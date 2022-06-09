/*
    path: /api/users
*/
const {Router} = require('express');
const { getUser } = require('../controllers/users');

const validate = require('../middlewares/validate-JWT');

const router = Router();

router.get('/', validate, getUser);

module.exports = router;