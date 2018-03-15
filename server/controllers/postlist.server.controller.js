// ./express-server/controllers/todo.server.controller.js
import mongoose from 'mongoose';
//import models
import User from '../models/user.server.model';

export const getPosts = (req,res) => {
  
  User.find().exec((err,posts) => {
    if(err){
      return res.json({'success':false,'message':'Some Error'});
    }
    return res.json({'success':true,'message':'Todos fetched successfully',posts});
  });

}

export const addPost = (req,res) => {

  var username  = req.params.id;
  var postText = req.body;
  
  User.findOneAndUpdate({"userName": username}, {
    $push: {
          "Posts": {
              postText: req.body.postText,
              likes: 0
          }
        }
  }, { safe: true, upsert: true, new: true },  function(e,user) {
    if(e){
      return res.json({'success':false,'message':'Some Error','error':e});
    }
    return res.json(user);
  });

}

export const deletePost = (req,res) => {

  var username  = req.params.id;
  var postId = req.body._id;

  User.findOneAndUpdate({"userName": username}, {
      $pull: {
            "Posts": {
                _id: postId
            }
          }
    }, { safe: true, upsert: true, new: true },  function(e,user) {
      if(e){
        return res.json({'success':false,'message':'Some Error','error':e});
      }
      return res.json(user);
  });

}

export const updatePost = (req,res) => {

  var username  = req.params.id;
  var post = req.body;
  var postId = req.body._id;

  User.findOneAndUpdate({"userName": username, "Posts._id" : postId},
    { $set: {
        "Posts.$.postText" : post.postText
      } 
    }, { safe: true, upsert: true, new: true }, function(e,user) {
    if(e) {
      return res.json({'success':false,'message':'Some Error','error':e});
    }
    return res.json(user.Posts);
  });  

}

export const addNewLike = (req,res) => {

  var username  = req.params.id;
  var likerUserName = req.body.likerUserName;
  var post = req.body.post;
  var postId = req.body.post._id;

  User.findOneAndUpdate({"userName": username, "Posts._id" : postId},
    { $push: {
        "Posts.$.likedFrom" : likerUserName
      },
      $set: {
        "Posts.$.likes" : post.likes+1
      } 
    }, { safe: true, upsert: true, new: true }, function(e,user) {
    if(e) {
      return res.json({'success':false,'message':'Some Error','error':e});
    }
    return res.json(user.Posts);
  });  
}

export const removeLike = (req,res) => {

  var username  = req.params.id;
  var likerUserName = req.body.likerUserName;
  var post = req.body.post;
  var postId = req.body.post._id;

  User.findOneAndUpdate({"userName": username, "Posts._id" : postId},
    { $pull: {
        "Posts.$.likedFrom" : likerUserName
      },
      $set: {
        "Posts.$.likes" : post.likes-1
      } 
    }, { safe: true, upsert: true, new: true }, function(e,user) {
    if(e) {
      return res.json({'success':false,'message':'Some Error','error':e});
    }
    return res.json(user.Posts);
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
