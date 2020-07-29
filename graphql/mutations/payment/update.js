import {GraphQLNonNull, GraphQLID, GraphQLString, GraphQLFloat} from 'graphql';

import { paymentType } from '../../types/payment';
import Payments from '../../../models/payments';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: paymentType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        date: { type: GraphQLString },
        totalAmount: { type: GraphQLFloat },
        personalAccountId: { type: GraphQLID },
    },
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        const foundPersonalAccount = await Payments.findById(args.id);
        if (!foundPersonalAccount) {
            throw new Error(`Оплаты по указанному ID не найдены!`);
        }
        return await Payments.findByIdAndUpdate(
            args.id,
            { $set: { ...args }},
            { new: true },
        );
    },
};