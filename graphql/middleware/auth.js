import { AuthenticationError } from 'apollo-server-express';

export const checkSignedIn = req => {
    if (!req.session.userId) {
        throw new AuthenticationError('Вы должны быть зарегистрированы');
    }
};


