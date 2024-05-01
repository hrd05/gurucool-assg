const express = require('express');
const mongoose = require('mongoose');
const { Queue, Worker } = require('bullmq');
const Redis = require('ioredis');
require('dotenv').config();
const uri = process.env.DB_URI;

const app = express();

const userRoutes = require('./router/user');
app.use(express.json());

app.use(userRoutes);

app.use('/', (req, res) => {
    res.send('Hello World');
})

const redis = new Redis({
    maxRetriesPerRequest: null
});


mongoose.connect(uri)
    .then(() => {
        console.log('connected to db');
        app.listen(3000);
        startWorker(redis);
    })
    .catch(err => console.log(err));

function startWorker(redis) {
    const worker = new Worker('user_tasks', async (job) => {
        console.log(job.data);
        console.log(`Processing task for user ${job.name} with data: ${job.data}`);
        await performTask(job.data);
        console.log(`Task for user ${job.name} processed`);
    }, { connection: redis })
}

async function performTask(taskData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`task executed with data ${taskData}`);
}