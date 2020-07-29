import mongoose, { ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
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

}, { timestamps: true });

export default mongoose.model('payments', paymentSchema);