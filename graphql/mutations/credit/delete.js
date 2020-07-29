import { GraphQLNonNull, GraphQLID } from 'graphql';

import { creditType } from '../../types/credit';
import Credits from '../../../models/credits';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: creditType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) }},
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        const foundPersonalAccount = await Credits.findById(args.id);
        if (!foundPersonalAccount) {
            throw new Error(`Начисления по указанному ID не найдены!`);
        }
        return await Credits.findByIdAndRemove(args.id);
    },
};