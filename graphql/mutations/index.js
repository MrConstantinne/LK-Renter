import userMutation from './user';
import creditMutation from './credit';
import paymentMutation from './payment';
import indicationMutation from './indication';
import personalAccountMutation from './personalAccount';

export default {
    ...userMutation,
    ...creditMutation,
    ...paymentMutation,
    ...indicationMutation,
    ...personalAccountMutation,
}