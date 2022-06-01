/*
    path: /api/login
*/
const {Router} = require('express');
const { check } = require('express-validator');

const {createUser, login, rebuildToken} = require('../controllers/auth');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-JWT');

const router = Router();

router.post('/new',  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields,
] , createUser);

router.post('/',  [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
] , login);

router.get('/rebuild',  validateJWT, rebuildToken);

module.exports = router;