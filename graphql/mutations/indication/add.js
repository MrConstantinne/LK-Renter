import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLFloat } from 'graphql';

import { indicationType } from '../../types/indication';
import Indications from '../../../models/indications';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: indicationType,
    description: ` `,
    args: {
        date: { type: GraphQLString },
        counterNumber: { type: GraphQLString },
        counterType: { type: GraphQLString },
        indication: { type: GraphQLFloat },
        comment: { type: GraphQLString },
        personalAccountId: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        const indication = new Indications(
            { ...args }
        );
        return await indication.save();
    },
};