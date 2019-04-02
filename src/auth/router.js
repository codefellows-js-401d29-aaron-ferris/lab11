'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');
/**
 * @param  {} '/signup'
 * @param  {} (req
 * @param  {} res
 * @param  {} next
 * @param  {} =>{letuser=newUser(req.body
 * @param  {} ;user.save(
 * @param  {} .then((user
 * @param  {} =>{req.token=user.generateToken(
 * @param  {} ;req.user=user;res.set('token'
 * @param  {} req.token
 * @param  {} ;res.cookie('auth'
 * @param  {} req.token
 * @param  {} ;res.send(req.token
 * @param  {} ;}
 * @param  {} .catch(next
 * @param  {} ;}
 */
authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    }).catch(next);
});
/**
 * @param  {} '/signin'
 * @param  {} auth
 * @param  {} (req
 * @param  {} res
 * @param  {} next
 * @param  {} =>{res.cookie('auth'
 * @param  {} req.token
 * @param  {} ;res.send(req.token
 * @param  {} ;}
 */
authRouter.post('/signin', auth, (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

module.exports = authRouter;
