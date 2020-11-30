const express = require('express')
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const app = express();
const port = 3000;

const db = require("./config/database")

const { createLogger, transports } = require('winston');

// Enable exception handling when you create your logger.
const logger = createLogger({
  transports: [
    new transports.File({ filename: 'combined.log' }) 
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' })
  ],
  rejectionHandlers: [
    new transports.File({ filename: 'rejections.log' })
  ]
});

logger.exceptions.handle(
    new transports.File({ filename: 'exceptions.log' })
);

logger.rejections.handle(
    new transports.File({ filename: 'rejections.log' })
);

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
});

db.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch(error => console.error('Unable to connect to the database:', error));

// User routes
app.use("/users", require("./routes/Users"))
app.use("/groups", require("./routes/Groups"))
app.listen(port, console.log(`Example app listening at http://localhost:${port}`));

app.use(bodyParser.json());

