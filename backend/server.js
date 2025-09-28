// server/server.js
import 'dotenv/config'                 // loads .env
import express from 'express'
import cors from 'cors'
import { clerkMiddleware } from '@clerk/express'
import connectDB from './config/db.js'
import todosRouter from './routes/todos.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 3000

// allow requests from the client (adjust origin for prod)
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.use(express.json())

// Clerk middleware inspects cookies/headers and attaches auth info to req.auth
app.use(clerkMiddleware())  // attaches auth info; see getAuth() docs. :contentReference[oaicite:7]{index=7}

app.use('/api/todos', todosRouter)

app.use(errorHandler)

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
  })
  .catch(err => {
    console.error('DB connection failed', err)
    process.exit(1)
  })
