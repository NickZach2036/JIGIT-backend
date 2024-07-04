import User from './setup-model.js';

createUser('NewUser','PaSSwoRd','us3remail@gmai.com', '08tr21ta');

async function createUser(username, password, email, carNumber) {
    try {
      const newUser = await User.create({
        username,
        password,
        email,
        carNumber,
      })
  
      console.log('New user created:', newUser.toJSON());
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }