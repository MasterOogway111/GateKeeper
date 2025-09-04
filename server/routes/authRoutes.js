// import express from 'express'
// import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controllers/AuthController.js';
// import userAuth from '../middleware/userauth.js';
// import jwt from 'jsonwebtoken';
// const { verify } = jwt ;

// const authRouter = express.Router(); 

// // post cz we have to send the data 
// //end point
// authRouter.post('/register', register);
// authRouter.post('/login',login);
// authRouter.post('/logout',logout);
// authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp);
// authRouter.post('/verify-account',userAuth,verifyEmail);
// authRouter.get('/is-auth',userAuth,isAuthenticated);
// authRouter.post('/sent-reset-otp',sendResetOtp);
// authRouter.post('/reset-password',resetPassword);
// export default authRouter;
import express from 'express';
import { isAuthenticated, login, logout, register, resetPassword, sendRestOtp, sendVerifyOtp, verifyEmail } from '../controllers/AuthController.js';
import userAuth from '../middleware/userAuth.js';


const AuthRouter = express.Router()

AuthRouter.post('/register', register)
AuthRouter.post('/login', login)
AuthRouter.post('/logout', logout)
AuthRouter.post('/send-verify-otp', userAuth, sendVerifyOtp)
AuthRouter.post('/verify-account', userAuth, verifyEmail)
AuthRouter.get('/is-auth', userAuth, isAuthenticated)
AuthRouter.post('/send-reset-otp', sendRestOtp)
AuthRouter.post('/reset-password', resetPassword)


export default AuthRouter;