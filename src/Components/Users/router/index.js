const { Router } = require('express');
const UserController = require('../controller/UserController');

const userRouter = Router();

const userController = new UserController();
userRouter.post('/auth/users', userController.createUser);
userRouter.post('/auth/users/login',userController.loginUser);

module.exports = userRouter;

