const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)
import supertest from 'supertest'
import app from '../app'
import Group from "../models/Group"


describe('Group E2E', () => {
  describe('POST /group', () => {
    it('should create a group', async () => {
      let group = {
        id: '1',
        name: "victor's group"
      }
      const res = await request
                        .post('/groups')
                        .send(group)

      const { _id, name } = res.body.data

      //we didnt return email and password, so we wont assert for them
      expect(res.status).toEqual(201);
      expect(_id).toBeDefined();
      expect(role).toEqual('group');

      //we can query the db to confirm the record
      const createdGroup = await Group.findOne({id: group.id })
      expect(createdGroup).toBeDefined()
      expect(createdGroup.id).toEqual(group.id);
      //since our password is hashed:
      expect(createdGroup.name).not.toEqual(group.name);
    });

    it('should not create a group if the record already exist.', async () => {
      let group = {
        id: "1", //a record that already exist
        password: 'password'
      }
      const res = await request
                        .post('/groups')
                        .send(group)

      expect(res.status).toEqual(500);
      expect(res.body.error).toEqual('record already exists');
    });


    it('should not create a group if validation fails', async () => {
      let group = {
        id: 'hey', //invalid id
        name: 'victors group' //the password should be atleast 6 characters
      }
      const res = await request
                        .post('/groups')
                        .send(group)

      const errors =  [ 
        {id: 'a valid id is required'},
      ]                  
      expect(res.status).toEqual(400);
      expect(res.body.errors).toEqual(errors);
    });
  });
});