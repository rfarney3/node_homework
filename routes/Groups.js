const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const db = require("../config/database");
const auth = require('../middleware/auth');
const Group = require("../models/Group");
const winston = require('winston');

// @route GET /
// @desc Get Groups
// @access Public

router.get("/", auth, (req, res) => 
  Group.findAll()
    .then(groups => {
      winston.log('info', 'Get all groups!', {
        groups: groups
      })
      res.json(groups)
    })
    .catch(err => console.log(err))
)

// @route GET /:id
// @desc Get Groups Profile by id
// @access Public

router.get('/:id', auth, async (req, res) => {
  const group = await Group.findByPk(req.params.id);

  if (!group) {
      return res.status(400).json({ msg: 'group not found' });
  }
  winston.log('info', 'Get all groups by id!', {
    group: group
  })
  res.json(group);
});

// @route PUT /:id
// @desc Get Users Profile by user id
// @access Public

router.put('/delete/:id', auth, async (req, res) => {
  const group = await Group.findByPk(req.params.id);
  await group.destroy();

  if (!group) {
      return res.status(400).json({ msg: 'group not found' });
  }
  winston.log('info', 'Delete a group!', {
    group: group
  })
  res.json(group);
});

// @route POST
// @desc Get Users Profile by user id
// @access Public

router.post('/', auth, async (req, res) => {
    const { id, name, permissions } = req.body;

    let group = await Group.findByPk(req.params.id);
    if (group) {
        //Update
        group = { id, name, permissions };
        await group.save();
        winston.log('info', 'Get Users Profile by user id!', {
          group: group
        })
        return res.json(group);
    }

    //Create
    group = { id, login, password, age, isDeleted };
    await Group.create(group);
    res.json(group);
  }
);

module.exports = router;