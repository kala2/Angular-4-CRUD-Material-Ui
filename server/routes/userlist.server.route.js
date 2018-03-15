import express from 'express';
//import controller file
import * as userListController from '../controllers/userlist.server.controller';
import * as postListController from '../controllers/postlist.server.controller';
// get an instance of express router
const router = express.Router();
router.route('/')
    .get(postListController.getPosts) 
router.route('/user/:id')
    .get(userListController.getUser)       
router.route('/:id')
    .put(postListController.updatePost)
    .post(postListController.addPost)
router.route('/commentRemove/:id')
    .put(postListController.deletePost)
router.route('/users/register')
    .post(userListController.register)
router.route('/users/authenticate')
    .post(userListController.authenticate)
router.route('/addNewLike/:id')
    .put(postListController.addNewLike)
router.route('/removeLike/:id')
    .put(postListController.removeLike);;
      
export default router;