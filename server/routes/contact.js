import express from 'express'
import { querySent } from '../controllers/contact.js';

const router = express.Router()

router.route('/contact').post(querySent)

export default router;