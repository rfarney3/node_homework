const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const db = require("../config/database");
const User = require("../models/User");
const auth = require('../middleware/auth');
const winston = require('winston');


// @route GET /
// @desc Get Users
// @access Public

router.get("/", auth, (req, res) => 
  User.findAll()
    .then(users => {
      winston.log('info', 'Get all users!', {
        users: users
      })
      res.json(users)
    })
    .catch(err => console.log(err))
)

// @route GET /:id
// @desc Get Users Profile by user id
// @access Public

router.get('/:id', auth, async (req, res) => {
  const user = await User.findByPk(req.params.id);

  try {
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }
    winston.log('info', 'Get users by id!', {
      user: user
    })
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT /:id
// @desc Get Users Profile by user id
// @access Public


router.put('/delete/:id', auth, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  try {
    user.isDeleted = true;

    if (!user) {
        return res.status(400).json({ msg: 'User not found' });
    }
    winston.log('info', 'Delete user by id!', {
      user: user
    })
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  
});

// @route POST
// @desc Get Users Profile by user id
// @access Public

router.post(
  '/',
  [ 
    auth, 
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
    ]
  ],
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      const { id, login, password, age, isDeleted } = req.body;

      try {
        let user = await User.findByPk(req.params.id);
        if (user) {
            //Update
            user = { id, login, password, age, isDeleted };
            winston.log('info', 'Updated user!', {
              user: user
            })
            return res.json(user);
        }
  
        //Create
        user = { id, login, password, age, isDeleted };
        userData.push(user);
        winston.log('info', 'Created user!', {
          user: user
        })
        res.json(user);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
  }
);

module.exports = router;