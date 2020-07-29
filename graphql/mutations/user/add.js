import { GraphQLString, GraphQLNonNull } from 'graphql';
import { hash } from 'bcrypt';

import { userType } from '../../types/user'
import Users from '../../../models/users';
import { checkSignedIn } from '../../middleware/auth';
import { validateResult } from '../../validation';

export default {
    type: userType,
    args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
    },
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        const { email, password } = args;

        const foundUser = await Users.findOne({ email });
        if (foundUser) {
            throw new Error('Пользователь с таким email уже существует!');
        }

        validateResult(email, password);

        const hashPassword = await hash(password, 12);

        const user = new Users({
            email,
            password: hashPassword,
            name: args.name
        });
        return await user.save();
    },
};