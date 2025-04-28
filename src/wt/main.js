import { Worker } from 'node:worker_threads'
import os from 'node:os';

import path from 'node:path';
import { fileURLToPath } from 'node:url';


const performCalculations = async () => {
    // Write your code here
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileWorker = `${__dirname}/worker.js`;


    const numberOrCores = os.cpus().length;
    const workers = [];
    for (let i = 0; i < numberOrCores; i++) {
        const worker = new Promise((resolve, reject) => {
            const worker = new Worker(fileWorker, {
                workerData: 10 + i,
            });
            worker.on('message', (fibN) => {
                resolve({
                    status: 'resolved',
                    data: fibN
                });
            });
            worker.on('error', () => {
                resolve({
                    status: 'error',
                    data: null
                });
            });
        });
        workers.push(worker);
    }

    const results = await Promise.all(workers);
    console.log(results.map((result) => `status: ${result.status} data: ${result.data}`).join('\n'));

};

await performCalculations();