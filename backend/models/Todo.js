// server/models/Todo.js
import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true } // Clerk userId
}, { timestamps: true })

export default mongoose.model('Todo', TodoSchema)
