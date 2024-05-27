import { Router } from "express";
const  router  = Router();

// import all controllers
import Auth, { localVariables } from '../middleware/auth.js';
import { registerMail } from "../controllers/mailer.js";
import * as controller from '../controllers/appController.js';


// POST methods
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail); //send the mail
router.route('/authenticate').post(controller.verifyUser,(req, res) =>{  console.log('Authenticate request received:', req.body); res.end()}); // authenticate the user
router.route('/login').post(controller.verifyUser,controller.login); // login the user

// GET methods
router.route('/user/:username').get(controller.getUser); // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP); // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP); // veryify generated OTP
router.route('/createResetSession').get(controller.createResetSession); // reset all the variables

// PUT methods
router.route('/updateUser').put(Auth, controller.updateUser); // update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // reset the password


export default router;