import { defineStore } from 'pinia';
export const AuthStore = defineStore('auth', {
  state: () => ({ email: '', name: '' }),
  actions: {
    login(payload) {
      this.email = payload.email;
      this.password = payload.password;
    }
  }
});
