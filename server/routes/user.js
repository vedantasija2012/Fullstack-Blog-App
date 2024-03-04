import express from 'express'
import { login, logout, register, showProfile } from '../controllers/user.js';
import {isAuthenticated} from '../middlewares/auth.js'

const router = express.Router()

router.route('/register').post(register)

router.route('/login').post(login);

router.route('/logout').post(logout);

router.route('/profile').get(isAuthenticated, showProfile);

export default router;