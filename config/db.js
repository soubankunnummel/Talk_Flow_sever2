
import mongoose from 'mongoose'

const connection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_CONNECTION)
        console.log(`data base connected to ${connect.connection.host}`)

    } catch (error) {
        console.log(`error${error.message}`)
        process.exit(1)
    }
}

export default connection