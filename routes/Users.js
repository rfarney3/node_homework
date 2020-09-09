const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const db = require("../config/database");
const User = require("../models/User")

// @route GET /
// @desc Get Users
// @access Public

router.get("/", (req, res) => 
  User.findAll()
    .then(users => {
      console.log(users)
      res.sendStatus(200)
    })
    .catch(err => console.log(err))
)

// @route GET /:id
// @desc Get Users Profile by user id
// @access Public

router.get('/:id', (req, res) => {
  const user = userData.find((user) => user.id === req.params.id);

  if (!user) {
      return res.status(400).json({ msg: 'User not found' });
  }
  res.json(user);
});

// @route PUT /:id
// @desc Get Users Profile by user id
// @access Public

router.put('/delete/:id', (req, res) => {
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

router.post(
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

module.exports = router;