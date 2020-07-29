import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import express, {response} from 'express';
import dotenv from 'dotenv';

import { sessionOptions } from './redis';
import schema from '../graphql';

dotenv.config();

export const serverConnect = () => {

    const app = express();

    const server = new ApolloServer({
        schema,
        /* TODO: IN_PROD ? false: {settings: {'request.credentials': 'include'}},
                 настройка playground для сессий */
        playground: { settings: { 'request.credentials': 'include' }},
        context: ({ req, res }) => ({ req, res }),
    });

    app.use(session(sessionOptions));

    server.applyMiddleware({ app, cors: {
            credentials: true,
            origin: [
                process.env.CORS_WHITELIST_PLAYGROUND,
                process.env.CORS_WHITELIST_WEB,
            ]
        }
    });

    app.listen(process.env.SERVER_PORT, err => {
        err ? console.error(err)
            : console.info(`Соединение с сервером установлено...`);
    });
};