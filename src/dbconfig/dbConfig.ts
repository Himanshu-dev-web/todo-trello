import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://hims:hims@cluster0.nghvgcd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            
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