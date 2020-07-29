import {GraphQLID, GraphQLNonNull} from 'graphql';

import { personalAccountType } from '../../types/personalAccount';
import PersonalAccounts from '../../../models/personalAccounts';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: personalAccountType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        return await PersonalAccounts.findById(args.id);
    },
};