const User = require('./setup-model');

createUser('NewUser','PaSSwoRd','useremail@gmai.com', '08tr21ta');

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