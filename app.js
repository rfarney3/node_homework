const express = require('express')
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const app = express();
const port = 3000;

const db = require("./config/database")

// (async () => {
//   await db.sync();
//   const jane = await User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
//   });
//   console.log(jane.toJSON());
// })();

db.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch(error => console.error('Unable to connect to the database:', error));

// User routes
app.use("/users", require("./routes/Users"))
app.listen(port, console.log(`Example app listening at http://localhost:${port}`));

app.use(bodyParser.json());

