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

export interface IUser {
    username: string;
    password?: string;
    nickname?: string;
    homeTown?: string;
    role?: string;
    age?: number;
    sex?: string;
    address?: string;
}

export function findOneUser(userParam: IUser): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
        UserModel.find(userParam, (error: any, user: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(user);
            }
        });
    });
}

export function saveUser(user: any) : Promise<void> {
    return new Promise((resolve, reject) => {
        const newUser = new UserModel({...user});
        newUser.save((error: any, docs: any) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}