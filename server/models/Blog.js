import mongoose from 'mongoose'
import User from './User.js';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false,
        default: `https://cultureandtourism.danube-region.eu/wp-content/themes/dfd-nat1ve/assets/images/no_image_resized_675-450.jpg`
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    dateCreated:{
        type: Date,
        default: Date.now
    }
})

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;