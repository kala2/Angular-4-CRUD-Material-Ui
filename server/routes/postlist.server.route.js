import express from 'express';
//import controller file
import * as postListController from '../controllers/postlist.server.controller';
// get an instance of express router
const router = express.Router();
router.route('/')
    .get(postListController.getPosts)
     .post(postListController.addPost)
    router.route('/:id')
     .delete(postListController.deletePost)
      //.get(postListController.getPost);
     .put(postListController.updatePost);
      
export default router;