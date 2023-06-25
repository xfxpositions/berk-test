import { defineStore } from 'pinia';
export const AccountsStore = defineStore('auth', {
  state: () => ({
    accounts: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        phone: '123456789',
        password: '123456',
        birthday: '02/13/2000',
        gender: 'male'
      }
    ]
  }),
  actions: {
    addAccount(payload) {
      this.accounts.push(payload);
      console.log(this.accounts);
    }
  }
});
