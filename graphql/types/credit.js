import {GraphQLFloat, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString} from 'graphql';

import { personalAccountType } from './personalAccount';
import PersonalAccounts from '../../models/personalAccounts';

export const creditType = new GraphQLObjectType({
    name: 'Credit',
    fields: () => ({
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        totalAmount: { type: GraphQLFloat },
        listServices: { type: GraphQLString },  // TODO: Array
        personalAccount: {
            type: personalAccountType,
            async resolve(parent, args) {
                return await PersonalAccounts.findById(parent.personalAccountId);
            },
        },
    }),
});