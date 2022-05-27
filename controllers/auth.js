const { response } = require('express');
const    bcrypt    = require('bcryptjs');

const User = require('../models/user');
const {generarJWT} = require('../helpers/jwt');

const createUser = async (req, res = response) => {
    
    const { email, password } = req.body;
    
    try {

        const isDuplicateEmail = await User.findOne({email});

        if (isDuplicateEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email is already registered'
            });
        }
        
        const user = new User(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //generar JWT
        const token = await generarJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'backend error'
        });
    }
};

const login = async (req, res = response)=>{

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({email});

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email is already registered'
            });
        }


        const validPassword = bcrypt.compareSync(password, userDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid Password'
            });                        
        }
        
        const token = await generarJWT(userDB.id);
        
        res.json({
            ok: true,
            user: userDB,
            token
        });
        
        
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'backend error'
        });
    }

};

const rebuildToken =  async (req, res = response    ) => {

    const uid = req.uid;

    const token = await generarJWT(uid);
    // const token = 'ljckilawivnekjqnviqñnvasvq';

    const user = await User.findById(uid);

    res.json({
        ok: true,
        user,
        token
    });

};


module.exports = {
    createUser,
    login,
    rebuildToken
};