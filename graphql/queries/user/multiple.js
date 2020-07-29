import { GraphQLList } from 'graphql';

import { userType } from '../../types/user';
import Users from '../../../models/users';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: new GraphQLList(userType),
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        return await Users.find({});
    },
};