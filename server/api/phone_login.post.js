import { AccountsStore } from '@/stores/accounts.js';
import { AuthStore } from '@/stores/auth.js';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async event => {
  const query = getQuery(event);
  const accounts = AccountsStore();
  const phone = query.phone;
  const password = query.password;
  const account = accounts.accounts.find(acc => acc.phone === phone && acc.password === password);
  if (account) {
    const token = await jwt.sign({ phone: account.phone, password: account.password }, 'mysecrettoken');
    console.log(token);
    return token;
  } else {
    return null;
  }
});
