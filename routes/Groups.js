const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const db = require("../config/database");
const Group = require("../models/Group")

// @route GET /
// @desc Get Groups
// @access Public

router.get("/", (req, res) => 
  Group.findAll()
    .then(groups => {
      console.log(groups)
      res.json(groups)
    })
    .catch(err => console.log(err))
)

// @route GET /:id
// @desc Get Groups Profile by id
// @access Public

router.get('/:id', async (req, res) => {
  const group = await Group.findByPk(req.params.id);

  if (!group) {
      return res.status(400).json({ msg: 'group not found' });
  }
  res.json(group);
});

// @route PUT /:id
// @desc Get Users Profile by user id
// @access Public

router.put('/delete/:id', async (req, res) => {
  const group = await Group.findByPk(req.params.id);
  await group.destroy();

  if (!group) {
      return res.status(400).json({ msg: 'group not found' });
  }
  res.json(group);
});

// @route POST
// @desc Get Users Profile by user id
// @access Public

router.post('/', async (req, res) => {
    const { id, name, permissions } = req.body;

    let group = await Group.findByPk(req.params.id);
    if (group) {
        //Update
        group = { id, name, permissions };
        await group.save();
        return res.json(group);
    }

    //Create
    group = { id, login, password, age, isDeleted };
    await Group.create(group);
    res.json(group);
  }
);

module.exports = router;