import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = process.env.MONGO_URL;
        if (!conn) {
            throw new Error('MongoDB connection URL is undefined');
        }
        await mongoose.connect(conn, {
            
        });

        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB database connection established successfully');
        });
        connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
            process.exit();
        });

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;