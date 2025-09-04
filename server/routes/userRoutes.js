// import express from 'express';
// import userAuth from  '../middleware/userauth.js';
// import { getUserData } from '../controllers/userController.js';
// const userRouter = express.Router();

// userRouter.get('/data',userAuth,getUserData)

// export default userRouter ;

import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../controllers/userController.js';
const UserRouter = express.Router()
UserRouter.get('/data', userAuth, getUserData)

export default UserRouter;


