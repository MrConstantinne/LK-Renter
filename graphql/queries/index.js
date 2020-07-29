import personalAccountQuery from './personalAccount';
import indicationQuery from './indication';
import paymentQuery from './payment';
import creditQuery from './credit';
import userQuery from './user';

export default {
    ...personalAccountQuery,
    ...indicationQuery,
    ...paymentQuery,
    ...creditQuery,
    ...userQuery,
}