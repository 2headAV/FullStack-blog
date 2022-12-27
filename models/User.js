import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
   fullName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   passwordHash: {
      type: String,
      required: true,
   },
   avatarUrl: String,

},
   {
      timestamps: true,
   }
);

export default mongoose.model('User', UserScheme);


const index = (array, n) => array[n] ? array[n] ** n : -1


console.log(index([10, 10, 5, 10], 3));