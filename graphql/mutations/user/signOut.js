import { userType } from '../../types/user';

export default {
    type: userType,
    resolve(_, __, {req, res}) {
        req.session.destroy();
        res.clearCookie(process.env.SESSION_NAME);
    },
};
