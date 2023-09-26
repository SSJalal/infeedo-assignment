const express = require('express');
const client = require('../index');
const queries = require('../utils/queries');
const { constant } = require('../utils/constants');
const common = require('../utils/common');
const routes = express.Router();

//create a new task
routes.post('/create', async (req, res) => {
    const reqBody = req.body;
    const keys = Object.keys(reqBody);
    if(!keys.includes('name')) {
        res.status(constant.ERROR).send({ msg: `'name' key not found`, status: 'Failed' });
    }
    else if(!keys.includes('status') || !constant.STATUS.includes(reqBody.status.toUpperCase())) {
        res.status(constant.ERROR).send({ msg: `'status' key not found and can only be: [${constant.STATUS}]`, status: 'Failed' });
    }
    else if(!keys.includes('date') || !common.isDateValid(reqBody.date)) {
        res.status(constant.ERROR).send({ msg: `'date' key not found or invalid`, status: 'Failed' });
    }
    else {
        const query = queries.insertTask(reqBody.name, reqBody.status ? reqBody.status : 'ACTIVE', reqBody.date);
        console.log('/create: ', query);
        const result = await client.db.query(query);
        res.send({ msg: `Created task - ${reqBody.name}`, status: 'Ok' });
    }
});

//update existing tasks based on task ID
routes.patch('/update', async (req, res) => {
    const reqBody = req.body;
    const keys = Object.keys(reqBody);
    if(!keys.includes('name')) {
        res.status(constant.ERROR).send({ msg: `'name' key not found`, status: 'Failed' });
    }
    else if(!keys.includes('status') || !constant.STATUS.includes(reqBody.status.toUpperCase())) {
        res.status(constant.ERROR).send({ msg: `'status' key not found and can only be: [${constant.STATUS}]`, status: 'Failed' });
    }
    else if(!keys.includes('prevStatus') || !constant.STATUS.includes(reqBody.prevStatus.toUpperCase())) {
        res.status(constant.ERROR).send({ msg: `'prevStatus' key not found or can only be: [${constant.STATUS}]`, status: 'Failed' });
    }
    else {
        const query = queries.updateTask(reqBody.name, reqBody.status, reqBody.prevStatus);
        const result = await client.db.query(query);
        console.log('/update: ', query);
        res.send({ msg: `Updated task - ${reqBody.name}`, status: 'Ok' });
    }
});

//get all the tasks
routes.get('/get_tasks', async (req, res) => {
    const pageNumber = req.query.page ? req.query.page : 0;
    const offset_val = (pageNumber <= 1) ? 0 : pageNumber * 10 - 10;
    const query = queries.getTasks(offset_val);
    console.log('/get_tasks: ', query);
    const result = await client.db.query(query);
    const response = common.createResponse(result.rows);
    res.send({ data: response });
});

//fetch task based on parameters
routes.get('/get_task', async (req, res) => {
    if(!req.query.name) {
        res.status(constant.ERROR).send({ msg: `'name' key not found`, status: 'Failed' });
    }
    else {
        const query = queries.getTask(req.query.name);
        console.log('/get_task: ', query);
        const result = await client.db.query(query);
        const response = common.createResponse(result.rows);
        res.send({ data: response[0] ? response[0].metrics : {} });
    }
});

module.exports = routes;