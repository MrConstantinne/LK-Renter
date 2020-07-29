import {GraphQLID, GraphQLNonNull} from 'graphql';

import { indicationType } from '../../types/indication';
import Indications from '../../../models/indications';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: indicationType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        return await Indications.findById(args.id);
    },
};