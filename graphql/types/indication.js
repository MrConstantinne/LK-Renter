import {GraphQLFloat, GraphQLID, GraphQLObjectType, GraphQLString,} from 'graphql';

import { personalAccountType } from './personalAccount';
import PersonalAccounts from '../../models/personalAccounts';

export const indicationType = new GraphQLObjectType({
    name: 'Indication',
    fields: () => ({
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        counterNumber: { type: GraphQLString },
        counterType: { type: GraphQLString },
        indication: { type: GraphQLFloat },
        comment: { type: GraphQLString },
        personalAccount: {
            type: personalAccountType,
            async resolve(parent, args) {
                return await PersonalAccounts.findById(parent.personalAccountId);
            },
        },
    }),
});