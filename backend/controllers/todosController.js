// server/controllers/todosController.js
import Todo from '../models/Todo.js'
import { getAuth } from '@clerk/express'

export const getTodos = async (req, res) => {
  const auth = getAuth(req)                   // read auth from request
  if (!auth.isAuthenticated)                  // not signed in?
    return res.status(401).json({ error: 'Not authenticated' })

  const userId = auth.userId
  const todos = await Todo.find({ userId }).sort({ createdAt: -1 })
  res.json(todos)
}

export const createTodo = async (req, res) => {
  const auth = getAuth(req)
  if (!auth.isAuthenticated) return res.status(401).json({ error: 'Not authenticated' })

  const { title } = req.body
  if (!title) return res.status(400).json({ error: 'Title required' })

  const todo = await Todo.create({ title, userId: auth.userId })
  res.status(201).json(todo)
}

export const updateTodo = async (req, res) => {
  const auth = getAuth(req)
  if (!auth.isAuthenticated) return res.status(401).json({ error: 'Not authenticated' })

  const { id } = req.params
  const todo = await Todo.findById(id)
  if (!todo) return res.status(404).json({ error: 'Not found' })
  if (todo.userId !== auth.userId) return res.status(403).json({ error: 'Forbidden' })

  Object.assign(todo, req.body)
  await todo.save()
  res.json(todo)
}

export const deleteTodo = async (req, res) => {
  const auth = getAuth(req)
  if (!auth.isAuthenticated) return res.status(401).json({ error: 'Not authenticated' })

  const { id } = req.params
  const todo = await Todo.findById(id)
  if (!todo) return res.status(404).json({ error: 'Not found' })
  if (todo.userId !== auth.userId) return res.status(403).json({ error: 'Forbidden' })

  await todo.remove()
  res.json({ success: true })
}
