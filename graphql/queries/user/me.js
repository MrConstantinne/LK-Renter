import { GraphQLID, GraphQLNonNull } from 'graphql';

import { checkSignedIn } from '../../middleware/auth';
import { userType } from '../../types/user';
import Users from '../../../models/users';

export default {
    type: userType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) }},
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        return await Users.findById(req.session.userId);
    },
};