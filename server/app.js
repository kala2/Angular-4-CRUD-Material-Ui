// ./express-server/app.js
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import SourceMapSupport from 'source-map-support';
import User from './models/user.server.model';
// import routes
import userRoutes from './routes/userlist.server.route';
// define our app using express
const app = express();
var fs = require('file-system');
var multer = require('multer');
var cors = require('cors');
var expressJwt = require('express-jwt');
var config = require('./config.json');
var _router = express.Router();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// allow-cors

var cors = require('cors');    
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// })

// app.use(expressJwt({
//   secret: config.secret,
//   getToken: function (req) {
//       if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//           return req.headers.authorization.split(' ')[1];
//       } else if (req.query && req.query.token) {
//           return req.query.token;
//       }
//       return null;
//   }
// }).unless({ path: ['/users/authenticate', '/users/register'] }));

// configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));
// set the port
const port = process.env.PORT || 3001;
// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mern-todo-app');
// add Source Map Support
SourceMapSupport.install();

var storage = multer.diskStorage({
  // destino del fichero
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  // renombrar fichero
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).single('file');

app.post("/upload/", function (req, res, next) {

  upload(req, res, function(err) {

    var username  = req.body.userName;
    var filename  = req.file.filename;

    if (err) {
      return res.status(501).json({error: err});
    }
    
    User.findOne({"userName": username}, function(err, docs){
      if(docs.profileImage != "") {
        var filepath = path.join(__dirname, './uploads') + '/' + docs.profileImage;
        fs.unlink(filepath, (err) => {
          if (err) throw err;
          console.log('file was deleted');
          User.findOneAndUpdate({"userName": username},
            { $set: {
                "profileImage" : filename
              } 
            }, { safe: true, upsert: true, new: true }, function(e,user) {
            if(e) {
              return res.json({'success':false,'message':'Some Error','error':e});
            }
            return res.json({user, originalname: req.file.originalname, uploadname: req.file.filename});
          });  
        });
      } else {
        User.findOneAndUpdate({"userName": username},
          { $set: {
              "profileImage" : filename
            } 
          }, { safe: true, upsert: true, new: true }, function(e,user) {
          if(e) {
            return res.json({'success':false,'message':'Some Error','error':e});
          }
          return res.json({user, originalname: req.file.originalname, uploadname: req.file.filename});
        });  
      }
    });
  });
});

app.post("/upload/cover", function (req, res, next) {
  upload(req, res, function(err) {

    var username  = req.body.userName;
    var filename  = req.file.filename;

    if (err) {
      return res.status(501).json({error: err});
    }
    
    User.findOne({"userName": username}, function(err, docs){
      if(docs.profileCover != "") {
        var filepath = path.join(__dirname, './uploads') + '/' + docs.profileCover;
        console.log("FILE PATH IS ", filepath);
        fs.unlink(filepath, (err) => {
          if (err) throw err;
          console.log('file was deleted');
          User.findOneAndUpdate({"userName": username},
            { $set: {
                "profileCover" : filename
              } 
            }, { safe: true, upsert: true, new: true }, function(e,user) {
            if(e) {
              return res.json({'success':false,'message':'Some Error','error':e});
            }
            return res.json({user, originalname: req.file.originalname, uploadname: req.file.filename});
          });  
        });
      } else {
        User.findOneAndUpdate({"userName": username},
          { $set: {
              "profileCover" : filename
            } 
          }, { safe: true, upsert: true, new: true }, function(e,user) {
          if(e) {
            return res.json({'success':false,'message':'Some Error','error':e});
          }
          return res.json({user, originalname: req.file.originalname, uploadname: req.file.filename});
        });  
      }
    });
  });
});

app.use('/api', userRoutes);
app.get('/', (req,res) => {
  return res.end('Api working');
})
// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});
// start the server
app.listen(port,() => {
  console.log(`App Server Listening at ${port}`);
});