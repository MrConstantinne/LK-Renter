import mongoose, { ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

const creditSchema = new Schema({
    personalAccountId: {
        type: ObjectId,
        require: true,
    },
    date: {
        type: String,
        require: true,
    },
    totalAmount: {
        type: Number,
        require: true,
    },
    listServices: {
        type: String,
    },

}, { timestamps: true });

export default mongoose.model('credits', creditSchema);