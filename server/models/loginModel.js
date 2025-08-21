
import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
  userId: {type: String, required: true } ,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const loginModel = mongoose.model.user || mongoose.model('loggeduser' , LoginSchema);

export default loginModel;


