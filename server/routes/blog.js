import express from 'express'
import { checkBlogOwner, createBlog, deleteBlog, displayBlog, getBlogsOfLoginUser, showBlogs, updateBlog } from '../controllers/blog.js';
import {isAuthenticated} from '../middlewares/auth.js'

const router = express.Router();

router.route('/new/blog').post(isAuthenticated, createBlog)

router.route('/my-blogs').get(isAuthenticated, getBlogsOfLoginUser)

router.route('/blogs').get(showBlogs)

router.route('/blog/:id').get(displayBlog)

router.route('/update/:id').put(isAuthenticated, checkBlogOwner, updateBlog)

router.route('/delete/:id').delete(isAuthenticated, checkBlogOwner, deleteBlog)

export default router;