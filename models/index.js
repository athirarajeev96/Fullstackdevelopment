import 'dotenv/config'
import mongoose from 'mongoose'
const MONGODB_URI = process.env.MONGODB_URI

const URI = `${MONGODB_URI}`

mongoose.connect(URI)
.then(()=>console.log('MongoDB connected successfully'))
.catch(error=>console.log('MongoDB connection failed',error))

export {mongoose}