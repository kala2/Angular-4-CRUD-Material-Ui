// ./express-server/controllers/todo.server.controller.js
import mongoose from 'mongoose';
//import models
import PostList from '../models/post.server.model';

export const getPosts = (req,res) => {
    PostList.find().exec((err,posts) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
return res.json({'success':true,'message':'Todos fetched successfully',posts});
  });
}

export const addPost = (req,res) => {
  const newPost = new PostList(req.body);
  newPost.save((err,post) => {
    if(err){
        return res.json({'success':false,'message':'Some Error'});
    }
        return res.json({'success':true,'message':'Post added successfully',post});
  })
}

export const deletePost = (req,res) => {
  PostList.findByIdAndRemove(req.params.id, (err,post) => {
    if(err) {
        return res.json({'success':false,'message':'Some Error'});
    }
    return res.json(post);
  })
}

export const updatePost = (req,res) => {

  PostList.findOneAndUpdate({ _id:req.params.id }, req.body, { new:true }, (err,post) => {
    if(err){
    return res.json({'success':false,'message':'Some Error','error':err});
    }
    console.log(post);
    return res.json(post);
  })
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
