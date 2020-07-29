import { GraphQLList } from 'graphql';

import { paymentType } from '../../types/payment';
import Payments from '../../../models/payments';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: new GraphQLList(paymentType),
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        return await Payments.find({});
    },
};