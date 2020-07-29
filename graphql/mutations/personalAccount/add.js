import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLFloat } from 'graphql';

import { personalAccountType } from '../../types/personalAccount';
import PersonalAccounts from '../../../models/personalAccounts';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: personalAccountType,
    description: ` Для добавления лицевого счета обязательно 
                   указывать принадлежность к пользователю, 
                   остальные поля можно заполнить при обновлении`,
    args: {
        contract: { type: GraphQLString },
        contractType: { type: GraphQLString },
        legalEntityLendlord: { type: GraphQLString },
        legalEntityRenter: { type: GraphQLString },
        estateObject: { type: GraphQLString },
        totalDebt: { type: GraphQLFloat },
        userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        const personalAccount = new PersonalAccounts(
            { ...args }
        );
        return await personalAccount.save();
    },
};