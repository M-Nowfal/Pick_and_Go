import mongoose  from "mongoose";

const connectDB = () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Data Base Connected Successfully"))
    .catch(err => console.log(err.message))
}

export default connectDB;