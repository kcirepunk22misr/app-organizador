import { Schema, model, Document } from 'mongoose';
import { format } from 'fecha';
import uniqueValidator from 'mongoose-unique-validator';

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
}

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    lastName: {
        type: String,
        required: [true, 'El Apellido es necesario'],
    },
    sex: {
        type: String,
        required: [true, 'El sexo es necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria'],
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    img: {
        type: String,
        required: false,
    },
    createdAt: {
        type: String,
        required: true,
        default: format(new Date(), 'YYYY MM DD hh:mm:ssa')
    },
    active: {
        type: Boolean,
        default: true
    }
});

userSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
})

export default model('User', userSchema);

