import { mongoConnect } from './mongo';
import { redisConnect } from './redis';
import { serverConnect } from './server';

export const serverStart = async () => {
    try {
        await serverConnect();
        await mongoConnect();
        await redisConnect();
    } catch (e) {
        console.error(e);
    }
};
