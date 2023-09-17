import { resolve } from 'path';
import { availableParallelism } from 'os';
import { Worker } from 'worker_threads';
import { getDirname } from '../helpers/get-dirname.js';

const performCalculations = async () => {
  const TASK_OBJECTIVE = {
    worker: {
      fileName: 'worker.js',
    },
    offset: 10,
    statusDict: { fulfilled: 'resolved', rejected: 'error' },
  };

  const __dirname = getDirname(import.meta.url);

  const workerFilePath = resolve(__dirname, TASK_OBJECTIVE.worker.fileName);

  const coresNumber = availableParallelism();

  const calculate = (workerIndex) => {
    return new Promise((res, rej) => {
      const workerData = { numberFromMain: workerIndex + TASK_OBJECTIVE.offset };
      const worker = new Worker(workerFilePath, { workerData });
      worker.on('message', res);
      worker.on('error', rej);
    });
  };

  const convertResult = (promise) => {
    const status = TASK_OBJECTIVE.statusDict[promise.status];
    const data = promise.value ?? null;
    return { status, data };
  };

  const calculations = Array.from({ length: coresNumber }, (_, i) => calculate(i));
  const results = await Promise.allSettled(calculations);

  console.log(results.map(convertResult));
};

await performCalculations();
