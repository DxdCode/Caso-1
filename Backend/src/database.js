import mongoose from 'mongoose'

mongoose.set('strictQuery', true)

const connection = async() =>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI_LOCAL)
        console.log(`Database is connected on ${connection.host} - ${connection.port}`)
    } catch (error) {
        console.log("Eror al conectar",error)
        process.exit(1)
    }
}

export default connection
