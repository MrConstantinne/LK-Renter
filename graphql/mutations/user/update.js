import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { hash } from 'bcrypt';

import { userType } from '../../types/user';
import Users from '../../../models/users';
import { checkSignedIn } from '../../middleware/auth';
import { validateResult } from '../../validation';

export default {
    type: userType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
    },
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        const foundUser = await Users.findById(args.id);
        if (!foundUser) {
            throw new Error(`Пользователь с указанным ID не найден!`);
        }

        const { id, email, password, name } = args;

        validateResult(email, password);

        const hashPassword = await hash(password, 12);

        return await Users.findByIdAndUpdate(
            id,
            { $set: {
                email,
                password: hashPassword,
                name,
            }},
            { new: true }
        );
    },
};