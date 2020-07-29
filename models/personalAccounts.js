import mongoose, { ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

const personalAccountSchema = new Schema({
    userId: {
        type: ObjectId,
        require: true,
    },
    contract: {
        type: String,
    },
    contractType: {
        type: String,
    },
    legalEntityLendlord: {
        type: String,
    },
    legalEntityRenter: {
        type: String,
    },
    estateObject: {
        type: String,
    },
    totalDebt: {
        type: Number,
    },

}, { timestamps: true });

export default mongoose.model('personalaccounts', personalAccountSchema);