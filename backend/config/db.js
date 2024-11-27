import mongoose from 'mongoose';

const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://Rizwan98:7510481468@cluster0.vlhrh.mongodb.net/food-del', {
        });
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

export { connectDB };





//   await mongoose.connect('mongodb+srv://Rizwan98:7510481468@cluster0.vlhrh.mongodb.net/food-del')