import mongoose from '../utils/dbConfig';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    nickName: String,
    homeTown: String,
    role: {
        type: String,
        default: 'user'
    },
    age: Number,
    sex: {
        type: String,
        enum: ['man', 'woman']
    },
    address: String
})

const userModel = mongoose.model('User', UserSchema, 'user');

export default userModel;