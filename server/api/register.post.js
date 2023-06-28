import users from '../models/users';

export default defineEventHandler(async event => {
  try {
    const { firstName, lastName, email, phone, password, birthday, gender } = await readBody(event);
    const data = await users.create({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      birthday: birthday.value,
      gender: gender.value
    });

    return data;
  } catch (error) {
    return error;
  }
});
