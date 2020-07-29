import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLFloat } from 'graphql';

import { paymentType } from '../../types/payment';
import Payments from '../../../models/payments';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: paymentType,
    description: ` `,
    args: {
        date: { type: GraphQLString },
        totalAmount: { type: GraphQLFloat },
        personalAccountId: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        const payment = new Payments(
            { ...args }
        );
        return await payment.save();
    },
};