import mongoose from '../../utils/dbConfig';

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
    nickname: String,
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

const UserModel = mongoose.model('User', UserSchema, 'user');

export function findOneUser(userParam: any) {
    return new Promise((resolve, reject) => {
        UserModel.find(userParam, (err: any, user: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}

export function saveUser(user: any) {
    return new Promise((resolve, reject) => {
        const newUser = new UserModel({...user});
        newUser.save((err: any, docs: any) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve('成功');
            }
        });
    });
}