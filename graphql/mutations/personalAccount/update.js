import {GraphQLNonNull, GraphQLID, GraphQLString, GraphQLFloat} from 'graphql';

import { personalAccountType } from '../../types/personalAccount';
import PersonalAccounts from '../../../models/personalAccounts';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: personalAccountType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        contract: { type: GraphQLString },
        contractType: { type: GraphQLString },
        legalEntityLendlord: { type: GraphQLString },
        legalEntityRenter: { type: GraphQLString },
        estateObject: { type: GraphQLString },
        totalDebt: { type: GraphQLFloat },
        userId: { type: GraphQLID },
    },
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        const foundPersonalAccount = await PersonalAccounts.findById(args.id);
        if (!foundPersonalAccount) {
            throw new Error(`Лицевой счет с указанным ID не найден!`);
        }
        return await PersonalAccounts.findByIdAndUpdate(
            args.id,
            { $set: { ...args }},
            { new: true },
        );
    },
};