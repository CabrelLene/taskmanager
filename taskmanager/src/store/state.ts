import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    token: '',
  }),

  actions: {
    setUser(user: any) {
      this.userId = user.userId
      this.firstName = user.firstName
      this.lastName = user.lastName
      this.email = user.email
      this.token = user.token

      localStorage.setItem('userId', user.userId)
      localStorage.setItem('firstName', user.firstName)
      localStorage.setItem('lastName', user.lastName)
      localStorage.setItem('email', user.email)
      localStorage.setItem('token', user.token)
    },

    clearUser() {
      this.userId = ''
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.token = ''

      localStorage.removeItem('userId')
      localStorage.removeItem('firstName')
      localStorage.removeItem('lastName')
      localStorage.removeItem('email')
      localStorage.removeItem('token')
    },

    isAuthenticated(): boolean {
      return this.userId !== ''
    },

    restoreUserFromStorage() {
      const userId = localStorage.getItem('userId')
      const firstName = localStorage.getItem('firstName')
      const lastName = localStorage.getItem('lastName')
      const email = localStorage.getItem('email')
      const token = localStorage.getItem('token')

      if (userId && token) {
        this.userId = userId
        this.firstName = firstName || ''
        this.lastName = lastName || ''
        this.email = email || ''
        this.token = token
      }
    },
  },
})
