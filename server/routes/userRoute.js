import express from 'express';
import { register, login, isAuth, logout } from '../controllers/userController.js';
import  authUser  from '../middlewares/authUser.js';
const userRouter = express.Router();

userRouter.post('/register', register )
userRouter.post('/login', login )
userRouter.get('/is-auth',authUser, isAuth )
// Logout should clear cookie regardless of auth state so allow unauthenticated calls
userRouter.get('/logout', logout )

export default userRouter;