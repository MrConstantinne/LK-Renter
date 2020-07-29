import { GraphQLID, GraphQLNonNull } from 'graphql';

import { creditType } from '../../types/credit';
import Credits from '../../../models/credits';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: creditType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        return await Credits.findById(args.id);
    },
};