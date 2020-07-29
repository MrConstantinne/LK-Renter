import { GraphQLString, GraphQLNonNull } from 'graphql';
import { AuthenticationError } from 'apollo-server-express';
import { compare } from 'bcrypt';

import { userType } from '../../types/user';
import Users from '../../../models/users';
import { validateResult } from '../../validation';

export default {
    type: userType,
    args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args, { req }) {

        const { email, password } = args;

        validateResult(email, password);

        const { userId } = req.session;
        if (userId) {
            return Users.findById(userId);
        }

        const user = await Users.findOne({ email });

        const matchesPassword = async () => {
            return await compare({ password }, user.password);
        }

        const message = 'Неправильный email или пароль';

        if (!user) {
            throw new AuthenticationError(message);
        }

        if (!matchesPassword) {
            throw new AuthenticationError(message);
        }

        req.session.userId = user.id;

        return user;
    },
};