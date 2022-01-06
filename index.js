/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
// /* eslint-disable no-console */
const http = require('http');
const path = require('path');
const dotEnv = require('dotenv-yaml');

dotEnv.config({ path: path.join(__dirname, `./.env.${process.env.NODE_ENV}.yaml`) });
const { QUEUE, worker } = require('./connection/redis.connection');
const server = require('./server');

const httpPort = process.env.PORT || 8080;
const httpHost = process.env.HOST || '127.0.0.1';

async function letsGo() {
    await QUEUE.connect();
    http.createServer(server(QUEUE)).listen(httpPort, httpHost);
    // console.log(`Server running at ${httpHost}:${httpPort}`);
    // console.log('send an email and message to /TO_ADDRESS/SUBJECT/YOUR_MESSAGE');
    await worker.connect();
    worker.start();
    // console.log('Worker started successfully');
}

let RETRY_COUNT = 0;

letsGo().then(() => {
    worker.on('start', () => { console.log('worker started'); });
    worker.on('end', () => { console.log('worker ended'); });
    worker.on('cleaning_worker', (worker, pid) => { console.log(`cleaning old worker ${worker}`); });
    // worker.on('poll', (queue) => { console.log(`worker polling ${queue}`); });
    worker.on('poll', async (queue) => {
        console.log('POLLING !!! QUEUE.length ===> ', await QUEUE.length(queue));
    });

    worker.on('job', (queue, job) => { console.log(`working job ${queue} ${JSON.stringify(job)}`); });

    worker.on('reEnqueue', (queue, job, plugin) => { console.log(`reEnqueue job (${plugin}) ${queue} ${JSON.stringify(job)}`); });
    worker.on('success', (queue, job, result) => {
        console.log('=======================================================');
        console.log('queue  ===> ', queue);
        console.log('job    ===> ', JSON.stringify(job));
        console.log('result ===> ', result);
        console.log('=======================================================');
        // console.log(`job success ${queue} ${JSON.stringify(job)} >> ${result}`);
    });
    worker.on('failure', async (queue, job, failure) => {
        console.log('=======================================================');
        console.log('queue  ===> ', queue);
        console.log('job    ===> ', JSON.stringify(job));
        console.log('result ===> ', failure);
        console.log('=======================================================');
        // console.log(`job failure ${queue} ${JSON.stringify(job)} >> ${failure}`);

        if (RETRY_COUNT <= process.env.MAX_EMAIL_JOB_RETRY_COUNT) {
            console.log('RETRYING !!! ');
            await QUEUE.enqueue(job.queue, job.class, job.args);
            RETRY_COUNT += 1;
        } else {
            console.log('MAX RETRY LOGIC REACHED ');
            RETRY_COUNT = 0;
        }
    });
    worker.on('error', (queue, job, error) => { console.log(`error ${queue} ${JSON.stringify(job)} >> ${error}`); });
    worker.on('pause', () => { console.log('worker paused'); });
});
