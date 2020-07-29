import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLFloat } from 'graphql';

import { creditType } from '../../types/credit';
import Credits from '../../../models/credits';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: creditType,
    description: ` `,
    args: {
        date: { type: GraphQLString },
        totalAmount: { type: GraphQLFloat },
        listServices: { type: GraphQLString },
        personalAccountId: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        const credit = new Credits(
            { ...args }
        );
        return await credit.save();
    },
};