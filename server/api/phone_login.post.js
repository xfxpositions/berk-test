import jwt from 'jsonwebtoken';
import users from '../models/users';

export default defineEventHandler(async event => {
  const query = getQuery(event);
  const phone = query.phone;
  const password = query.password;

  try {
    const user = await users.findOne({ phone, password });
    if (user) {
      const token = await jwt.sign({ phone: user.phone, password: user.password }, 'mysecrettoken');
      console.log(token);
      return token;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  }
});
