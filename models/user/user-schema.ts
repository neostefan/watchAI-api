import { Schema, model } from "mongoose";
import User from "./user";

const UserSchema = new Schema<User>({
    firstName: {
        required: true,
        type: String,
    },

    lastName: {
        required: true,
        type: String,
    },

    email: {
        required: true,
        type: String,
    },

    password: {
        required: true,
        type: String,
    },

    phone: {
        required: true,
        type: String,
    },

    photo: {
        type: String,
    }
})

export default model('Users', UserSchema)