import { GraphQLList } from 'graphql';

import { personalAccountType } from '../../types/personalAccount';
import PersonalAccounts from '../../../models/personalAccounts';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: new GraphQLList(personalAccountType),
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        return await PersonalAccounts.find({});
    },
};