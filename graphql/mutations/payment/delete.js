import { GraphQLNonNull, GraphQLID } from 'graphql';

import { paymentType } from '../../types/payment';
import Payments from '../../../models/payments';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: paymentType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) }},
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        const foundPersonalAccount = await Payments.findById(args.id);
        if (!foundPersonalAccount) {
            throw new Error(`Оплаты по указанному ID не найдены!`);
        }
        return await Payments.findByIdAndRemove(args.id);
    },
};