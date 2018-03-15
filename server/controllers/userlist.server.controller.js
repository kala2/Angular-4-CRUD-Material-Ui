// ./express-server/controllers/todo.server.controller.js
import mongoose from 'mongoose';
//import models
import User from '../models/user.server.model';
var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

export const register = (req,res) => {
  console.log("req.body is: ", req.body);
  var user = _.omit(req.body, 'password');
  // add hashed password to user object
  user.password = bcrypt.hashSync(req.body.password, 10);
  const newUser = new User(user);

  newUser.save((err,user) => {
    if(err){
        return res.json({'success':false,'message':'Some Error'});
    }
        return res.json({'success':true,'message':'User added successfully'});
  })
}

export const authenticate = (req,res) => {
 
  const newUser = new User(req.body);
  var deferred = Q.defer();

  User.findOne({userName: req.body.username}, function (err, user) {
 
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        // authentication successful
        deferred.resolve({
            _id: user._id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            telephone: user.telephone,
            email: user.email,
            Posts: user.Posts,
            token: jwt.sign({ sub: user._id }, config.secret)
        });

        console.log(deferred.promise);
        var authenticatedUser = {
          userName: user.userName,
          token: jwt.sign({ sub: user._id }, config.secret)
        }
      return res.json(authenticatedUser);
    } else {
          // authentication failed
          console.log("authentication failed");
          deferred.resolve();
      }
  }); 
}

export const deletePost = (req,res) => {
  
  User.findByIdAndRemove(req.params.id, (err,post) => {
    if(err) {
        return res.json({'success':false,'message':'Some Error'});
    }
    return res.json(post);
  });

}

export const updatePost = (req,res) => {

  User.findOneAndUpdate({ _id:req.params.id }, req.body, { new:true }, (err,post) => {
    if(err) {
      return res.json({'success':false,'message':'Some Error','error':err});
    }
    return res.json(post);
  });

}

export const getUser = (req,res) => {

  // User.find({"userName": req.params.id}).exec((err,user) => {
  //   if(err){
  //     return res.json({'success':false,'message':'Some Error'});
  //   }
  //   return res.json(user);
  // });

  User.findOne({"userName": req.params.id}, function(e,user) {
    if(e){
      return res.json({'success':false,'message':'Some Error','error':e});
    }
    return res.json(user);
  });
}

// export const getPost = (req,res) => {
//   PostList.find({_id:req.params.id}).exec((err,post) => {
//     if(err){
//     return res.json({'success':false,'message':'Some Error'});
//     }
//     if(post.length){
//       return res.json(post);
//     }
//     else{
//       return res.json({'success':false,'message':'Todo with the given id not found'});
//     }
//   })
// }
