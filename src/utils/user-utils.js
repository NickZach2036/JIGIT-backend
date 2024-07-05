import User from './setup-model.js';
import sequelize from './sequelize_setup.js';
import bcrypt from 'bcrypt';

export async function createUser(email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    console.log('New user created:', newUser.toJSON());
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function dropTable() {
  try {
    await sequelize.drop();
    console.log('Table dropped successfully.');
  } catch (error) {
    console.error('Error dropping table:', error);
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    await User.destroy({
      where: {
        id: userId,
      },
    });
    console.log(`User with id ${userId} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}
