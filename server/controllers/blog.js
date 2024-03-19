import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const createBlog = async (req, res) => {
    try {
        const { title, description, image } = req.body;

        if (title === "" || description === "") {
            return res.status(400).json({
                success: false,
                message: "Invalid Title or Description or Image!"
            })
        }

        if(image===""){
            image=`https://cultureandtourism.danube-region.eu/wp-content/themes/dfd-nat1ve/assets/images/no_image_resized_675-450.jpg`
        }

        const blog = await Blog.create({
            title,
            description,
            image,
            author: req.user._id,
            dateCreated: new Date(Date.now())
        })

        const user = await User.findById(req.user._id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found!"
            })
        }

        user.blogs.unshift(blog._id);

        await user.save()

        res.status(200).json({
            success: true,
            message: "Blog Published Successfully!",
            blog
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const showBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author');

        if (!blogs || blogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Blogs Found!"
            })
        }

        res.status(200).json({
            success: true,
            message: "Blogs Fetched Successfully!",
            blogs
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const displayBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog Not Found!"
            })
        }

        res.status(200).json({
            success: true,
            message: "Enjoy Viewing Blog!",
            blog
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if (!blog || blog.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Blogs Found!"
            })
        }

        await blog.deleteOne({ _id: req.params.id })

        const user = await User.findById(req.user._id)

        const blogIndex = user.blogs.indexOf(req.params._id)
        user.blogs.splice(blogIndex, 1);

        await user.save()

        res.status(200).json({
            success: true,
            message: "Blog Deleted Successfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        const { title, description } = req.body;

        if (title) {
            blog.title = title
        }
        if (description) {
            blog.description = description
        }

        await blog.save()

        res.status(200).json({
            success: true,
            message: "Blog Updated Successfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getBlogsOfLoginUser = async (req, res) => {
    try {
        const userID = req.user._id;
        const blogs = await Blog.find({ author: userID });

        if (!blogs) {
            return res.status(404).json({
                success: false,
                message: "No Blogs Found!"
            })
        }

        res.status(200).json({
            success: true,
            blogs
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const checkBlogOwner = async(req, res, next)=>{
    try {
        const blogID = req.params.id
        const userID = req.user._id

        console.log(blogID, userID)

        const blog = await Blog.findById(blogID)
        console.log(blog.author.toString(), userID.toString())
        if(!blog || blog.author.toString()!==userID.toString()){
            return res.status(400).json({
                success: false,
                message: "Access Denied!"
            })
        }

        next()
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message
        })
    }
}