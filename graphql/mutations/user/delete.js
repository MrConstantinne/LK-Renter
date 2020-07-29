import { GraphQLID, GraphQLNonNull } from 'graphql';

import { userType } from '../../types/user'
import Users from '../../../models/users';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: userType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) }},
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        const foundUser = await Users.findById(args.id);
        if (!foundUser) {
            throw new Error(`Пользователь с указанным ID не найден!`);
        }
        return await Users.findByIdAndRemove(args.id);
    },
};