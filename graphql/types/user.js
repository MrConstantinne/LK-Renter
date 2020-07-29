import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';

import { personalAccountType } from './personalAccount';
import PersonalAccounts from '../../models/personalAccounts';

export const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        personalAccounts: {
            type: new GraphQLList(personalAccountType),
            async resolve(parent, args) {
                return await PersonalAccounts.find({ userId: parent.id });
            },
        },
    }),
});