import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create new instance of schema
const UsersSchema = new Schema({
  name: String,
  age: Number,
  mysticalLand: String
});

export default mongoose.model('User', UsersSchema);
