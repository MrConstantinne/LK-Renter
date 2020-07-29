import mongoose, { ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

const indicationSchema = new Schema({
    personalAccountId: {
        type: ObjectId,
        require: true,
    },
    date: {
        type: String,
        require: true,
    },
    counterNumber: {
        type: String,
        require: true,
    },
    counterType: {
        type: String,
        require: true,
    },
    indication: {
        type: Number,
        require: true
    },
    comment: {
        type: String
    },

}, { timestamps: true });

export default mongoose.model('indications', indicationSchema);