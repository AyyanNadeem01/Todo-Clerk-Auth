// server/config/db.js
import mongoose from 'mongoose'

export default async function connectDB(uri){
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('MongoDB connected')
}
