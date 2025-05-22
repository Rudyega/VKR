import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title:{type: String, required: false},
    imageUrl: { type: String, required: true },
    description: { type: String, required: false}, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: 'createdAt' } }
);

export default mongoose.model('Post', PostSchema);
