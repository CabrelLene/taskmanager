import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
  }),
  actions: {
    setUser(user: any) {
      this.userId = user.userId
      this.firstName = user.firstName
      this.lastName = user.lastName
      this.email = user.email
    },
    clearUser() {
      this.userId = ''
      this.firstName = ''
      this.lastName = ''
      this.email = ''
    },
    isAuthenticated(): boolean {
      return this.userId !== ''
    },
  },
})
