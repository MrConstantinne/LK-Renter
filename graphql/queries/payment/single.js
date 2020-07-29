import { GraphQLID, GraphQLNonNull } from 'graphql';

import { paymentType } from '../../types/payment';
import Payments from '../../../models/payments';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: paymentType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        return await Payments.findById(args.id);
    },
};