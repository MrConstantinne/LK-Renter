import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    name: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.model('users', userSchema);