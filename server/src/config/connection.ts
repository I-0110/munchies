// import the needed packages
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
console.log(process.env.MONGODB_URI)
// verify that a MONGODB_URI exists
if (!process.env.MONGODB_URI) {
    throw new Error('Environment variable MONGODB_URI is not defined');
}

// variable to store the mongodb uri
const MONGODB_URI: string = process.env.MONGODB_URI;

// function to run the database connection 
const db = async (): Promise<typeof mongoose.connection> => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("🗄️ Database connected!")
        return mongoose.connection
    } catch (r) {
        console.error('Error connecting to the database', r)
        throw new Error ('DB connection failed 😩')
    }
}

// export the db connection function for use by the server
export default db;

