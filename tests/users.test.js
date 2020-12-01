const app = require('../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
import supertest from 'supertest'
import app from '../app'
import User from '../models/user'


describe('User E2E', () => {
  describe('POST /user', () => {
    it('should create a user', async () => {
      let user = {
        login: 'victor@example.com',
        password: 'password'
      }
      const res = await request
                        .post('/users')
                        .send(user)

      const { _id, name, role } = res.body.data

      //we didnt return email and password, so we wont assert for them
      expect(res.status).toEqual(201);
      expect(_id).toBeDefined();
      expect(role).toEqual('user');

      //we can query the db to confirm the record
      const createdUser = await User.findOne({login: user.login })
      expect(createdUser).toBeDefined()
      expect(createdUser.login).toEqual(user.login);
      //since our password is hashed:
      expect(createdUser.password).not.toEqual(user.password);
    });

    it('should not create a user if the record already exist.', async () => {
      let user = {
        login: "farneyr", //a record that already exist
        password: 'password'
      }
      const res = await request
                        .post('/users')
                        .send(user)

      expect(res.status).toEqual(500);
      expect(res.body.error).toEqual('record already exists');
    });


    it('should not create a user if validation fails', async () => {
      let user = {
        login: 'victorexample.com', //invalid login
        password: 'pass' //the password should be atleast 6 characters
      }
      const res = await request
                        .post('/users')
                        .send(user)

      const errors =  [ 
        {login: 'a valid login is required'},
        { password: 'a valid password with atleast 6 characters is required' } 
      ]                  
      expect(res.status).toEqual(400);
      expect(res.body.errors).toEqual(errors);
    });
  });
});