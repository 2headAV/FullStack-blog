import express from 'express';
import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import checkAuth from './utils/checkAuth.js';

import { register, getMe, login } from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.lm97rwu.mongodb.net/blog?retryWrites=true&w=majority')
   .then(() => console.log("DB OK"))
   .catch((err) => console.log('DB error', err));

const app = express();
app.use(express.json());

app.post('/auth/login', loginValidation, login);
app.post('/auth/register', registerValidation, register);
app.get('/auth/me', checkAuth, getMe);

app.get('/posts/', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts/', checkAuth, postCreateValidation, PostController.create);
// app.delete('/posts/', remove);
// app.patch('/posts/', update);

app.listen(4444, (err) => {
   if (err) {
      return console.log(err);
   }
   console.log('Server OK');
});
