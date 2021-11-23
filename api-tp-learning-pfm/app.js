require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const createError = require('http-errors')
const mongoose = require('mongoose')

require('./config/db.config')

const app = express()
const port = process.env.PORT || 8000

/** Middlewares */
app.use(logger('dev'))
app.use(express.json())

/** Routes */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const routes = require('./config/routes.config');
app.use('/api', routes)

/** Error */
app.use((req, res, next) => {
    next(createError(404, 'Route not found'))
})

/** Error Handling */
app.use((error, req, res, next) => {
    if (error instanceof mongoose.Error.ValidationError) {
        error = createError(400, error);
    } else if (error instanceof mongoose.Error.CastError && error.message.includes('_id')) {
        error = createError(404, 'Resource not found');
    } else if (error.message.includes('E11000')) {
        error = createError(409, 'Duplicated');
    } else if (!error.status) {
        error = createError(500, error);
    }

    if (error.status >= 500) {
        console.error(error);
    }

    const data = {};
    data.message = error.message;

    if (error.errors) {
        data.errors = Object.keys(error.errors)
            .reduce((errors, key) => {
                errors[key] = error.errors[key].message;
                return errors;
            }, {});
    }
    res.status(error.status).json(data);
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})