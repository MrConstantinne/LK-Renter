import {GraphQLFloat, GraphQLID, GraphQLObjectType, GraphQLString,} from 'graphql';

import { personalAccountType } from './personalAccount';
import PersonalAccounts from '../../models/personalAccounts';

export const paymentType = new GraphQLObjectType({
    name: 'Payment',
    fields: () => ({
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        totalAmount: { type: GraphQLFloat },
        personalAccount: {
            type: personalAccountType,
            async resolve(parent, args) {
                return await PersonalAccounts.findById(parent.personalAccountId);
            },
        },
    }),
});