
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  imageUrl: {
    type: String,
    required: true
  },
  cartItem: {
    type: Object,
    default: {}
  }

}, { minimize: false })


const User = mongoose.models.User || mongoose.model('user' , userSchema)
export default User ;