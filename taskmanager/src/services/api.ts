import axios from 'axios'

const BASE_URL = 'https://server-1-t93s.onrender.com'

// 🔐 Authentification
export const registerUser = (data: {
  firstName: string
  lastName: string
  email: string
  password: string
}) => {
  return axios.post(`${BASE_URL}/api/user/signup`, data)
}

export const loginUser = (data: {
  email: string
  password: string
}) => {
  return axios.post(`${BASE_URL}/api/user/login`, data)
}

// ✅ Ajouter une tâche
export const addTask = (data: {
  userId: string
  title: string
  description: string
}) => {
  return axios.post(`${BASE_URL}/api/tasks-management/add-task`, data)
}

// 📥 Récupérer les tâches
export const getTasksByUserId = (userId: string) => {
  return axios.get(`${BASE_URL}/api/tasks-management/get-tasks/${userId}`)
}

// ✏️ Mettre à jour une tâche
export const updateTask = (data: {
  userId: string
  taskId: string
  title?: string
  description?: string
  isDone?: boolean
}) => {
  return axios.put(`${BASE_URL}/api/tasks-management/update-task`, data)
}

// ❌ Supprimer une tâche
export const deleteTask = (data: {
  userId: string
  taskId: string
}) => {
  return axios.delete(`${BASE_URL}/api/tasks-management/remove-task`, {
    data,
  })
}
