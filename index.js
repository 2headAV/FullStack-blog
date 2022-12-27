import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import handleValidationError from './utils/handleValidationError.js';

import checkAuth from './utils/checkAuth.js';

import { register, getMe, login } from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.lm97rwu.mongodb.net/blog?retryWrites=true&w=majority')
   .then(() => console.log("DB OK"))
   .catch((err) => console.log('DB error', err));

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
   destination: (_, __, cb) => {
      cb(null, 'uploads');
   },
   filename: (_, file, cb) => {
      cb(null, file.originalname);
   },
})

const upload = multer({ storage });

app.post('/auth/login', loginValidation, handleValidationError, login);
app.post('/auth/register', registerValidation, handleValidationError, register);
app.get('/auth/me', checkAuth, getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
   res.json({
      url: `/uploads/${req.file.originalname}`,
   });
});

app.get('/tags', PostController.getLastTags);

app.get('/posts/', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts/', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update);

app.listen(4444, (err) => {
   if (err) {
      return console.log(err);
   }
   console.log('Server OK');
});
