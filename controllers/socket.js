const Message = require("../models/message");
const User = require("../models/user")

const connectedUser = async (uid = '') => {
    const update = { online: true };
    await User.findByIdAndUpdate(uid, update);

    const usuario = await User.findById(uid); // Para ver los cambios realizados
    // console.log("Autenticado:", usuario);
    return usuario;
}

const disconnectedUser = async (uid = '') => {
    const update = { online: false };
    await User.findByIdAndUpdate(uid, update);

    const usuario = await User.findById(uid); // Para ver los cambios realizados
    // console.log("Autenticado:", usuario);
    return usuario;
}

const saveMessage = async(payload) =>{

    try {

        const message = new Message(payload);

        await message.save();        

        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    connectedUser,
    disconnectedUser,
    saveMessage
}