import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String },
  createdAt: {type: Date, default: Date.now},

  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  
  verified: {
  type: Boolean,
  default: false,
  },

  verificationToken: {
  type: String,
  required: false,
  }


});





export default mongoose.model('User', UserSchema);
