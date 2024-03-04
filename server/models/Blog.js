import mongoose, {Schema, model} from 'mongoose'

const blogSchema = new Schema({
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
        // default: `https://cultureandtourism.danube-region.eu/wp-content/themes/dfd-nat1ve/assets/images/no_image_resized_675-450.jpg`
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dateCreated:{
        type: Date,
        default: Date.now
    }
})

const Blog = model('Blog', blogSchema);

export default Blog;