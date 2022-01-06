const {
    Worker, Plugins, Scheduler, Queue,
} = require('node-resque');

const emailJob = require('../jobs/email.job');

const redisConnectionDetails = {
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    port: Number(process.env.REDIS_PORT),
    database: Number(process.env.REDIS_DATABASE),
};

/** QUEUE */
const QUEUE = new Queue({ connection: redisConnectionDetails }, emailJob);

/** WORKER  */
const worker = new Worker(
    { connection: redisConnectionDetails, queues: ['emailQueue'] },
    emailJob,
);

module.exports = { redisConnectionDetails, worker, QUEUE };
