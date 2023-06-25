import { AccountsStore } from '@/stores/accounts.js';
export default defineEventHandler(async event => {
  try {
    const store = AccountsStore();
    const query = getQuery(event);
    console.log(query);
    store.addAccount(query);

    return query;
  } catch (error) {
    console.log(error);
    return {
      error: error
    };
  }
});
