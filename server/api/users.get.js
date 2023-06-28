import users from '../models/users';

export default defineEventHandler(async event => {
  try {
    const data = await users.find();
    return {
      data
    };
  } catch (error) {
    return error;
  }
});
