const {Schema, model} = require('mongoose');

const MessageSchema = Schema({
    from:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message:{
        type: String,
        required: true
    },
}, {
    timestamps: true
});

//Con esto no muestra la respuesta del id, la version y el password en el POST
MessageSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    return object;
});

module.exports = model('Message', MessageSchema);