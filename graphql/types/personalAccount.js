import {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLList} from 'graphql';

import { userType } from './user';
import { creditType } from './credit';
import { paymentType } from './payment';
import { indicationType } from './indication';

import Users from '../../models/users';
import Credits from '../../models/credits';
import Payments from '../../models/payments';
import Indications from '../../models/indications';

export const personalAccountType = new GraphQLObjectType({
    name: 'PersonalAccount',
    fields: () => ({
        id: { type: GraphQLID },
        contract: { type: GraphQLString },
        contractType: { type: GraphQLString },
        legalEntityLendlord: { type: GraphQLString },
        legalEntityRenter: { type: GraphQLString },
        estateObject: { type: GraphQLString },
        totalDebt: { type: GraphQLFloat },
        user: {
            type: userType,
            async resolve(parent, args) {
                return await Users.findById(parent.userId);
            },
        },
        indication: {
            type: new GraphQLList(indicationType),
            async resolve(parent, args) {
                return await Indications.find({ personalAccountId: parent.id });
            },
        },
        payment: {
            type: new GraphQLList(paymentType),
            async resolve(parent, args) {
                return await Payments.find({ personalAccountId: parent.id });
            },
        },
        credit: {
            type: new GraphQLList(creditType),
            async resolve(parent, args) {
                return await Credits.find({ personalAccountId: parent.id });
            },
        },
    }),
});