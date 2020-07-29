import { GraphQLList } from 'graphql';

import { indicationType } from '../../types/indication';
import Indications from '../../../models/indications';
import { checkSignedIn } from '../../middleware/auth';

export default {
    type: new GraphQLList(indicationType),
    async resolve(parent, args, { req }) {

        checkSignedIn(req);

        return await Indications.find({});
    },
};