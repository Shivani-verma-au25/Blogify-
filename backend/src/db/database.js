import mongoose from "mongoose"
import { DB_NAME } from "../../constant.js";


const connectToDatabse = async () => {
    try {
        const conntectionInstance = await mongoose.connect(`${process.env.DB_CONNECTION_STRING}`)
        console.log("MongoDB connected to host  ", conntectionInstance.connection.host);
    } catch (error) {
        console.log("Error while connecting to databse ",error);
        process.exit(1)
    }
}

export default connectToDatabse