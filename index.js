const express = require('express');
const routes = require('./routes.js/router');
const { connectDb } = require('./db/connect');
const { constant } = require('./utils/constants');

const app = express();

const port = process.env.PORT || 8080;
app.listen(port, async (error) => {
    if(error) {
        console.log(`Failed to run server on: ${port}`);    
    }
    else {
        try {
            exports.db = await connectDb();
            console.log(`Server is running on: ${port}`);
            app.use(express.json());
            app.use('/task', routes);
            app.use('*', (req, res) => {
                console.log('Bad Request: ', req.url);
                res.status(constant.ERROR).send({ msg: `Bad request ${req.url}`, status: 'failed' });
            });
        }
        catch (error) {
            console.error('Error: ', error);
        }
    }
});