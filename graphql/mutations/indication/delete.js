import { GraphQLNonNull, GraphQLID } from 'graphql';

import { indicationType } from '../../types/indication';
import Indications from '../../../models/indications';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: indicationType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) }},
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        const foundPersonalAccount = await Indications.findById(args.id);
        if (!foundPersonalAccount) {
            throw new Error(`Показания по указанному ID не найдены!`);
        }
        return await Indications.findByIdAndRemove(args.id);
    },
};