import { defineStore } from 'pinia';

export const AuthStore = defineStore('auth', {
  state: () => ({ token: null }),
  actions: {
    login(payload) {
      this.token = payload;
    },
    logout() {
      this.token = null;
    }
  }
});
