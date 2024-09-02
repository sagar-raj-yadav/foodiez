import mongoose from 'mongoose';
const { Schema } = mongoose;


const BlogSchema = new Schema({
  title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;
