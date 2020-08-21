const express = require('express')
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.use(bodyParser.json());

// const User = {
//     id: String,
//     login: String,
//     password: String,
//     age: Number,
//     isDeleted: Boolean
// }

const userData = [
    {
        id: '7634',
        login: 'user@email.com',
        password: 'passwerd',
        age: 25,
        isDeleted: false,
    },
    {
        id: '8765',
        login: 'user@email.com',
        password: 'passwerd',
        age: 25,
        isDeleted: false,
    },
    {
        id: '3456',
        login: 'blah@email.com',
        password: 'passward',
        age: 49,
        isDeleted: false,
    },
    {
        id: '1234',
        login: 'heya@email.com',
        password: 'password',
        age: 135,
        isDeleted: false,
    },
];

app.get('/', (req, res) => {
    res.status(200).json(userData);
});

// @route GET /:id
// @desc Get Users Profile by user id
// @access Public

app.get('/:id', (req, res) => {
    const user = userData.find((user) => user.id === req.params.id);

    if (!user) {
        return res.status(400).json({ msg: 'User not found' });
    }
    res.json(user);
});

// @route PUT /:id
// @desc Get Users Profile by user id
// @access Public

app.put('/delete/:id', (req, res) => {
    const user = userData.find((user) => user.id === req.params.id);
    user.isDeleted = true;

    if (!user) {
        return res.status(400).json({ msg: 'User not found' });
    }
    res.json(user);
});

// @route POST
// @desc Get Users Profile by user id
// @access Public

app.post(
    '/',
    [
        check('id', 'An id is required').not().isEmpty(),
        check('login', 'A valid email is required').isEmail().not().isEmpty(),
        check(
            'password',
            'The password must be 5+ chars long and contain a number'
        )
            .not()
            .isIn(['123', 'password', 'god'])
            .withMessage('Do not use a common word as the password')
            .isLength({ min: 5 })
            .matches(/\d/),
        check('age', 'Age is a required field').isInt({ min: 4, max: 130 }),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id, login, password, age, isDeleted } = req.body;

        let user = userData.find((user) => user.id === req.params.id);
        if (user) {
            //Update
            user = { id, login, password, age, isDeleted };

            return res.json(user);
        }

        //Create
        user = { id, login, password, age, isDeleted };
        userData.push(user);
        res.json(user);
    }
);
