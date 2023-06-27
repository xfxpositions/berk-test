import { AccountsStore } from '@/stores/accounts.js';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async event => {
  const query = getQuery(event);
  const accounts = AccountsStore();
  const email = query.email;
  console.log(accounts);
  const password = query.password;
  const account = accounts.accounts.find(acc => acc.email === email && acc.password === password);
  if (account) {
    const token = await jwt.sign({ email: account.email, password: account.password }, 'mysecrettoken');
    console.log(token);
    return token;
  } else {
    return null;
  }
});
