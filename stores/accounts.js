import { defineStore } from 'pinia';
export const AccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        phone: '12345678',
        password: '123456',
        birthday: '02/13/2000',
        gender: 'male'
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe2@gmail.com',
        phone: '123456789',
        password: '123456',
        birthday: '02/13/2000',
        gender: 'male'
      }
    ]
  }),
  getters: {
    getAccounts: state => state,
    doubleCount(state) {
      return state.count * 2;
    }
  },
  actions: {
    addAccount(payload) {
      this.accounts.push(payload);
      console.log(this.accounts);
    },
    resetPassword({ phone, password }) {
      const account = this.accounts.find(acc => acc.phone === phone);
      if (account) {
        account.password = password;
        this.accounts = [...this.accounts.filter(acc => acc.phone !== phone), account];

        return true;
      } else {
        return false;
      }
    }
  }
});
