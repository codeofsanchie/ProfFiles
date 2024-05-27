import mongoose from 'mongoose';

async function connect() {
    const uri = "mongodb://localhost:27017/proffileDB";
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

export default connect;
