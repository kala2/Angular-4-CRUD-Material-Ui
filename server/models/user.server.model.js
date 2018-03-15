import mongoose from 'mongoose';
var Schema = mongoose.Schema({
  userName: String,
  password: String,
  firstName: String, 
  lastName: String,  
  address: String, 
  telephone: String, 
  email: String,
  profileImage:{
    type: String,
    default: ''
  }, 
  profileCover:{
    type: String,
    default: ''
  },
  Posts: [{
    createdAt:{
      type: Date,
      default: Date.now
    },
    postText: String,
    likes: Number,
    likedFrom: [String]
  }]   
});
export default mongoose.model('User', Schema);